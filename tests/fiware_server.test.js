// Dependencies imports
import nock from 'nock'
import { expect } from 'meteor/practicalmeteor:chai'

// Defines root URL
const rootUrl = `https://account.lab.fiware.org`

// Defines redirectURI
const redirectURI = 'http://localhost:3000/_oauth/fiware'

// Denfines nock
const fiwareMock = nock(rootUrl)

// Defining clientID for testing
const clientId = 'bd78834613d94aaf939646f9014a0894'

// Defining secret for testing
const secret = 'be2d674d4d0f4e97b10d3c63e78fd06a'

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

    // Try/Catch state throws error if Fiware.retrieveCredential is a function
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

    // Try/Catch state throws error if Fiware.whitelistedFields is an array
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

    // Try/Catch state that throws error if arrays does not match
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
