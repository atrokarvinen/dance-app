import { User } from "../api/models/user";
import { test } from "./auth-fixture";

test("sign up and login", async ({ authPage }) => {
  await authPage.signup("testuser", "password");
  await authPage.login("testuser", "password");
});

test("logout", async ({ authPage, api }) => {
  const user: User = {
    username: "testuser",
    password: "password",
  };
  await api.createUser(user);
  await authPage.login("testuser", "password");
  await authPage.logout();
});
