import { test as base } from "@playwright/test";
import { ApiPageModel } from "../api/api-page-model";
import {
  adminUser as adminUserConstant,
  commonUser as commonUserConstant,
  User,
} from "../api/models/user";
import { DancePatternPageModel } from "../dance-patterns/dance-patterns-page-model";
import { DancePageModel } from "../dances/dances-page-model";
import { AuthPageModel } from "./auth-page-model";

type AuthFixture = {
  api: ApiPageModel;
  authPage: AuthPageModel;
  dancePage: DancePageModel;
  dancePatternPage: DancePatternPageModel;
  commonUser: User;
  adminUser: User;
};

export const danceName = "Test dance";
export const dancePatternName = "Test dance pattern";

export const test = base.extend<AuthFixture>({
  api: async ({ page }, use) => {
    const apiPage = new ApiPageModel(page);
    await apiPage.deleteDance(danceName);
    await use(apiPage);
    await apiPage.deleteDance(danceName);
  },
  commonUser: async ({ api }, use) => {
    await api.deleteUser(commonUserConstant.username);
    await api.createUser(commonUserConstant);
    await use(commonUserConstant);
    await api.deleteUser(commonUserConstant.username);
  },
  adminUser: async ({ api }, use) => {
    await api.deleteUser(adminUserConstant.username);
    await api.createUser(adminUserConstant);
    await use(adminUserConstant);
    await api.deleteUser(adminUserConstant.username);
  },
  authPage: async ({ page }, use) => {
    const authPage = new AuthPageModel(page);
    await authPage.page.goto("/");
    await authPage.goToLogin();
    await use(authPage);
  },
  dancePage: async ({ page }, use) => {
    const dancePage = new DancePageModel(page);
    await use(dancePage);
  },
  dancePatternPage: async ({ page }, use) => {
    const dancePatternPage = new DancePatternPageModel(page);
    await use(dancePatternPage);
  },
});
