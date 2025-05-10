import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { AuthPageModel } from "../auth/auth-page-model";
import { DancePageModel } from "./dances-page-model";

type DanceFixture = {
  api: ApiPageModel;
  dancePage: DancePageModel;
};

export const test = base.extend<DanceFixture>({
  api: async ({ page }, use) => {
    const apiPage = new ApiPageModel(page);
    await use(apiPage);
  },
  dancePage: async ({ page, api }, use) => {
    const loginPage = new AuthPageModel(page);
    const dancePage = new DancePageModel(page);

    await api.deleteUser("testuser");
    await api.deleteDance("Test Dance");
    await api.deleteDance("Updated Dance");
    await api.createUser("testuser", "password");

    await page.goto("/");
    await loginPage.login("testuser", "password");

    await use(dancePage);

    await api.deleteUser("testuser");
    await api.deleteDance("Test Dance");
    await api.deleteDance("Updated Dance");
  },
});
