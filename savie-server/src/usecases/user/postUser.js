// Dependencies.
const database = require('../../services/database')
const User = require('../../models/User')
const ResponseContainer = require('../../models/ResponseContainer')
const test = require('../../services/validator')

/**
 * Create user.
 * @param {object} requestData
 * @return {Promise}
 */
const postUser = async (requestData) => {
  // Get raw user request data.
  const userRawData = requestData.payload;

  // Since this is a POST we are seeing the password for the first time.
  //Check that the password string meets minimum requirements. 
  if (!test.passwordIsValid(userRawData)) {
    return new ResponseContainer(400, {error: 'Password does not meet minimmum requirements'})
  }

  // Create User instance from raw data.
  const user = new User().fromObject(userRawData);

  // Check if user instance has all required fields.
  if (!user.isValid()) {
    return new ResponseContainer(400, {error: 'Missing required fields'})
  }


  // Make sure that the user doesn't already exists.
  const userData = await database.read('users', user.email)
  if (userData) {
    return new ResponseContainer(400, {error: 'A user with that email already exists'})
  }

  // Store the user.
  await database.create('users', user.email, user)
  return new ResponseContainer(200, user.toObject())
};

// Export module.
module.exports = postUser;
