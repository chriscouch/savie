// Dependencies.
const database = require('../../services/database');
const validator = require('../../services/validator');
const verifyToken = require('../token/verifyToken');
const CatalogItem = require('../../models/CatalogItem');
const ShoppingCart = require('../../models/ShoppingCart');
const ResponseContainer = require('../../models/ResponseContainer');

/**
 * Add items to the card.
 * @param requestData
 * @return {Promise}
 */
const putCart = async (requestData) => {
  // Get token id from headers.
  const tokenId = validator.parseString(requestData.headers.token);
  const catalogItemId = validator.parsePositiveInteger(requestData.payload.id);
  const quantity = validator.parsePositiveInteger(requestData.payload.quantity);

  // Verify if payload is valid.
  if (!catalogItemId || quantity < 0) {
    return new ResponseContainer(400, {error: 'Missing required fields'});
  }

  // Verify user token.
  /** @var {Token} token */
  const token = await verifyToken(tokenId);
  if (!token) {
    return new ResponseContainer(403, {error: 'Token is invalid'})
  }

  // Try to fetch user shopping cart.
  const cartData = await database.read('carts', token.email);
  if (!cartData) {
    return new ResponseContainer(404, {error: 'Cart has not been created yet'});
  }

  // Instantiate cart object.
  const shoppingCart = new ShoppingCart().fromSnapshot(cartData);

  // Try to fetch catalog item.
  const catalogData = await database.read('catalogs', 'main');
  if (!catalogData) {
    return new ResponseContainer(500, {error: 'catalog can not be loaded'});
  }

  // Find requested catalog item.
  const catalogItemData = catalogData.find(catalogItem => catalogItem.id === catalogItemId);

  // Check if catalog item was found.
  if (!catalogItemData) {
    return new ResponseContainer(400, {error: 'catalog item with provided id can not be found'});
  }

  // Create catalog item instance.
  const catalogItem = new CatalogItem(catalogItemData);
  catalogItem.quantity = quantity;

  // Add catalog item to the shopping cart.
  shoppingCart.update(catalogItem);

  // Save shopping cart to database.
  await database.update('carts', token.email, shoppingCart);

  return new ResponseContainer(200, shoppingCart);
};

// Export the module.
module.exports = putCart;
