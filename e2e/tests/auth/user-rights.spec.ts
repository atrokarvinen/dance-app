import { expect } from "@playwright/test";
import { danceName, dancePatternName, test } from "./user-rights-fixture";

test("admin can create dances", async ({ authPage, adminUser, dancePage }) => {
  await authPage.login(adminUser.username, adminUser.password);

  await dancePage.goTo();
  await dancePage.createDance({ name: danceName });
  await expect(dancePage.getDance(danceName)).toBeVisible();
});

test("common user cannot create dances", async ({
  authPage,
  commonUser,
  dancePage,
}) => {
  await authPage.login(commonUser.username, commonUser.password);

  await dancePage.goTo();
  await dancePage.createDance({ name: danceName });
  const error =
    "Forbidden access. You do not have permission to perform this action.";
  await expect(dancePage.page.getByText(error)).toBeVisible();
});

test("admin can create dance patterns", async ({
  authPage,
  adminUser,
  api,
  dancePatternPage,
}) => {
  await api.createDance({ name: danceName });
  await authPage.page.reload();

  await authPage.login(adminUser.username, adminUser.password);

  await dancePatternPage.goToDance(danceName);
  await dancePatternPage.createDancePattern({ name: dancePatternName });
  const patternLocator = dancePatternPage.getDancePattern(dancePatternName);
  await expect(patternLocator).toBeVisible();
});

test("common user cannot create dance patterns", async ({
  authPage,
  commonUser,
  api,
  dancePatternPage,
}) => {
  await api.createDance({ name: danceName });
  await authPage.page.reload();

  await authPage.login(commonUser.username, commonUser.password);

  await dancePatternPage.goToDance(danceName);
  await dancePatternPage.createDancePattern({ name: dancePatternName });
  const error =
    "Forbidden access. You do not have permission to perform this action.";
  await expect(dancePatternPage.page.getByText(error)).toBeVisible();
});
