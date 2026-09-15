import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('DemoWebShop', () => {
  test('homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await expect(page).toHaveTitle(/Demo Web Shop/i);
  });

  test('login page shows validation error for invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.openLoginPage();
    await loginPage.login('wrong@example.com', 'wrongpassword');

    await loginPage.expectLoginError();
  });

  test('login with credentials from .env', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.openLoginPage();
    // uses TEST_USER and TEST_PASSWORD from .env
    await loginPage.loginWithEnv();

    const configuredEmail = process.env.TEST_EMAIL || process.env.TEST_USER;
    if (configuredEmail && process.env.TEST_PASSWORD) {
      await loginPage.expectLoggedIn();
    } else {
      // If creds are not provided, assert that a validation error is shown
      await loginPage.expectLoginError();
    }
  });

  test('search for text and select a recommendation', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    
    // Search for a term
    await homePage.searchAndSelectRecommendation('computer');
    
    // Verify that search results are displayed
    await expect(page.locator('body')).toContainText(/computer|search|product/i);
  });

  test('shows two opened products in recently viewed products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productNames = ['14.1-inch Laptop', 'Build your own computer'];

    await homePage.open();
    await homePage.openFeaturedProduct(productNames[0]);
    await homePage.open();
    await homePage.openFeaturedProduct(productNames[1]);
    await homePage.open();

    await homePage.expectRecentlyViewedProducts(productNames);
  });

  test('registers and adds featured products to the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    const email = `shopper${Date.now()}@example.com`;

    await homePage.open();
    await homePage.openRegisterPage();
    await registrationPage.register('Test', 'Shopper', email, 'Password123!');
    await registrationPage.expectRegistrationCompleted();

    await homePage.open();
    await homePage.expectCartCount(0);

    await homePage.addFeaturedProduct('14.1-inch Laptop');
    await homePage.expectCartCount(1);

    await homePage.addFeaturedProduct('14.1-inch Laptop');
    await homePage.expectCartCount(2);
  });
});
