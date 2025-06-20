import { useNavigate } from "react-router-dom";
import { useToast } from "../common/toast/use-toast";
import { signupRequest } from "./api/api";
import type { SignupFormType } from "./models/signup-form-type";
import { SignupForm } from "./signup-form";

export const SignupView = () => {
  const navigate = useNavigate();
  const { showSuccessToast } = useToast();

  const handleSignup = async (values: SignupFormType) => {
    const data = await signupRequest(values);
    const result = data.data;
    if (!result) return;
    const { username, userId } = result;
    console.log(`User '${username}' (${userId}) signed up successfully`);
    showSuccessToast(`User '${username}' signed up successfully`);
    navigate("/auth");
  };

  const handleCancel = () => {
    navigate("/auth");
  };

  return <SignupForm onSubmit={handleSignup} onCancel={handleCancel} />;
};
