import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";
import { LoginFormType } from "../models/login-form-type";

const query = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      loginOutput {
        token
      }
      errors {
        ... on InvalidCredentialsError {
          message
        }
      }
    }
  }
`;

type LoginMutationResponse = {
  login: {
    loginOutput: { token: string } | null;
    errors: ApiError[] | null;
  };
};

type LoginMutationVariables = {
  input: {
    username: string;
    password: string;
  };
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc] = useMutation<
    LoginMutationResponse,
    LoginMutationVariables
  >(query);

  const login = async (values: LoginFormType) => {
    const { data } = await mutationFunc({
      variables: { input: values },
    });
    if (!data) {
      console.error("No data returned from login mutation");
      return;
    }
    const errorMessage = getErrorMessage(data.login.errors);
    if (errorMessage) {
      dispatch(addMessage({ message: errorMessage, type: "error" }));
      return;
    }
    const token = data.login.loginOutput?.token;
    return token;
  };

  return { login };
};
