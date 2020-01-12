/**
 * Module that contains methods to validate request input params.
 */

// Create module container.
const validator = {

  /**
   * Parse string value.
   * @param {*} value
   * @return {string|null}
   */
  parseString: (value) => {
    return typeof value === 'string' && value.trim().length ? value.trim() : null
  },

  /**
   * Parse boolean value.
   * @param {*} value
   * @return {boolean}
   */
  parseBoolean: (value) => {
    return typeof value === 'boolean' && value
  },

  /**
   * Parse positive integer number value.
   * @param {*} value
   * @return {number|null}
   */
  parsePositiveInteger: (value) => {
    return typeof value === 'number' && value >= 0 ? parseInt(value) : null
  },

  /**
   * Parse positive float number value.
   * @param {*} value
   * @return {number|null}
   */
  parsePositiveFloat: (value) => {
    return typeof value === 'number' && value > 0 ? parseFloat(value) : null
  },
  /**
   * Parse email value.
   * @param {*} value
   * @return {string|null}
   */
  parseEmail: (value) => {
    const emailRegExp = /^[a-z0-9\-_.]+[@][a-z0-9\-_.]+[.][a-z]{2,}$/i;
    return typeof value === 'string' && value.trim().length && emailRegExp.test(value) ? value : null;
  },

  /**
   * Check that the password string meets the minimum requirements.
   * Current minimum requirements: at least 6 characters, at least 1 upper case
   * and 1 number. 
   * @param {string} password 
   * @returns {boolean}
   */
  passwordIsValid: ({password}) => {
    const match = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}','g')
    return match.test(password)
  }
}
// Export the module.
module.exports = validator