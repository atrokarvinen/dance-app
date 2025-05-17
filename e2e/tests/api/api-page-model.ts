import { Page } from "@playwright/test";
import { backendUrl } from "./constants";
import { Dance } from "./models/dance";
import { User } from "./models/user";

const defaultOptions = {
  failOnStatusCode: true,
};

export class ApiPageModel {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  createUser(user: User) {
    const { username, password, role } = user;
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

  createDance(dance: Dance) {
    const url = `${backendUrl}/test/dances`;
    return this.page.request.post(url, { ...defaultOptions, data: dance });
  }

  deleteDance(danceName: string) {
    const url = `${backendUrl}/test/dances?name=${danceName}`;
    return this.page.request.delete(url, { ...defaultOptions });
  }
}
