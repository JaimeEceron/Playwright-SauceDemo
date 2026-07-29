import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { spec } from 'node:test/reporters';
 
 test.describe("Automatizacion en SauceDemo", () => {

  test("SauceDemo", async ({ page }) => {

    await test.step("Configuramos LoginPage ", async () => {

      const loginPage = new LoginPage(page);

      await test.step("Abrir navegador en el Login", async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.loginWithEnvCredentials();

      await expect(page).toHaveURL(/.*inventory*/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();




    });

    });
});
});