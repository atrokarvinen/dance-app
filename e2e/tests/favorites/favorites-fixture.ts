import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import { FavoritePageModel } from "./favorites-page-model";

type FavoriteFixture = {
  api: ApiPageModel;
  favoritePage: FavoritePageModel;
};

export const test = base.extend<FavoriteFixture>({
  api: async ({ page }, use) => {
    const apiPage = new ApiPageModel(page);
    await use(apiPage);
  },
  favoritePage: async ({ page, api }, use) => {
    const favoritePage = new FavoritePageModel(page);

    await api.deleteUser("testuser");
    await api.createUser("testuser", "password");

    await page.goto("/");

    await use(favoritePage);

    await api.deleteUser("testuser");
  },
});
