// Import all config objects
import * as config from '../config.js'

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
})
