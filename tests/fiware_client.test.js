import nock from 'nock'
import { expect } from 'meteor/practicalmeteor:chai'

// Defines root URL
const rootUrl = `https://account.lab.fiware.org`

// Denfines nock
const loginUrlMock = nock(rootUrl)

// Defining clientID for testing
const clientId = 'bd78834613d94aaf939646f9014a0894'

// Defining secret for testing
const secret = 'be2d674d4d0f4e97b10d3c63e78fd06a'


// Get Url for mocking results
const getUrl = '/oauth2/authorize?' +
               'response_type=code&' +
               'client_id=bd78834613d94aaf939646f9014a0894&' +
               'redirect_uri=http://localhost:3000&' +
               'state=xxx'

const mockResultsForLoginRequest = '-Ve4fzRMP8KhMvz4EoSUiNvNrZnG_oGxITcscV1XYTj'

describe('requestCredential function', function() {
  it('should be a function', function(done) {
    var err = null
    try {
      expect(typeof Fiware.requestCredential).to.be.equal('function')
    } catch(e) {
      err = e
    }
    done(err)
  })
  it('should return valid credentialToken', function(done) {
    this.timeout(50000)
    // Defining mock url for login

    // Sets configuration o test DB
    ServiceConfiguration.configurations.insert({
      service: 'fiware',
      clientId: clientId,
      secret: secret,
      rootURL: rootUrl,
      redirectURI: 'http://localhost:3000'
    })

    Fiware.requestCredential(function(res) {
      var err = null
      try {
        expect(res.length).to.be.equal(Random.secret().length)
      } catch(e) {
        err = e
      }
      done(err)
    })
  })
})
