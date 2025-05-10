import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { AuthPageModel } from "../auth/auth-page-model";
import { DancePatternPageModel } from "./dance-patterns-page-model";

type DancePatternFixture = {
  api: ApiPageModel;
  dancePatternPage: DancePatternPageModel;
};

export const test = base.extend<DancePatternFixture>({
  api: async ({ page }, use) => {
    const apiPage = new ApiPageModel(page);
    await use(apiPage);
  },
  dancePatternPage: async ({ page, api }, use) => {
    const loginPage = new AuthPageModel(page);
    const dancePatternPage = new DancePatternPageModel(page);

    await api.deleteUser("testuser");
    await api.deleteDance("Test Dance");
    await api.createUser("testuser", "password");
    await api.createDance({ name: "Test Dance" });

    await page.goto("/");
    await loginPage.login("testuser", "password");

    await use(dancePatternPage);

    await api.deleteUser("testuser");
    await api.deleteDance("Test Dance");
  },
});
