import type { Page } from '@playwright/test';

export const homeSelectors = {
  loginLink: (page: Page) => page.getByRole('link', { name: /log in/i }),
  registerLink: (page: Page) => page.getByRole('link', { name: /register/i }),
  searchInput: (page: Page) => page.locator('input[id*="q"], input[name*="q"], input[id*="SearchString"], input#SearchString'),
  searchButton: (page: Page) => page.getByRole('button', { name: /search/i }),
  cartLink: (page: Page) => page.getByRole('link', { name: /^Shopping cart \(\d+\)$/ }).first(),
  featuredProduct: (page: Page, name: string) => page.locator('.product-grid .item-box').filter({ hasText: name }),
  userNameLink: (page: Page) => page.getByRole('link', { name: /customer/i }),
};
