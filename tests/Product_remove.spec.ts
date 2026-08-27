import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

 test.describe("Automatizacion en SauceDemo", () => {

  test("Validando carrito de compras", async ({ page }) => {

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

    await test.step("Añadimos 1 articulo al carrito para su validación", async() =>{
      await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
      await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
      console.log("Se ha añadido la playera roja al carrito validando un articulo en el carrito")
    });

    await test.step("Entramos al carrito a validar que se coloco la playera roja", async() =>{
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page.locator('[data-test="item-3-title-link"]')).toContainText("T-Shirt (Red)");
      console.log("Se valdo que existe el articulo en el carrito")
    });

    await test.step("Removemos la playera roja y salimos con el boton de Continuar Comprando", async() =>{
      await page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
      await page.locator('[data-test="continue-shopping"]').click();
    });
    
  });
});
});