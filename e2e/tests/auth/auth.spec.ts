import test, { expect } from "@playwright/test";

const backendUrl = "http://localhost:5000";

test.beforeEach(async ({ page, request }) => {
  await page.goto("/");
  await request.delete(`${backendUrl}/test/auth?username=testuser`);
});

test.afterEach(async ({ request }) => {
  await request.delete(`${backendUrl}/test/auth?username=testuser`);
});

test("sign up and login", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Profile" }).click();

  await page.getByRole("link", { name: "Sign up" }).click();

  await page.getByLabel("Username").fill("testuser");
  await page.getByLabel("Password").fill("password");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Login")).toBeVisible();

  await page.getByLabel("Username").fill("testuser");
  await page.getByLabel("Password").fill("password");

  await expect(page.getByText("Dances")).toBeHidden();

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Dances")).toBeVisible();
});

test("logout", async ({ page, request }) => {
  await request.post(`${backendUrl}/test/auth`, {
    data: { username: "testuser", password: "password" },
  });

  await page.goto("/");
  await page.getByRole("link", { name: "Profile" }).click();

  await expect(page.getByText("Login")).toBeVisible();

  await page.getByLabel("Username").fill("testuser");
  await page.getByLabel("Password").fill("password");

  await expect(page.getByText("Dances")).toBeHidden();

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Dances")).toBeVisible();

  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByRole("button", { name: "Logout" }).click();

  await expect(page.getByText("Login")).toBeVisible();
});
