import { Page } from "@playwright/test";

export class FavoritePageModel {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.getByRole("link", { name: "Profile" }).click();
  }
}
