import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../common/api/error-handling";
import { ApiError } from "../../common/api/models";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

const signupMutation = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      errors {
        ... on UsernameTakenError {
          message
        }
      }
      signupOutput {
        token
        userId
        username
      }
    }
  }
`;

type SignupMutationResponse = {
  signup: {
    signupOutput: { userId: string; username: string; token: string } | null;
    errors: ApiError[] | null;
  };
};

type SignupMutationVariables = {
  input: {
    username: string;
    password: string;
  };
};

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const [mutationFunc] = useMutation<
    SignupMutationResponse,
    SignupMutationVariables
  >(signupMutation);

  const signup = async (values: SignupMutationVariables["input"]) => {
    const { data } = await mutationFunc({ variables: { input: values } });
    if (!data) {
      console.error("No data returned from signup mutation");
      return;
    }
    const errorMessage = getErrorMessage(data.signup.errors);
    if (errorMessage) {
      dispatch(addMessage({ message: errorMessage, type: "error" }));
      return;
    }
    return data.signup.signupOutput;
  };

  return { signup };
};
