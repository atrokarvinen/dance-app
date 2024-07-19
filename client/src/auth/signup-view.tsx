import { useNavigate } from "react-router";
import { useSignup } from "./api/use-signup";
import { SignupFormType } from "./models/signup-form-type";
import { SignupForm } from "./signup-form";

export const SignupView = () => {
  const navigate = useNavigate();
  const { signup } = useSignup();

  const handleSignup = async (values: SignupFormType) => {
    const result = await signup(values);
    if (!result) {
      return;
    }
    const { username, userId } = result;
    console.log(`User '${username}' (${userId}) signed up successfully`);
    navigate("/auth");
  };

  const handleCancel = () => {
    navigate("/auth");
  };

  return <SignupForm onSubmit={handleSignup} onCancel={handleCancel} />;
};
