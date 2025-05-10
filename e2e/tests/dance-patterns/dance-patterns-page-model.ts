import { expect, Locator, Page } from "@playwright/test";
import { DancePatternForm } from "./dance-pattern-form";

export class DancePatternPageModel {
  page: Page;
  nameInput: Locator;
  descriptionInput: Locator;
  videoUrlInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel("Name");
    this.descriptionInput = page.getByLabel("Description");
    this.videoUrlInput = page.getByLabel("Video URL");
  }

  async goToDance(name: string) {
    await this.page.getByRole("link", { name: "Home" }).click();
    await this.page.getByRole("link", { name }).click();
  }

  getDancePattern(name: string) {
    return this.page
      .getByTestId("dance-pattern-list-item")
      .filter({ has: this.page.getByText(name) });
  }

  async createDancePattern(dancePattern: DancePatternForm) {
    await this.enableEditMode();
    await this.openAddDancePattern();
    await this.fillDancePatternForm(dancePattern);
    await this.submitDancePattern();
  }

  async updateDancePattern(name: string, dancePattern: DancePatternForm) {
    await this.enableEditMode();
    await this.openEditDancePattern(name);
    await this.fillDancePatternForm(dancePattern);
    await this.submitDancePattern();
  }

  async enableEditMode() {
    const editOffIcon = this.page.getByTestId("EditOffIcon");
    if (await editOffIcon.isVisible()) return;
    await this.page.getByTestId("EditIcon").click();
  }

  async openAddDancePattern() {
    await this.page.getByTestId("AddIcon").click();
  }

  async openEditDancePattern(name: string) {
    const dancePatternListItem = this.getDancePattern(name);
    expect(dancePatternListItem).toBeVisible();
    await dancePatternListItem.getByTestId("EditIcon").click();
  }

  async deleteDancePattern(name: string) {
    const dancePatternListItem = this.getDancePattern(name);
    await dancePatternListItem.getByTestId("DeleteIcon").click();
    await this.page
      .getByRole("dialog")
      .getByRole("button", { name: "Confirm" })
      .click();
  }

  async fillDancePatternForm(values: DancePatternForm) {
    const { name, description, videoUrl } = values;

    await this.nameInput.fill(name);
    if (description) {
      await this.descriptionInput.fill(description);
    }
    if (videoUrl) {
      await this.videoUrlInput.fill(videoUrl);
    }
  }

  async submitDancePattern() {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async verifyDancePatternForm(values: DancePatternForm) {
    const { name, description, videoUrl } = values;

    await expect(this.nameInput).toHaveValue(name);
    if (description) {
      await expect(this.descriptionInput).toHaveValue(description);
    }
    if (videoUrl) {
      await expect(this.videoUrlInput).toHaveValue(videoUrl);
    }
  }
}
