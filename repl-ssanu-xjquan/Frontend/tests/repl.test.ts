// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";
import { Page } from "playwright";
import { commanddict } from "../src/components/REPL";
import {
  handleview,
  handleload,
  handlemode,
  handsearch,
  handlebroadband,
} from "../src/components/REPLbasefunctions";

/* GENERAL TESTS PROVIDED BY GEARUP */

const sum = require('../src/app');

test("testing whether we can add a function", () => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
    const acomdict = new commanddict();
    acomdict.addCommand("view", handleview);
    acomdict.addCommand("load", handleload);
    acomdict.addCommand("mode", handlemode);
    acomdict.addCommand("search", handsearch);
    acomdict.addCommand("broadband", handlebroadband);
    expect(acomdict.getCommand("view")).toBe(handleview);
    expect(acomdict.getCommand("load")).toBe(handleload);
    expect(acomdict.getCommand("mode")).toBe(handlemode);
    expect(acomdict.getCommand("search")).toBe(handsearch);
    expect(acomdict.getCommand("broadband")).toBe(handlebroadband);
    expect(acomdict).toEqual({"view": handleview, "load": handleload, "mode": handlemode, "search": handsearch, "broadband": handlebroadband});
});

test("new function is added correctly", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("newchar Bob");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText("New Character Created: bob");
}); 