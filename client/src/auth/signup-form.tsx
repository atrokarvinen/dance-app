import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { SignupFormType } from "./models/signup-form-type";

type Props = {
  onSubmit: (values: SignupFormType) => void;
  onCancel: () => void;
};

export const SignupForm = ({ onSubmit, onCancel }: Props) => {
  const [username, setUsername] = useState("test user");
  const [password, setPassword] = useState("123");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Box>
      <Typography component="h1" variant="h3" marginBottom={3}>
        Signup
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
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
          <Stack direction="row" spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
