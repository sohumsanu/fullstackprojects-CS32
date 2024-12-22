import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
  window.HTMLElement.prototype.scrollIntoView = function () {};
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("search", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file ./ten_star.csv");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `load_file ./ten_star.csv`;
  await expect(page.getByLabel("history-item")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Button")).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
});

test("Input bar is visible on page load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

// Ensure text changes when typing into the input box
test("Text changes after typing into the input box", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const mock_input = `Test command`;
  await page.getByLabel("Command input").fill(mock_input);
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

// Ensure mode toggles between verbose and brief using handleSubmit2
test("Mode toggles correctly", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const initialMode = await page.textContent(".ppadding p");
  await page.click('input[value="Mode"]');
  const toggledMode = await page.textContent(".ppadding p");
  expect(initialMode).not.toBe(toggledMode);
});

// Test command history update after submitting a command using handleSubmit
test("Command history updates after command submission", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const command = "command1";
  await page.getByLabel("Command input").fill(command);
  await page.click('input[value="Submit"]');
  const latestHistory = await page.textContent("selector_for_history_item"); // Replace with appropriate selector
  expect(latestHistory).toContain(command);
});

// Test for potential empty results
test("Handling of command producing empty result", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill(""); // Empty command
  await page.click('input[value="Submit"]');
  // Verify the result is empty (you might need to adjust this based on how your app displays results)
  const result = await page.textContent("selector_for_result"); // Replace with appropriate selector
  expect(result).toBe("");
});

// Test a potential dataset with only one column
test("Handling of command with one column data", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const single_column_command = `some_command`; // Replace with an actual command
  await page.getByLabel("Command input").fill(single_column_command);
  await page.click('input[value="Submit"]');
  // Verify the result has one column (you might need to adjust this based on expected behavior)
});
