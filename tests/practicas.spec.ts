import { test, Browser, Page, expect } from '@playwright/test';
 
 
  test("SauceDemo", async ({ page }) => {

    await test.step("Empezamos a automatizar ", async () => {

      await page.goto("https://www.saucedemo.com/")

      
    })

});