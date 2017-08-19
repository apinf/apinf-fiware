// Buffer has to be defined in this version of Meteor
global.Buffer = global.Buffer || require("buffer").Buffer

// Dependencies imports
import nock from 'nock'
import { expect } from 'meteor/practicalmeteor:chai'

// Basic request info that all mocks use
const requestInfo = {
  redirectURI: 'http://localhost:3000/_oauth/fiware',
  rootUrl: 'https://account.lab.fiware.org',
  clientId: 'bd78834613d94aaf939646f9014a0894',
  secret: 'be2d674d4d0f4e97b10d3c63e78fd06a',
}

// Mock info for the Login Request. This requests the credentialToken
const loginMock = {
  path: '/oauth2/authorize',
  requestParams: {
    response_type: 'code',
    client_id: requestInfo.clientId,
    redirect_uri: requestInfo.redirectURI
  },
  requestHeaders: {},
  responseHeaders: {},
  responseBody: {
    state: 'eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJSOWpwQkJ4WmNoek9sTnp5RDI4dUxORXM4N2VYWXVNQUFlbFR0cklxeTdqIiwiaXNDb3Jkb3ZhIjpmYWxzZX0=',
    code: 'rZzOAjVFIDFHlyxVvmUWZl62hCcou7'
  }
}

// Denfines nock
const fiwareMock = nock(requestInfo.rootUrl)

// Defines mock for the Login URL
fiwareMock
  .get(
    loginMock.path,
    loginMock.requestParams
  )
  .reply(
    302,
    loginMock.responseBody
  )

describe('requestCredential function', function() {
  it('should be a function', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if Fiware.requestCredential is not a function
    try {

      // Expects to be function. If not, throws error
      expect(typeof Fiware.requestCredential).to.be.equal('function')
    } catch(e) {

      // Catchs thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })
  it('should return valid credentialToken', function(done) {
    // Timeout for the request
    this.timeout(50000)

    // Sets configuration o test DB
    ServiceConfiguration.configurations.insert({
      service: 'fiware',
      clientId: requestInfo.clientId,
      secret: requestInfo.secret,
      rootURL: requestInfo.rootUrl,
      redirectURI: 'http://localhost:3000/_oauth/fiware'
    })

    // Request credential
    Fiware.requestCredential(function(res) {
      // Error variable
      let err = null

      // Try/Catch statement throws error if Fiware.requestCredential Result
      // is not a valid credential
      try {

        // Throws error if the new credential is not valid
        expect(res.length).to.be.equal(Random.secret().length)
      } catch(e) {

        // Catchs thrown error and sets it to error variable
        err = e
      }

      // Test done
      done(err)
    })
  })
})
