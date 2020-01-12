/**
 * Module that configures available routes in a system.
 */

// Dependencies.
const pingController = require('./controllers/pingController');
const notFoundController = require('./controllers/notFoundController');
const tokenController = require('./controllers/tokenController');
const userController = require('./controllers/userController');
const catalogController = require('./controllers/catalogController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');
const templateController = require('./controllers/templateController');
const assetsController = require('./controllers/assetsController');
const config = require('./config')

// Create module container.
const router = {

// Map path to the specific request handler (controller).
  routes : {
    // API specific routes.
    'api/ping': {
      controller: pingController,
    },

    'api/users': {
      controller: userController,
    },

    'api/tokens': {
      controller: tokenController,
    },

    'api/catalogs': {
      controller: catalogController,
    },

    'api/carts': {
      controller: cartController,
    },

    'api/orders':{
      controller: orderController,
    },

    // Front-End specific routes.
    '': {
      controller: templateController,
      data: {'head.title': 'Nexus'},
    },


    'assets/*': {
      controller: assetsController,
    },

  /* Removed - this page is now a modal in the index page
      'user/account/create': {
      controller: templateController,
      data: {'head.title': 'Create Account'},
    },
  */

    'user/account/edit': {
      controller: templateController,
      data: {'head.title': 'Edit Account'},
    },

  /* Removed - this page is now a modal in the index page
      'user/session/create': {
      controller: templateController,
      data: {'head.title': 'Login'},
    },
  */

    'user/cart/read': {
      controller: templateController,
      data: {'head.title': 'Cart'},
    },

    'user/order/success': {
      controller: templateController,
      data: {'head.title': 'Complete'},
    },

    'user/order/create': {
      controller: templateController,
      data: {'head.title': 'Checkout'},
    },

    'catalog/list': {
      controller: templateController,
      data: {'head.title': 'Services List'},
    }
  },

  // Define notFound (404) controller.
  notFound : notFoundController
  } //router close

  if (config.environmentName === 'staging'){
    router.routes['_/*'] = {
      controller: templateController,
      data: {'head.title': 'Savie'},
      }
  }
// Export the module.
module.exports = router
