import { expect } from "@playwright/test";
import { DanceForm } from "./dance-form";
import { test } from "./dances-fixture";

test("creates, updates and deletes a dance", async ({ dancePage }) => {
  const danceName = "Test Dance";
  const imageUrl = "https://example.com/image.jpg";
  const dance: DanceForm = { name: danceName, imageUrl };

  await dancePage.goTo();

  // Create
  await dancePage.createDance(dance);
  await expect(dancePage.getDance(danceName)).toBeVisible();

  await dancePage.openEditDance(danceName);
  await dancePage.verifyDanceForm(dance);
  await dancePage.goTo();

  // Update
  const updatedDance: DanceForm = { ...dance, name: "Updated Dance" };
  await dancePage.updateDance(danceName, updatedDance);
  await expect(dancePage.getDance(updatedDance.name)).toBeVisible();
  await expect(dancePage.getDance(danceName)).toBeHidden();

  // Delete
  await dancePage.deleteDance(updatedDance.name);
  await expect(dancePage.getDance(updatedDance.name)).toBeHidden();
});

test("loads dances after page refresh", async ({ dancePage }) => {
  const dance: DanceForm = { name: "Test Dance" };

  await dancePage.goTo();
  await dancePage.createDance(dance);
  await expect(dancePage.getDance(dance.name)).toBeVisible();

  // Refresh the page
  await dancePage.page.reload();
  await expect(dancePage.getDance(dance.name)).toBeVisible();
});
