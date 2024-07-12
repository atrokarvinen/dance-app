import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { SignupFormType } from "./models/signup-form-type";
import { SignupForm } from "./signup-form";

const signupMutation = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      userId
      name
    }
  }
`;

type SignupMutationResponse = {
  signup: {
    userId: string;
    name: string;
  };
};

type SignupMutationVariables = {
  input: {
    username: string;
    password: string;
  };
};

export const SignupView = () => {
  const navigate = useNavigate();
  const [signup] = useMutation<SignupMutationResponse, SignupMutationVariables>(
    signupMutation
  );

  const handleSignup = async (values: SignupFormType) => {
    console.log("Signup form submitted with values:", values);
    const { data, errors } = await signup({ variables: { input: values } });
    if (errors || !data) {
      console.error(errors);
      return;
    }
    const { name, userId } = data.signup;
    console.log(`User '${name}' with id (${userId}) signed up successfully`);
    navigate("/auth");
  };

  return <SignupForm onSubmit={handleSignup} />;
};
