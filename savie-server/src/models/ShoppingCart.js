// Dependencies.
const MenuItem = require('./CatalogItem');

/**
 * Cart class.
 */
class ShoppingCart {
  /**
   * Cart constructor.
   */
  constructor() {
    // By default the cart is empty.
    this.items = [];
    this.total = 0;
  }

  /**
   * @param {object[]} [items]
   * @return {ShoppingCart}
   */
  fromSnapshot({items = []}) {
    // Normalize items.
    this.items = items.map(menuItemData => new catalogItem(catalogItemData));
    this.total = this.getTotal();

    return this;
  }

  /**
   * Update shopping cart.
   * @param {catalogItem} catalogItem
   * @return {ShoppingCart}
   */
  update(catalogItem) {
    // Try to find existing catalog item and update it.
    const existingCatalogItem = this.items.find(currentCatalogItem => currentCatalogItem.id === catalogItem.id);
    if (existingCatalogItem) {
      // Update existing item in the basket.
      existingCatalogItem.quantity = catalogItem.quantity;
    } else {
      // Add new item to the basket.
      this.items.push(catalogItem);
    }

    // Clean up basket.
    this.cleanup();

    // Recalculate basket total sum.
    this.total = this.getTotal();
  }

  /**
   * Clean up basket from the catalog items with quantity 0.
   */
  cleanup() {
    this.items = this.items.filter(catalogItem => catalogItem.quantity);
  }

  /**
   * Get total amount for the basket.
   * @return {number}
   */
  getTotal() {
    let total = 0;

    this.items.forEach((catalogItem) => {
      total += catalogItem.price * catalogItem.quantity;
    });

    return Math.floor(total * 100) / 100;
  }

  /**
   * Get public cart object.
   * @return {object}
   */
  toObject() {
    return {
      items: this.items,
      total: this.total,
    };
  }
}

// Export the module.
module.exports = ShoppingCart;
