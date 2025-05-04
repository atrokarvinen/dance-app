import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { AuthPageModel } from "./auth-page-model";

type AuthFixture = {
  username: string;
  password: string;
  api: ApiPageModel;
  authPage: AuthPageModel;
};

export const test = base.extend<AuthFixture>({
  username: "testuser",
  password: "password",
  api: async ({ page }, use) => {
    const apiPage = new ApiPageModel(page);
    await use(apiPage);
  },
  authPage: async ({ page, api }, use) => {
    const authPage = new AuthPageModel(page);

    await api.deleteUser("testuser");
    await page.goto("/");

    await use(authPage);

    await api.deleteUser("testuser");
  },
});
