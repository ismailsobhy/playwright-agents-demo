import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username = '[data-test="username"]';
  readonly password = '[data-test="password"]';
  readonly loginBtn = '[data-test="login-button"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(usernameText: string, passwordText: string) {
    await this.page.locator(this.username).fill(usernameText);
    await this.page.locator(this.password).fill(passwordText);
    await this.page.locator(this.loginBtn).click();
  }
}
