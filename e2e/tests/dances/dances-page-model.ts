import { expect, Locator, Page } from "@playwright/test";
import { DanceForm } from "./dance-form";

export class DancePageModel {
  page: Page;
  nameInput: Locator;
  imageUrlInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel("Name", { exact: true });
    this.imageUrlInput = page.getByLabel("Image URL");
  }

  async goto() {
    await this.page.getByRole("link", { name: "Home" }).click();
  }

  getDance(name: string) {
    return this.page
      .getByTestId("dance-list-item")
      .filter({ has: this.page.getByText(name) });
  }

  async createDance(dance: DanceForm) {
    await this.goto();
    await this.enableEditMode();
    await this.openAddDance();
    await this.fillDanceForm(dance);
    await this.submitDance();
  }

  async updateDance(name: string, dance: DanceForm) {
    await this.goto();
    await this.enableEditMode();
    await this.openEditDance(name);
    await this.fillDanceForm(dance);
    await this.submitDance();
  }

  async enableEditMode() {
    const editOffIcon = this.page.getByTestId("EditOffIcon");
    if (await editOffIcon.isVisible()) return;
    await this.page.getByTestId("edit-mode").click();
  }

  async openAddDance() {
    await this.page.getByTestId("add-new-dance").click();
  }

  async openEditDance(name: string) {
    const danceListItem = this.getDance(name);
    expect(danceListItem).toBeVisible();
    await danceListItem.getByTestId("edit-dance").click();
  }

  async deleteDance(name: string) {
    const danceListItem = this.getDance(name);
    await danceListItem.getByTestId("delete-dance").click();
    await this.page
      .getByRole("dialog")
      .getByRole("button", { name: "Confirm" })
      .click();
  }

  async fillDanceForm(values: DanceForm) {
    const { name, imageUrl } = values;

    await this.nameInput.fill(name);
    if (imageUrl) {
      await this.imageUrlInput.fill(imageUrl);
    }
  }

  async submitDance() {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async verifyDanceForm(values: DanceForm) {
    const { name, imageUrl } = values;

    await expect(this.nameInput).toHaveValue(name);
    if (imageUrl) {
      await expect(this.imageUrlInput).toHaveValue(imageUrl);
    }
  }
}
