import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    
  readonly page: Page;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly botonNext: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]'); 
    this.botonNext = page.locator('[data-test="continue"]');   
  }
  async checkoutInfo() {
    await this.nameInput.fill("Jaime");
    await this.lastNameInput.fill("Espinoza Ceron");
    await this.postalCodeInput.fill("56373")
    await this.botonNext.click();
  }
}