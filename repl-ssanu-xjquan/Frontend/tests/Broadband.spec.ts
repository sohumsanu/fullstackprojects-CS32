// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR BROADBAND */

test("Bad playwright input", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband bad input");
  await page.getByRole("button").click();


  const value = page.getByLabel("history");

  await expect(value).toContainText("Invalid state or county given input:");
});

/* WORKING BROADBAND TESTS */

test("Good playwright input", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband Washington King");
  await page.getByRole("button").click();


  const value = page.getByLabel("history");

  await expect(value).toContainText("Name_and_Percent");
});