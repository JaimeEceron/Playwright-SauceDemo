import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { CheckoutPage } from '../src/pages/checkout.page';
import { LogoutPage } from '../src/pages/logout.page';

 test.describe("Vaidando en Sauce Demo", () => {

  test("Añadiendo varios articulos al carrito", async ({ page }) => {

    let totalsumado: number;

    await test.step("}LoginPage ", async () => {

      const loginPage = new LoginPage(page);
      const checkoutPage = new CheckoutPage(page);
      const logoutPage = new LogoutPage(page);

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

    await test.step("Entramos a carrito para validar los articulos seleccionados", async () => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.getByRole("link", { name: "Sauce Labs Fleece Jacket" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Sauce Labs Bolt T-Shirt" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Sauce Labs Onesie" })).toBeVisible();
        console.log("Articulos seleccionados correctamente");
    });

    await test.step("Validamos el precio de los articulos para sumarlos", async() => {
      const productojacket = page.locator('[data-test="inventory-item"]').filter({ hasText: "Sauce Labs Fleece Jacket" });
      const preciojacket = await productojacket.locator('[data-test="inventory-item-price"]').innerText();
      const preciojacketfinal = preciojacket.replace('$','');
      const productotshiirt = page.locator('[data-test="inventory-item"]').filter({ hasText: "Sauce Labs Bolt T-Shirt" });
      const preciotshirt = await productotshiirt.locator('[data-test="inventory-item-price"]').innerText();
      const preciotshirtfinal = preciotshirt.replace('$','');
      const productoonesie = page.locator('[data-test="inventory-item"]').filter({ hasText: "Sauce Labs Onesie" });
      const precioonesie = await productoonesie.locator('[data-test="inventory-item-price"]').innerText();
      const precioonesiefinal = precioonesie.replace('$','');

      const totalsumado = Number(preciojacketfinal) + Number (precioonesiefinal) + Number (preciotshirtfinal);  
      console.log("El tota antes de impuestos es de:",totalsumado);
      
    })

    await test.step("Realizamos el Checkout llenando la informacion mediante POM", async () => {
      await page.locator('[data-test="checkout"]').click();
      await checkoutPage.checkoutInfo();
    });

    await test.step("Obtenemos el Total de la compra para el reporte", async () => {
      const total = await page.locator('[data-test="total-label"]').innerText();
      const monto = Number(total.replace('Total: $', ''));
      console.log("El monto Total de nuestra compra con impuestos es de:",monto);
      await page.locator('[data-test="finish"]').click();
    });

    await test.step("Generamos el PDF de nuestra orden y cerramos sesion", async () => {
      await page.locator('[data-test="generate-pdf-order"]').click();
      await logoutPage.logoutsesion();
      await logoutPage.valldatelloginbutton();
    })

});
});
});