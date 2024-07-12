import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LoginForm } from "./login-form";
import { LoginFormType } from "./models/login-form-type";
import { TestAuthButton } from "./test-auth-button";

const a = gql`
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

export const AuthPage = () => {
  const [loginFunc] = useMutation<
    LoginMutationResponse,
    LoginMutationVariables
  >(a);

  const handleLogin = async (values: LoginFormType) => {
    const { data, errors } = await loginFunc({ variables: { input: values } });
    if (errors || !data) {
      console.error(errors);
      return;
    }
    const { token } = data.login;
    localStorage.setItem("token", token);
    console.log("Login successful");
    console.log("Token:", token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logged out");
  };

  return (
    <div>
      <h1>Auth Page</h1>
      <LoginForm onSubmit={handleLogin} />
      <p>Or</p>
      <button>
        <Link to="/auth/signup">Sign up</Link>
      </button>
      <button onClick={handleLogout}>Logout</button>
      <TestAuthButton />
    </div>
  );
};
