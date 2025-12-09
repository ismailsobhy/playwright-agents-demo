import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  
  // Locators defined at the top
  readonly addBackpackButton: Locator;
  readonly addBikeLightButton: Locator;
  readonly addBoltTshirtButton: Locator;
  readonly cartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addBikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.addBoltTshirtButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpack() {
    await this.addBackpackButton.click();
  }

  async addBikeLight() {
    await this.addBikeLightButton.click();
  }

  async addBoltTshirt() {
    await this.addBoltTshirtButton.click();
  }

  // Dynamic locator stays in method
  async addByTestId(testId: string) {
    await this.page.locator(`[data-test="${testId}"]`).click();
  }

  async cartBadgeText(): Promise<string | null> {
    if (await this.cartBadge.count() === 0) return null;
    return (await this.cartBadge.textContent())?.trim() ?? null;
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  // Dynamic locator stays in method
  productByName(name: string): Locator {
    return this.page.getByText(name);
  }
}