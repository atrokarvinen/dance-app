import { gql, useMutation } from "@apollo/client";

const signupMutation = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      userId
      username
      token
    }
  }
`;

type SignupMutationResponse = {
  signup: {
    userId: string;
    username: string;
    token: string;
  };
};

type SignupMutationVariables = {
  input: {
    username: string;
    password: string;
  };
};

export const useSignup = () => {
  const [mutationFunc] = useMutation<
    SignupMutationResponse,
    SignupMutationVariables
  >(signupMutation);

  const signup = async (values: SignupMutationVariables["input"]) => {
    const { data, errors } = await mutationFunc({
      variables: { input: values },
    });
    if (errors || !data) {
      console.log(errors);
      return;
    }
    return data.signup;
  };

  return { signup };
};
