/* *
 * @file Primary file for the API.
 * 
 * To Do list for the application
 * @todo Add worker code
 * @todo More 
 *
 */


// Dependencies.
const server = require('./src/server')
const cli = require('./src/cli')
//const workers = require('./src/workers')

// Declare the app.
const app = {
  init: () => {
    // Start the server.
    server.init()

    //start workers
    //workers.init()

    // Start the CLI, but make sure it starts last.
    setTimeout(() => {
      cli.init()}, 50)
  }
}

// Execute.
app.init()

// Export the module.
module.exports = app
