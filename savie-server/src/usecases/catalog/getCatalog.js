const database = require('../../services/database');
const validator = require('../../services/validator');
const verifyToken = require('../token/verifyToken');
const CatalogItem = require('../../models/CatalogItem');
const ResponseContainer = require('../../models/ResponseContainer');

/**
 * Get catalog.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const getCatalog = async (requestData) => {
  // Get the token from the headers.
  const tokenId = validator.parseString(requestData.headers.token);

  // Verify user token.
  /** @var {Token} token */
  const verifiedToken = await verifyToken(tokenId);
  if (!verifiedToken) {
    return new ResponseContainer(403, {error: 'Token is invalid'})
  }

  // Lookup the catalog.
  const defaultCatalogId = 'main';
  const rawCatalogItems = await database.read('catalogs', defaultCatalogId);

  // Create catalog items instances.
  const catalogItems = rawCatalogItems.map(rawCatalogItem => new CatalogItem(rawCatalogItem).toObject());
  return new ResponseContainer(200, catalogItems);
};

// Export module.
module.exports = getCatalog;
