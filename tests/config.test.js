import { expect } from 'meteor/practicalmeteor:chai'

// Import all config objects
import config from '../config.js'

// Basic request info that all mocks use
import {
  requestInfo,
  accessTokenMock,
  getAccountMock,
  configResponse
} from './mock.data.js'

describe('config file', function() {
  it('should be an object', function(done) {
    // Error variable
    let err = null

    // Try/Catch statement throws error if config is an array
    try {
      // Expects to be object. If not, throw error
      expect(config).to.be.an('object')
    } catch(e) {
      // Catchs thrown error and sets it to error variable
      err = e
    }

    // Test done
    done(err)
  })

  describe('toBase64 property', function() {
    it('should be a function', function(done) {
      // Error variable
      let err = null

      // Try/Catch statement throws error if toBase64 is not a function
      try {
        // Expects to be function. If not, throw error
        expect(typeof config.toBase64).to.be.equal('function')
      } catch(e) {
        // Catchs thrown error and sets it to error variable
        err = e
      }

      // Test done
      done(err)
    })

    it('should encode string to base 64', function(done) {
      // Error variable
      let err = null

      // String to be enconded on test
      const stringToTest = 'string'

      // Encoded string to be compared to function result
      const base64OfStringToTest = 'c3RyaW5n'

      // Try/Catch statement throws error if string don't match
      try {
        // Expects to be equal. If not, throw error
        expect(config.toBase64(stringToTest)).to.be.equal(base64OfStringToTest)
      } catch(e) {
        // Catchs thrown error and sets it to error variable
        err = e
      }

      // Test done
      done(err)
    })
  })

  describe('hashs property', function() {
    it('should be an object', function(done) {
      // Error variable
      let err = null

      // Try/Catch statement throws error if hashs is not a object
      try {
        // Expects to be object. If not, throw error
        expect(config.hashs).to.be.an('object')
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
          // Expects to be function. If not, throw error
          expect(typeof config.hashs.getAuthHeader).to.be.equal('function')
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
          // Expects to be object. If not, throw error
          expect(config.hashs.getAuthHeader(requestInfo))
            .to.be.equal(requestInfo.authHeader)
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
        // Expects to be object. If not, throw error
        expect(config.endpoints).to.be.an('object')
      } catch(e) {
        // Catchs thrown error and sets it to error variable
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
          // Expects to be function. If not, throw error
          expect(typeof config.endpoints.buildLoginUrl).to.be.equal('function')
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
          // Expects to be equal. If not, throw error
          expect(config.endpoints.buildLoginUrl(requestInfo, 'popup', configResponse.credentialToken))
            .to.be.equal(expectedUrl)
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
          // Expects to be function. If not, throw error
          expect(typeof config.endpoints.buildGetTokensUrl).to.be.equal('function')
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
          // Expects to be equal. If not, throw error
          expect(config.endpoints.buildGetTokensUrl(requestInfo))
            .to.be.equal(expectedUrl)
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
          // Expects to be function. If not, throw error
          expect(typeof config.endpoints.buildGetAccountsUrl).to.be.equal('function')
        } catch(e) {
          // Catchs thrown error and sets it to error variable
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
          // Expects to be equal. If not, throw error
          expect(config.endpoints.buildGetAccountsUrl(requestInfo, accessTokenMock.responseBody.access_token))
            .to.be.equal(expectedUrl)
        } catch(e) {
          // Catchs thrown error and sets it to error variable
          err = e
        }

        // Test done
        done(err)
      })
    })
  })

})
