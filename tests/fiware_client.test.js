// Buffer has to be defined in this version of Meteor
global.Buffer = global.Buffer || require("buffer").Buffer

// Meteor contributed packages imports
import { expect } from 'meteor/practicalmeteor:chai'

// NPM imports
import nock from 'nock'

// Import basic request info that all mocks use
import { requestInfo, loginMock } from './mock.data.js'

// Use nock to mock rootURL
const fiwareMock = nock(requestInfo.rootURL)

// Define mock for the Login URL
fiwareMock
  .get(
    loginMock.path,
    loginMock.requestParams
  )
  .reply(
    302,
    loginMock.responseBody
  )

describe('requestCredential', function() {
  it('should be a function', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if Fiware.requestCredential is not a function
    try {

      // Expect to be function. If not, throws error
      expect(typeof Fiware.requestCredential).to.be.equal('function')
    } catch(e) {

      // Catch thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

  it('should return valid credentialToken', function(done) {
    // Set timeout for the request
    this.timeout(5000)

    // Set configuration o test DB
    ServiceConfiguration.configurations.insert({
      service: 'fiware',
      clientId: requestInfo.clientId,
      secret: requestInfo.secret,
      rootURL: requestInfo.rootURL,
      redirectURI: 'http://localhost:3000/_oauth/fiware'
    })

    // Request credential
    Fiware.requestCredential(function(res) {
      // Error variable
      let err = null

      // Try/Catch statement throws error if Fiware.requestCredential Result
      // is not a valid credential
      try {

        // Throw error if the new credential is not valid
        expect(res.length).to.be.equal(Random.secret().length)
      } catch(e) {

        // Catch thrown error and sets it to error variable
        err = e
      }

      // Test done
      done(err)
    })
  })
})
