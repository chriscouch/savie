/**
 * catalog request handlers.
 */

// Dependencies.
const getCatalog = require('../usecases/catalog/getCatalog');
const ResponseContainer = require('../models/ResponseContainer');

/**
 * catalog controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
userController = async (requestData) => {
  switch (requestData.method) {
    case 'get':
      return await getCatalog(requestData);

    default:
      return new ResponseContainer(405, {error: 'Method is not allowed'});
  }
};

// Export the module.
module.exports = userController;
