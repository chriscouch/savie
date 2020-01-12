// Dependencies.
const cliHelper = require('../services/cliHelper');
const database = require('../services/database');

/**
 * Execute "catalogs" command.
 * @param {string} inputString
 */
const catalogsCommand = (inputString) => {
  // Load the catalog.
  database.read('catalogs', 'main')
    .then((catalogItems) => {
      // Go through all catalog items and print them to the console.
      catalogItems.forEach((catalogItem) => {
        console.dir(catalogItem, {colors: true});
        cliHelper.verticalSpace();
      });
    });
};

// Export the module.
module.exports = catalogsCommand;
