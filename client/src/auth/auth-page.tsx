import { Box, Button, Card, CardContent, Divider, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./api/use-login";
import { LoginForm } from "./login-form";
import { LoginFormType } from "./models/login-form-type";
import { useAuth } from "./use-auth";

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { login: loginMutation } = useLogin();

  const handleLogin = async (values: LoginFormType) => {
    const token = await loginMutation(values);
    if (!token) {
      return;
    }
    localStorage.setItem("username", values.username);
    login(token);
    console.log("Login successful.");
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card data-testid="login-card">
        <CardContent>
          <Stack direction="column" spacing={5}>
            <LoginForm onSubmit={handleLogin} />
            <Divider>Or</Divider>
            <Button
              variant="contained"
              to="/auth/signup"
              component={Link}
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
