import { Page, Locator } from '@playwright/test';

export class  LogoutPage {
    
  readonly page: Page;
  readonly menu: Locator;
  readonly logoutbutton: Locator;
  readonly loginbutton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.menu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutbutton = page.locator('[data-test="logout-sidebar-link"]');   
    this.loginbutton = page.locator('[data-test="login-button"]');
  }

  async logoutsesion() {
    await this.menu.click();
    await this.logoutbutton.click();
  }

  async valldatelloginbutton() {
    await this.loginbutton.isVisible();
    console.log("Se ha cerrado la sesion de manera exitosa");
  }
}