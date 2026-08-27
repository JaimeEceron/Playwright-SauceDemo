import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

 test.describe("Vaidando en Sauce Demo", () => {

  test("Añadiendo varios articulos al carrito", async ({ page }) => {

    await test.step("}LoginPage ", async () => {

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

    await test.step("Validamos que los articulos esten del mas caro al mas barato", async () => {
        await page.locator('[data-test="product-sort-container"]').selectOption("Price (high to low)");
        await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue("hilo");
    });

    await test.step("Añadimos 3 articulos de diferentes y validamos el contador en el carrito", async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("3");
    });

    await test.step("Entramos a carrito para validar os articulos seleccionados", async () => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.getByRole("link", { name: "Sauce Labs Fleece Jacket" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Sauce Labs Bolt T-Shirt" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Sauce Labs Onesie" })).toBeVisible();
    });



});
});
});