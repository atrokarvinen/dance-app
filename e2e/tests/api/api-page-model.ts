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

  createUser(
    username: string,
    password: string,
    role: string | undefined = "Admin"
  ) {
    let url = `${backendUrl}/test/auth`;
    if (role) {
      url += `?role=${role}`;
    }

    return this.page.request.post(url, {
      ...defaultOptions,
      data: { username, password },
    });
  }

  deleteUser(username: string) {
    const url = `${backendUrl}/test/auth?username=${username}`;
    return this.page.request.delete(url, { ...defaultOptions });
  }

  deleteDance(danceName: string) {
    const url = `${backendUrl}/test/dances?name=${danceName}`;
    return this.page.request.delete(url, { ...defaultOptions });
  }
}
