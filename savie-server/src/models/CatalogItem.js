// Dependencies.
const validator = require('../services/validator');

/**
 * CatalogItem class.
 */
class CatalogItem {
  /**
   * Catalog item constructor.
   * @param {number} id
   * @param {string} name
   * @param {number} price
   * @param {string} image
   * @param {string} description
   * @param {number} quantity
   */
  constructor({id, name, price, image, description, quantity}) {
    this.id = validator.parsePositiveInteger(id)
    this.name = validator.parseString(name)
    this.price = validator.parsePositiveFloat(price)
    this.image = image
    this.description = description
    this.quantity = quantity
  }

  /**
   * Convert catalog item to public object.
   * @return {object}
   */
  toObject() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
      description: this.description,
      quantity: this.quantity
    };
  }
}

// Export the module.
module.exports = CatalogItem;
