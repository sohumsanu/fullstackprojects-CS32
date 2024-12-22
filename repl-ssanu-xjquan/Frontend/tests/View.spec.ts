import { test, expect } from "@playwright/test";

test("alert when I view before load", async ({ page }) => {
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

test("view successful after loading RI filepath", async ({
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

  const value = page.getByLabel("history");

  await expect(value).toContainText("154,441.00");
});

test("view successful after loading and searching RI filepath", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search "City/Town" "Rhode Island"');

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("74,489.00");
});

test("view successful after two distinct loads", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\Ri_city_and_town");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load C:\\cs320\\Sprint4\\Backend\\src\\data\\ten_star_repeats");
  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toContainText("Rigel Kentaurus B");
});
