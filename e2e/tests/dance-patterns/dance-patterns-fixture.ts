import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
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
    const dancePatternPage = new DancePatternPageModel(page);

    await api.deleteUser("testuser");
    await api.createUser("testuser", "password");

    await page.goto("/");

    await use(dancePatternPage);

    await api.deleteUser("testuser");
  },
});
