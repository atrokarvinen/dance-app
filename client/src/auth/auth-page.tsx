import { Link } from "react-router-dom";
import { DarkModeButton } from "../layout/dark-mode-button";
import { useLogin } from "./api/use-login";
import { LoginForm } from "./login-form";
import { LoginFormType } from "./models/login-form-type";
import { TestAuthButton } from "./test-auth-button";
import { useAuth } from "./use-auth";

export const AuthPage = () => {
  const { login, logout } = useAuth();
  const { login: loginMutation } = useLogin();

  const handleLogin = async (values: LoginFormType) => {
    const token = await loginMutation(values);
    if (!token) {
      return;
    }
    login(token);
    console.log("Login successful, token: ", token);
  };

  const handleLogout = () => {
    logout();
    console.log("Logged out");
  };

  return (
    <div>
      <h1>Auth Page</h1>
      <DarkModeButton />
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
