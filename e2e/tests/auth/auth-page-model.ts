import { expect, Page } from "@playwright/test";

export class AuthPageModel {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToLogin() {
    await this.page.getByRole("link", { name: "Profile" }).click();
  }

  async goToSignup() {
    await this.page.getByRole("link", { name: "Sign up" }).click();
  }

  async signup(username: string, password: string) {
    await this.goToLogin();
    await this.goToSignup();

    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);

    await this.page.getByRole("button", { name: "Submit" }).click();

    await expect(this.page.getByText("Login")).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.goToLogin();

    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);

    await expect(this.page.getByText("Dances")).toBeHidden();

    await this.page.getByRole("button", { name: "Submit" }).click();

    await expect(this.page.getByText("Dances")).toBeVisible();
  }

  async logout() {
    await this.page.getByRole("link", { name: "Settings" }).click();
    await this.page.getByRole("button", { name: "Logout" }).click();

    await expect(this.page.getByText("Login")).toBeVisible();
  }
}
