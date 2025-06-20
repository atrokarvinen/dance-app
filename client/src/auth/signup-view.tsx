import { useNavigate } from "react-router-dom";
import { signupRequest } from "./api/api";
import type { SignupFormType } from "./models/signup-form-type";
import { SignupForm } from "./signup-form";

export const SignupView = () => {
  const navigate = useNavigate();

  const handleSignup = async (values: SignupFormType) => {
    const data = await signupRequest(values);
    const result = data.data;
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
