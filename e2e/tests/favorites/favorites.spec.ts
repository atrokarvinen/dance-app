import { expect } from "@playwright/test";
import { test } from "./favorites-fixture";

test("adds and removes favorite", async ({
  favoritePage,
  dancePatternPage,
}) => {
  await favoritePage.goToFavorites();
  await expect(favoritePage.noFavoritesText).toBeVisible();

  await dancePatternPage.goToDance("Test dance");
  await dancePatternPage.addToFavorites("Test dance pattern");

  await favoritePage.goToFavorites();
  await expect(favoritePage.noFavoritesText).toBeHidden();
  await expect(favoritePage.getFavoriteDance("Test dance")).toBeVisible();
  await favoritePage.openFavoriteDance("Test dance");
  const favoritePatternLocator = favoritePage.getFavoriteDancePattern(
    "Test dance",
    "Test dance pattern"
  );
  await expect(favoritePatternLocator).toBeVisible();

  await favoritePage.navigateToFavorite("Test dance", "Test dance pattern");
  await favoritePage.returnFromFavorite();

  await favoritePage.removeFavorite("Test Dance", "Test Dance Pattern");

  await expect(favoritePage.noFavoritesText).toBeVisible();
});

test("loads favorites after page refresh", async ({
  favoritePage,
  dancePatternPage,
}) => {
  await dancePatternPage.goToDance("Test dance");
  await dancePatternPage.addToFavorites("Test dance pattern");
  await favoritePage.goToFavorites();

  // Refresh the page
  await favoritePage.page.reload();
  await expect(favoritePage.getFavoriteDance("Test dance")).toBeVisible();
});
