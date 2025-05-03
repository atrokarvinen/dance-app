import test, { expect } from "@playwright/test";

test("sign up and login", async ({ page, request }) => {
  await request.delete("/test/auth?username=testuser");

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

test("logout", async ({ page }) => {
  await page.goto("/");
});
