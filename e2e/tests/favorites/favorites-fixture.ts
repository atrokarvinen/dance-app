import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { AuthPageModel } from "../auth/auth-page-model";
import { DancePatternPageModel } from "../dance-patterns/dance-patterns-page-model";
import { FavoritePageModel } from "./favorites-page-model";

type FavoriteFixture = {
  api: ApiPageModel;
  dancePatternPage: DancePatternPageModel;
  favoritePage: FavoritePageModel;
};

export const test = base.extend<FavoriteFixture>({
  api: async ({ page }, use) => {
    const apiPage = new ApiPageModel(page);
    await use(apiPage);
  },
  dancePatternPage: async ({ page }, use) => {
    const dancePatternPage = new DancePatternPageModel(page);
    await use(dancePatternPage);
  },
  favoritePage: async ({ page, api }, use) => {
    const favoritePage = new FavoritePageModel(page);
    const loginPage = new AuthPageModel(page);

    await api.deleteUser("testuser");
    await api.deleteDance("Test dance");
    await api.createUser("testuser", "password");
    await api.createDance({
      name: "Test dance",
      patterns: [{ name: "Test dance pattern" }],
    });

    await page.goto("/");
    await loginPage.login("testuser", "password");

    await use(favoritePage);

    await api.deleteUser("testuser");
    await api.deleteDance("Test dance");
  },
});
