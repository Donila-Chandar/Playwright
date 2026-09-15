import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { homeSelectors } from '../selectors/homeSelectors';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    const baseUrl = process.env.BASE_URL || 'https://demowebshop.tricentis.com';
    await this.goto(baseUrl);
    await this.waitForPageReady();
  }

  async openLoginPage() {
    await homeSelectors.loginLink(this.page).click();
  }

  async openRegisterPage() {
    await homeSelectors.registerLink(this.page).click();
  }

  async searchFor(text: string) {
    await homeSelectors.searchInput(this.page).fill(text);
    await homeSelectors.searchButton(this.page).click();
  }

  async searchAndSelectRecommendation(searchText: string) {
    const searchInput = homeSelectors.searchInput(this.page);
    const searchButton = homeSelectors.searchButton(this.page);
    
    // Wait for input to be available and fill it
    await searchInput.first().waitFor({ state: 'attached', timeout: 5000 });
    await searchInput.first().fill(searchText);
    
    // Click search button
    await searchButton.click();
    
    // Wait for page to load but with a timeout
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    
    // Wait a bit for content to render
    await this.page.waitForTimeout(1000);
  }

  async openCart() {
    await homeSelectors.cartLink(this.page).click();
  }

  async addFeaturedProduct(name: string) {
    const addToCartButton = homeSelectors.featuredProduct(this.page, name).getByRole('button', { name: /add to cart/i });
    await Promise.all([
      this.page.waitForResponse((response) => response.url().includes('/addproducttocart/catalog/') && response.ok()),
      addToCartButton.click(),
    ]);
  }

  async openFeaturedProduct(name: string) {
    await homeSelectors.featuredProduct(this.page, name).getByRole('link', { name }).first().click();
    await this.waitForPageReady();
  }

  async expectRecentlyViewedProducts(names: string[]) {
    const recentlyViewedProducts = homeSelectors.recentlyViewedProducts(this.page);
    await expect(recentlyViewedProducts).toBeVisible();

    for (const name of names) {
      await expect(recentlyViewedProducts.getByRole('link', { name, exact: true })).toBeVisible();
    }
  }

  async expectCartCount(count: number) {
    await expect(homeSelectors.cartLink(this.page)).toContainText(`(${count})`);
  }
}
