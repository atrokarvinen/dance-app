import { test } from "./auth-fixture";

test("sign up and login", async ({ authPage }) => {
  await authPage.signup("testuser", "password");
  await authPage.login("testuser", "password");
});

test("logout", async ({ authPage, api }) => {
  await api.createUser("testuser", "password");
  await authPage.login("testuser", "password");
  await authPage.logout();
});
