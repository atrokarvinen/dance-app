import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, type FormEvent } from "react";
import type { LoginFormType } from "./models/login-form-type";

type Props = {
  onSubmit: (values: LoginFormType) => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("1");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: "center" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
