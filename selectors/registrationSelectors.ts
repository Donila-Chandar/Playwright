import type { Page } from '@playwright/test';

export const registrationSelectors = {
  firstName: (page: Page) => page.getByLabel(/first name/i),
  lastName: (page: Page) => page.getByLabel(/last name/i),
  email: (page: Page) => page.getByLabel(/^email:?$/i),
  password: (page: Page) => page.getByLabel(/^password:?$/i),
  confirmPassword: (page: Page) => page.getByLabel(/confirm password/i),
  registerButton: (page: Page) => page.getByRole('button', { name: /^register$/i }),
};