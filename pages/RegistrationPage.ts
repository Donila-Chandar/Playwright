import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { registrationSelectors } from '../selectors/registrationSelectors';

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    await registrationSelectors.firstName(this.page).fill(firstName);
    await registrationSelectors.lastName(this.page).fill(lastName);
    await registrationSelectors.email(this.page).fill(email);
    await registrationSelectors.password(this.page).fill(password);
    await registrationSelectors.confirmPassword(this.page).fill(password);
    await registrationSelectors.registerButton(this.page).click();
  }

  async expectRegistrationCompleted() {
    await expect(this.page.getByText(/registration completed/i)).toBeVisible();
  }
}