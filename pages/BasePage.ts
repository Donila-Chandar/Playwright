import type { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(pathOrUrl: string) {
    // If a full URL is provided, navigate to it. Otherwise resolve against BASE_URL.
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
      await this.page.goto(pathOrUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      return;
    }

    // Let Playwright resolve relative URLs against `use.baseURL` from playwright.config.ts
    await this.page.goto(pathOrUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
