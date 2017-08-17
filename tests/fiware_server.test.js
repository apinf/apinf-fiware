import { expect } from 'meteor/practicalmeteor:chai'

// Allow insert for config document
ServiceConfiguration.configurations.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return true;
  }
})

describe('retrieveCredential property', function() {
  it('should be a function', function(done) {
    let err = null
    try {
      expect(typeof Fiware.retrieveCredential).to.be.equal('function')
    } catch(e) {
      err = e
    }
    done(err)
  })

})
describe('whitelistedFields property', function() {
  it('should be an array', function(done) {
    let err = null
    try {
      expect(Fiware.whitelistedFields).to.be.an('array')
    } catch(e) {
      err = e
    }
    done(err)
  })
  it('should have correct white listed fields', function(done) {
    const correctArray = ['id', 'email', 'displayName']
    let arraysMatch = true
    let err = null
    try {
      // Return true if an element is not
      arraysMatch =
        !correctArray.some(field => Fiware.whitelistedFields.indexOf(field) == -1)

      // Check using the other array as validator, to make sure both are equal
      arraysMatch =
        !Fiware.whitelistedFields.some(field => correctArray.indexOf(field) == -1)

      expect(arraysMatch).to.be.ok
    } catch(e) {
      err = e
    }
    done(err)
  })

})
