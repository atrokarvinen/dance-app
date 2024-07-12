import { useState } from "react";
import { LoginFormType } from "./models/login-form-type";

type Props = {
  onSubmit: (values: LoginFormType) => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState("test user");
  const [password, setPassword] = useState("123");

  return (
    <div>
      <h1>Login Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ username, password });
        }}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
