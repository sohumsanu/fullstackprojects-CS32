// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR LOADS */

test("alert when filepath is incorrect", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load filepath_wrong");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe(
      "Error loading the file: Request failed with status: 500"
    );
    // await alert.dismiss();
  });

  await page.getByRole("button").click();
});

/* SUCCESSFUL LOADS */

test("load a filepath", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText(
    "MODE VERBOSELoaded file: C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town"
  );
});

test("load a filepath without headers", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:cs320Sprint4Backendsrcdata\filepathWithoutHeaders");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("MODE VERBOSE");
});

test("load both files and both are present in history", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:cs320Sprint4Backendsrcdata\filepathWithoutHeaders");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText(
    "MODE VERBOSELoaded file: C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town"
  );
  await expect(value).toContainText(
    "C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town"
  )
});
