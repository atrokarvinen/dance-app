import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "./api/api";
import { LoginForm } from "./login-form";
import type { LoginFormType } from "./models/login-form-type";
import { useAuth } from "./use-auth";

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values: LoginFormType) => {
    const data = await loginRequest(values);
    const token = data.data?.token;
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
