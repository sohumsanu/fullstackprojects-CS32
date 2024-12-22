// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR SEARCHES */

test("alert when I search before load", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe("File not loaded");
    await alert.dismiss();
  });

  await page.getByRole("button").click();
});

test("alert when there are no searches found for the given file", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Age 18");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe("No searches found given column Age and value 18");
  });

  await page.getByRole("button").click();
});

/* SUCCESSFUL SEARCHES */

test("search successful after loading RI filepath with column 'Median Household Income' and value '74,489.00", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search "Median Household Income" "74,489.00"');

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("Rhode Island");
});

test("search successful after loading RI filepath without column headers for value 'Rhode Island'", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search "No Headers" "Rhode Island"');

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("74,489.00");
});

test("search successful after loading and viewing RI filepath", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search "No Headers" "Rhode Island"');

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("39,603.00");
});

test("search successful after loading and searching another file", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:cs320Sprint4Backendsrcdata\ten_star_repeats");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search "Sol" "Rigel Kentaurus B"');

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:cs320Sprint4BackendsrcdataRi_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search "No Headers" "Rhode Island"');

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("74,489.00");
});
