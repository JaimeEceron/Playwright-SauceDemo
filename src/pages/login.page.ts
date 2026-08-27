import { Page, Locator } from '@playwright/test';

export class LoginPage {
    
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async validateLogin() {
    if (await this.errorMessage.isVisible()) {
      const message = await this.errorMessage.textContent();
      throw new Error(
        `Error al iniciar sesión, revisa el archivo .env: ${message}`
      );
    }
}

  async loginWithEnvCredentials() {
    
    const username = process.env.SAUCE_USERNAME || '';
    const password = process.env.SAUCE_PASSWORD || '';

    await this.usernameInput.fill("standard_user");
    await this.passwordInput.fill("secret_sauce");
    await this.loginButton.click();
  }
}