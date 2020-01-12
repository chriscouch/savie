/**
 * Create and export configuration variables.
 */

// General container for all the environments.
const environments = {

// Staging (default) environment.
staging : {
  httpPort: 3000,
  httpsPort: 3001,
  environmentName: 'staging',
  hashingSecret: 'thisIsASecret',
  tokenLifetime: 1000 * 60 * 60,
  templateDir: 'templates',
  stripe: {
    host: 'api.stripe.com',
    secretKey: 'sk_test_5cfBrgKBwP6sNzyC2542mF7U',
  },
  mailgun: {
    domainName: 'sandboxd957c937028644939433d153bf5edcf5.mailgun.org',
    host: 'api.mailgun.net',
    authUsername: 'api',
    privateKey: '60e4919a1c9644939002b97cec2dd53c-059e099e-adebc9e9',
    from: 'postmaster@sandboxd957c937028644939433d153bf5edcf5.mailgun.org'
  },
  templateGlobals: {
    appName: 'Nexus',
    navColor: 'indigo darken-4',
    btnColor: 'orange accent-4'
  },
  _templateGlobals: {
    appName: 'Savie',
    navColor: 'gray darken-4',
    btnColor: 'orange accent-4'
  }
},

// Production environment.
production : {
  httpPort: 5000,
  httpsPort: 5001,
  environmentName: 'production',
  hashingSecret: 'thisIsAlsoASecret',
  tokenLifetime: 1000 * 60 * 60,
  templateDir: 'templates',
  stripe: {
    host: 'api.stripe.com',
    secretKey: 'sk_test_XXXXXXXXXXXXXXXXXXXXXX',
  },
  mailgun: {
    domainName: 'sandboxXXXXXXXXXXXXXXXXXX.mailgun.org',
    host: 'api.mailgun.net',
    authUsername: 'api',
    privateKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
    from: 'postmaster@sandboxXXXXXXXXXXXXXXXXXX.mailgun.org'
  },
  templateGlobals: {
    appName: 'Nexus',
    navColor: 'indigo darken-4',
    btnColor: 'orange accent-4'
  }
}
}
// Determine which environment was passed as command-line argument.
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : ''

// Check that current environment is one of the environments above, if not, default to staging.
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging

// Export the module.
module.exports = environmentToExport;
