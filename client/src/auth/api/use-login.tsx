import { gql, useMutation } from "@apollo/client";
import { LoginFormType } from "../models/login-form-type";

const query = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

type LoginMutationResponse = {
  login: {
    token: string;
  };
};

type LoginMutationVariables = {
  input: {
    username: string;
    password: string;
  };
};

export const useLogin = () => {
  const [mutationFunc] = useMutation<
    LoginMutationResponse,
    LoginMutationVariables
  >(query);

  const login = async (values: LoginFormType) => {
    const { data, errors } = await mutationFunc({
      variables: { input: values },
    });
    if (errors || !data) {
      console.error(errors);
      return;
    }
    const { token } = data.login;
    return token;
  };

  return { login };
};
