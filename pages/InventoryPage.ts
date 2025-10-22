import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addBackpack() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async addBikeLight() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  }

  async addBoltTshirt() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  }

  async addByTestId(testId: string) {
    await this.page.locator(`[data-test="${testId}"]`).click();
  }

  async cartBadgeText(): Promise<string | null> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() === 0) return null;
    return (await badge.textContent())?.trim() ?? null;
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  productByName(name: string): Locator {
    return this.page.getByText(name);
  }
}
