import { Page } from "@playwright/test";
import { backendUrl } from "./constants";

const defaultOptions = {
  failOnStatusCode: true,
};

export class ApiPageModel {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  createUser(username: string, password: string) {
    const url = `${backendUrl}/test/auth`;
    return this.page.request.post(url, {
      ...defaultOptions,
      data: { username, password },
    });
  }

  deleteUser(username: string) {
    const url = `${backendUrl}/test/auth?username=${username}`;
    return this.page.request.delete(url, { ...defaultOptions });
  }
}
