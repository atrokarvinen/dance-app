import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { adminUser } from "../api/models/user";
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

    await api.deleteUser(adminUser.username);
    await api.deleteDance("Test dance");
    await api.createUser(adminUser);
    await api.createDance({
      name: "Test dance",
      patterns: [{ name: "Test dance pattern" }],
    });

    await page.goto("/");
    await loginPage.login(adminUser.username, adminUser.password);

    await use(favoritePage);

    await api.deleteUser(adminUser.username);
    await api.deleteDance("Test dance");
  },
});
