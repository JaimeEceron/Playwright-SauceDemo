import { test, Browser, Page, expect } from '@playwright/test';
 
 
  test("SandBox", async ({ page }) => {

    await test.step("Empezamos a automatizar cosas", async () => {

      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
      await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();

      await page.getByText('OMG, aparezco después de 3').isVisible

    })

});