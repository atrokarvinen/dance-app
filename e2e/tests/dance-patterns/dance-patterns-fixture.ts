import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { adminUser } from "../api/models/user";
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
    await api.deleteUser(adminUser.username);
    await api.deleteDance("Test Dance");
    await api.createUser(adminUser);
    await api.createDance({ name: "Test Dance" });

    await page.goto("/");
    await loginPage.login(adminUser.username, adminUser.password);

    await use(dancePatternPage);

    await api.deleteUser(adminUser.username);
    await api.deleteDance("Test Dance");
  },
});
