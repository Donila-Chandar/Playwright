import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { loginSelectors } from '../selectors/loginSelectors';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/login');
    await this.waitForPageReady();
  }

  async login(email: string, password: string) {
    await loginSelectors.email(this.page).fill(email);
    await loginSelectors.password(this.page).fill(password);
    await loginSelectors.loginButton(this.page).click();
  }

  async loginWithEnv() {
    const email = process.env.TEST_EMAIL || process.env.TEST_USER || '';
    const password = process.env.TEST_PASSWORD || '';
    await this.login(email, password);
  }

  async isLoggedIn() {
    return await loginSelectors.logoutLink(this.page).isVisible();
  }

  async expectLoggedIn() {
    await expect(loginSelectors.logoutLink(this.page)).toBeVisible({ timeout: 10000 });
  }

  async expectLoginError() {
    const loginError = loginSelectors.validationErrors(this.page).first();
    await expect(loginError).toBeVisible({ timeout: 10000 });
    await expect(loginError).toContainText(/credentials provided are incorrect|login was unsuccessful/i);
  }
}
