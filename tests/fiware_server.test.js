
ServiceConfiguration.configurations.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return true;
  }
})

describe('should pass', function() {
  it('should pass', function(done) {
    console.log(Fiware)
    done()
  })
})
