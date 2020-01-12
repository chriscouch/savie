/**
 * NotFound request handler.
 */

// Dependencies.
const ResponseContainer = require('../models/ResponseContainer')
const templateController = require('./templateController')

/**
 * Not found controller.
 * @param {RequestData} requestData
 * @return {Promise}
 */
const notFoundController = async (requestData) => {

  // Check if the request was for the API by looking for the api/ path. If yes, send the API 404.
  // If no, assume the requet was looking for HTML and send the HTML 404.
  if (requestData.trimmedPath.split('/')[0] == 'api') {
    
    //Send api 404
    return new ResponseContainer(404,{error: "Resource not found."});
  
  } else {

    //Send the HTML 404
    //debug(`Not found: ${requestData.trimmedPath}`)

    requestData.trimmedPath = 'not/found'
    var controllerData = {'head.title' : '404'}

    const repContainer = await templateController(requestData, controllerData)

    repContainer.statusCode = 404

   return repContainer
    }
  }

// Export the module.
module.exports = notFoundController;
