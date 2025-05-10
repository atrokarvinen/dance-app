import { Locator, Page } from "@playwright/test";

export class FavoritePageModel {
  page: Page;
  noFavoritesText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.noFavoritesText = this.page.getByText("No favorites have been added.");
  }

  async goToFavorites() {
    await this.page.getByRole("link", { name: "Favorites" }).click();
  }

  getFavoriteDance(danceName: string) {
    return this.page
      .getByTestId("favorite-dance-list-item")
      .filter({ has: this.page.getByText(danceName) });
  }

  async openFavoriteDance(danceName: string) {
    const expandElement = this.page.getByRole("button", { name: danceName });
    const isExpanded = await expandElement.getAttribute("aria-expanded");
    if (isExpanded === "true") return;
    await expandElement.click();
  }

  getFavoriteDancePattern(danceName: string, dancePatternName: string) {
    const favoriteDanceListItem = this.getFavoriteDance(danceName);
    return favoriteDanceListItem
      .getByTestId("favorite-dance-pattern-list-item")
      .filter({ has: this.page.getByText(dancePatternName) });
  }

  async navigateToFavorite(danceName: string, dancePatternName: string) {
    await this.openFavoriteDance(danceName);
    const favorite = this.getFavoriteDancePattern(danceName, dancePatternName);
    await favorite.getByRole("link", { name: dancePatternName }).click();
  }

  async returnFromFavorite() {
    await this.page.getByTestId("ArrowBackIcon").click();
  }

  async removeFavorite(danceName: string, dancePatternName: string) {
    const favoriteDanceListItem = this.getFavoriteDance(danceName);
    await favoriteDanceListItem
      .getByTestId("favorite-dance-pattern-list-item")
      .filter({ has: this.page.getByText(dancePatternName) })
      .getByTestId("DeleteIcon")
      .click();
  }
}
