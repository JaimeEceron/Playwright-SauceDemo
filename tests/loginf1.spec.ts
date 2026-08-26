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
    });

    await test.step("Validar credenciales incorrectas", async () => {
      await loginPage.validateLogin();
    });

    await test.step("Validamos el URL de Inventario", async () => {  
      await expect(page).toHaveURL(/.*inventory*/);
    });

    await test.step("Validar el titulo de Inventario", async () => {
      await expect(page).toHaveTitle("Swag Labs");
    });

    await test.step("Ordenamos los productos de la Z-A", async () => {
      await page.locator('[data-test="product-sort-container"]').selectOption("Name (Z to A)");
      await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue("za");      
      console.log("Opcion seleccionada correctamente Z - A");
    });

    

  });
});
});