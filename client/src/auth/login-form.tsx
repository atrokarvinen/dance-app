import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { LoginFormType } from "./models/login-form-type";

type Props = {
  onSubmit: (values: LoginFormType) => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState("test user");
  const [password, setPassword] = useState("123");

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
