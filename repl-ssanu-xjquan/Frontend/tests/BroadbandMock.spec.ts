import { test, expect } from "@playwright/test";

test.describe("REPLInput Mock Command Test", () => {
  test('Should handle "mock" command', async ({ page }) => {
    // Navigate to your React application
    await page.goto("http://localhost:8000");

    // Enter the "mock" command and submit it
     await page.getByLabel("Command input").click();
     await page.getByLabel("Command input").fill("mock MODE BRIEF");
     await page.getByRole("button").click();

    // Get the text content of the history entry
    const value = page.getByLabel("history");

    // Verify that the response contains the expected text
    await expect(value).toContainText("MODE BRIEF");
  });
});
