// Buffer has to be defined in this version of Meteor
global.Buffer = global.Buffer || require("buffer").Buffer

// Meteor contributed packages imports
import { expect } from 'meteor/practicalmeteor:chai'

// NPM imports
import nock from 'nock'

// Import basic request info that all mocks use
import { requestInfo, accessTokenMock, getAccountMock } from './mock.data.js'

// Use nock to mock rootURL
const fiwareMock = nock(requestInfo.rootURL)

// Define mock for access token request
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

// Define mock for access token request
const fiwareMockAccountHeaders = nock(
  requestInfo.rootURL,
  {
    reqheaders: getAccountMock.requestHeaders
  }
)

// Define accesstoken URL to intercept and reply data
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

describe('retrieveCredential', function() {
  it('should be a function', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if Fiware.retrieveCredential is not a function
    try {

      // Expect to be function. If not, throw error
      expect(typeof Fiware.retrieveCredential).to.be.equal('function')
    } catch(e) {

      // Catch thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

})

describe('allowedFields', function() {
  it('should be an array', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if Fiware.allowedFields is an array
    try {
      // Expect to be array. If not, throw error
      expect(Fiware.allowedFields).to.be.an('array')
    } catch(e) {
      // Catch thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

  it('should have correct allowed fields', function(done) {
    // Declare correct array of fields to return
    const correctArray = ['id', 'email', 'username']

    // Declare variable to determine if array is match or not
    let arraysMatch = true

    // Error variable
    let err = null

    // Try/Catch statement that throws error if arrays does not match
    try {
      // Return true if an element is not
      arraysMatch =
        !correctArray.some(field => Fiware.allowedFields.indexOf(field) == -1)

      // Check using the other array as validator, to make sure both are equal
      arraysMatch =
        !Fiware.allowedFields.some(field => correctArray.indexOf(field) == -1)

      // Expect arrays to match. If not, throw err
      expect(arraysMatch).to.be.ok
    } catch(e) {

      // Catch thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })
})
