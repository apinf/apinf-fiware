import { expect } from 'meteor/practicalmeteor:chai'

// Import all config objects
import config from '../config.js'

// Basic request info that all mocks use
import { requestInfo, accessTokenMock, getAccountMock } from './mock.data.js'

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

})
