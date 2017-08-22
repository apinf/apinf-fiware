// Buffer has to be defined in this version of Meteor
global.Buffer = global.Buffer || require("buffer").Buffer

// Dependencies imports
import nock from 'nock'
import { expect } from 'meteor/practicalmeteor:chai'

// Basic request info that all mocks use
const requestInfo = {
  redirectURI: 'http://localhost:3000/_oauth/fiware',
  rootUrl: 'https://localhost:3010',
  clientId: 'bd78834613d94aaf939646f9014a0894',
  secret: 'be2d674d4d0f4e97b10d3c63e78fd06a',
  authHeader: 'YmQ3ODgzNDYxM2Q5NGFhZjkzOTY0NmY5MDE0YTA4OTQ6YmUyZDY3NGQ0ZDBmNGU5N2IxMGQzYzYzZTc4ZmQwNmE=='
}

// Denfines nock
const fiwareMock = nock(requestInfo.rootUrl)

// Mock info for the Access token request
const accessTokenMock = {
  path: '/oauth2/token',
  requestParams: {
    code: 'e1ZuldvzJi7IKgNo17DdDoyqr0LN2S',
    redirect_uri: 'http://localhost:3000/_oauth/fiware',
    grant_type: 'authorization_code'
  },
  requestHeaders: {
    Authorization: `Basic ${requestInfo.authHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    Host: "account.lab.fiware.org",
    "Content-length": 126
  },
  responseHeaders: {},
  responseBody: {
    access_token: 'b2f1CJY819xKaa8Y0LFygkH1e9HRuI',
    refresh_token: 'qExtjn5h26NsGy5LEvJ3FdNcoIQ3Jz',
    expires_in: 3600,
    token_type: 'Bearer'
  }
}

// Defines mock for access token request
fiwareMock
  // Changes randomly generated code to pre-determined one
  .filteringRequestBody(
    /code=[^&]*/g,
    `code=${accessTokenMock.requestParams.code}`
  )
  .post(
    accessTokenMock.path,
    accessTokenMock.requestParams
  )
  .reply(
    200,
    accessTokenMock.responseBody
  )

// Mock info for the account information request
const getAccountMock = {
  path: '/user',
  requestParams: {
    access_token: accessTokenMock.responseBody.access_token
  },
  requestHeaders: {
    "authorization": "Basic YmQ3ODgzNDYxM2Q5NGFhZjkzOTY0NmY5MDE0YTA4OTQ6YmUyZDY3NGQ0ZDBmNGU5N2IxMGQzYzYzZTc4ZmQwNmE=",
    "host": "account.lab.fiware.org"
  },
  responseHeaders: {},
  responseBody: {
    organizations: [],
    displayName: 'vellames',
    roles: [
      { name: 'provider', id: '106' }
    ],
    app_id: 'bd78834613d94aaf939646f9014a0894',
    isGravatarEnabled: false,
      email: 'c.vellames@outlook.com',
    id: 'vellames'
  }
}

// Defines mock for access token request
const fiwareMockAccountHeaders = nock(
  requestInfo.rootUrl,
  {
    reqheaders: getAccountMock.requestHeaders
  }
)

// Defines accesstoken URL to intercept and reply data
fiwareMockAccountHeaders
  .get(
    `${getAccountMock.path}?access_token=${getAccountMock.requestParams.access_token}`
  )
  .reply(
    200,
    getAccountMock.responseBody
  )


// Allow insert for config document
ServiceConfiguration.configurations.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return true;
  }
})

describe('retrieveCredential property', function() {
  it('should be a function', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if Fiware.retrieveCredential is not a function
    try {

      // Expects to be function. If not, throw error
      expect(typeof Fiware.retrieveCredential).to.be.equal('function')
    } catch(e) {

      // Catchs thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

})
describe('whitelistedFields property', function() {
  it('should be an array', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if Fiware.whitelistedFields is an array
    try {
      // Expects to be array. If not, throw error
      expect(Fiware.whitelistedFields).to.be.an('array')
    } catch(e) {
      // Catchs thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })
  it('should have correct white listed fields', function(done) {
    // Correct array of fields to return
    const correctArray = ['id', 'email', 'displayName']

    // variable to determine if array is match or not
    let arraysMatch = true

    // Error variable
    let err = null

    // Try/Catch statement that throws error if arrays does not match
    try {
      // Return true if an element is not
      arraysMatch =
        !correctArray.some(field => Fiware.whitelistedFields.indexOf(field) == -1)

      // Check using the other array as validator, to make sure both are equal
      arraysMatch =
        !Fiware.whitelistedFields.some(field => correctArray.indexOf(field) == -1)

      // Expect arrays to match. If not, throw err
      expect(arraysMatch).to.be.ok
    } catch(e) {

      // Catchs thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

})
