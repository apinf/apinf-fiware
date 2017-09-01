// Meteor contributed packages imports
import { expect } from 'meteor/practicalmeteor:chai'

// Import fiware outh configuration
import fiwareOauthConfig from '../fiware_oauth_config.js'

// Import basic request info that all mocks use
import {
  requestInfo,
  accessTokenMock,
  getAccountMock,
  configResponse
} from './mock.data.js'

describe('fiware oauth config file', function() {
  it('should be an object', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if config is an array
    try {
      // Expect to be object. If not, throw error
      expect(fiwareOauthConfig).to.be.an('object')
    } catch(e) {
      // Catch thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

  describe('hashs property', function() {
    it('should be an object', function(done) {
      // Error variable
      let err = null

      // Try/Catch statement throws error if hashs is not a object
      try {
        // Expect to be object. If not, throw error
        expect(fiwareOauthConfig.hashs).to.be.an('object')
      } catch(e) {
        // Catchs thrown error and sets it to error variable
        err = e
      }

      // Test done
      done(err)
    })

    describe('getAuthHeader property', function() {
      it('should be a function', function(done) {
        // Error variable
        let err = null

        // Try/Catch statement throws error if getAuthHeader is not a function
        try {
          // Expect to be function. If not, throw error
          expect(typeof fiwareOauthConfig.hashs.getAuthHeader).to.be.equal('function')
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })

      it('should generate the authentication header from the clientId and secret', function(done) {
        // Error variable
        let err = null

        // Try/Catch statement throws error if getAuthHeader result does not match the expected
        try {
          // Expect to be object. If not, throw error
          expect(fiwareOauthConfig.hashs.getAuthHeader(requestInfo))
            .to.be.equal(requestInfo.authHeader)
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })
    })
  })

  describe('endpoints property', function() {
    it('should be an object', function(done) {
      // Error variable
      let err = null

      // Try/Catch statement throws error if endpoints is not a object
      try {
        // Expect to be object. If not, throw error
        expect(fiwareOauthConfig.endpoints).to.be.an('object')
      } catch(e) {
        // Catch thrown error and sets it to error variable
        err = e
      }

      // Test done
      done(err)
    })

    describe('buildLoginUrl property', function() {
      it('should be a function', function(done) {
        // Error variable
        let err = null

        // Try/Catch statement throws error if buildLoginUrl is not a function
        try {
          // Expect to be function. If not, throw error
          expect(typeof fiwareOauthConfig.endpoints.buildLoginUrl).to.be.equal('function')
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })

      it('should generate loginUrl for the OAuth authentication flow', function(done) {
        // Error variable
        let err = null

        // Correct URl to be compared to the function's result
        const expectedUrl = requestInfo.rootURL +
                            '/oauth2/authorize?response_type=code' +
                            '&client_id=' + requestInfo.clientId +
                            '&redirect_uri=' + requestInfo.redirectURI +
                            '&state=' + requestInfo.state

        // Try/Catch statement throws error if buildLoginUrl result does not match the expected
        try {
          // Expect to be equal. If not, throw error
          expect(fiwareOauthConfig.endpoints.buildLoginUrl(requestInfo, 'popup', configResponse.credentialToken))
            .to.be.equal(expectedUrl)
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })
    })

    describe('buildGetTokensUrl property', function() {
      it('should be a function', function(done) {
        // Error variable
        let err = null

        // Try/Catch statement throws error if buildGetTokensUrl is not a function
        try {
          // Expect to be function. If not, throw error
          expect(typeof fiwareOauthConfig.endpoints.buildGetTokensUrl).to.be.equal('function')
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })

      it('should generate getToken URL for the OAuth authentication flow', function(done) {
        // Error variable
        let err = null

        // Correct URl to be compared to the function's result
        const expectedUrl = requestInfo.rootURL + '/oauth2/token'

        // Try/Catch statement throws error if buildGetTokensUrl result does not match the expected
        try {
          // Expect to be equal. If not, throw error
          expect(fiwareOauthConfig.endpoints.buildGetTokensUrl(requestInfo))
            .to.be.equal(expectedUrl)
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })
    })

    describe('buildGetAccountsUrl property', function() {
      it('should be a function', function(done) {
        // Error variable
        let err = null

        // Try/Catch statement throws error if buildGetAccountsUrl is not a function
        try {
          // Expect to be function. If not, throw error
          expect(typeof fiwareOauthConfig.endpoints.buildGetAccountsUrl).to.be.equal('function')
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })

      it('should generate getAccounts URL for the OAuth authentication flow', function(done) {
        // Error variable
        let err = null

        // Correct URl to be compared to the function's result
        const expectedUrl = requestInfo.rootURL + "/user?access_token=" + accessTokenMock.responseBody.access_token

        // Try/Catch statement throws error if buildGetAccountsUrl result does not match the expected
        try {
          // Expect to be equal. If not, throw error
          expect(fiwareOauthConfig.endpoints.buildGetAccountsUrl(requestInfo, accessTokenMock.responseBody.access_token))
            .to.be.equal(expectedUrl)
        } catch(e) {
          // Catch thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })
    })
  })
})
