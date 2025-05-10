import { expect } from "@playwright/test";
import { DancePatternForm } from "./dance-pattern-form";
import { test } from "./dance-patterns-fixture";

test("creates, updates and deletes a dance", async ({ dancePatternPage }) => {
  const danceName = "Test Dance";
  const dancePattern: DancePatternForm = {
    name: "Test dance pattern",
    description: "Test description",
    videoUrl: "https://example.com/video.mp4",
  };

  await dancePatternPage.goToDance(danceName);

  // Create
  await dancePatternPage.createDancePattern(dancePattern);
  await expect(dancePatternPage.getDancePattern(danceName)).toBeVisible();

  await dancePatternPage.openEditDancePattern(danceName);
  await dancePatternPage.verifyDancePatternForm(dancePattern);
  await dancePatternPage.goToDance(danceName);

  // Update
  const updatedDance: DancePatternForm = {
    ...dancePattern,
    name: "Updated dance pattern",
  };
  await dancePatternPage.updateDancePattern(danceName, updatedDance);
  const patternLocator = dancePatternPage.getDancePattern(updatedDance.name);
  await expect(patternLocator).toBeVisible();
  await expect(dancePatternPage.getDancePattern(danceName)).toBeHidden();

  // Delete
  await dancePatternPage.deleteDancePattern(updatedDance.name);
  await expect(patternLocator).toBeHidden();
});

test("loads dances after page refresh", async ({ dancePatternPage }) => {
  const dance: DancePatternForm = { name: "Test dance pattern" };

  await dancePatternPage.goToDance("Test Dance");
  await dancePatternPage.createDancePattern(dance);
  await expect(dancePatternPage.getDancePattern(dance.name)).toBeVisible();

  // Refresh the page
  await dancePatternPage.page.reload();
  await expect(dancePatternPage.getDancePattern(dance.name)).toBeVisible();
});
