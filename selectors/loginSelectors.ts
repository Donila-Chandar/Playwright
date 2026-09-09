import type { Page } from '@playwright/test';

export const loginSelectors = {
  email: (page: Page) => page.getByLabel(/email/i),
  password: (page: Page) => page.getByLabel(/password/i),
  loginButton: (page: Page) => page.getByRole('button', { name: /log\s*in/i }),
  logoutLink: (page: Page) => page.getByRole('link', { name: /log\s*out/i }),
  validationErrors: (page: Page) => page.locator('.validation-summary-errors, .message-error, [class*="message-error"]'),
};
