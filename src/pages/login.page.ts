import { Page, Locator } from '@playwright/test';

export class LoginPage {
    
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async navigateToLoginPage() {
    await this.page.goto('/');
  }

  async loginWithEnvCredentials() {
    
    const username = process.env.SAUCE_USERNAME || '';
    const password = process.env.SAUCE_PASSWORD || '';

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}