import nock from 'nock'
import { chai } from 'meteor/practicalmeteor:chai'
import fiwareClient from '../fiware_client.js'

// Defines root URL
const rootUrl = `https://account.lab.fiware.org`

// Denfines nock
const loginUrlMock = nock(rootUrl)

// Defining clientID for testing
const clientId = 'bd78834613d94aaf939646f9014a0894'

// Defining secret for testing
const secret = 'be2d674d4d0f4e97b10d3c63e78fd06a'

describe('should pass', function() {
  it('should pass', function(done) {
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

    // Get Url for mocking results
    const getUrl = '/oauth2/authorize?' +
                   'response_type=code&' +
                   'client_id=bd78834613d94aaf939646f9014a0894&' +
                   'redirect_uri=http://localhost:3000&' +
                   'state=xxx'

    const mockResultsForLoginRequest = {

    }

    // Mocks URL Result
    // loginUrlMock
    //   .filteringPath(/state=[^&]*/g, 'state=XXX')
    //   .get(getUrl)
    //   .reply(200, 'user');

    Fiware.requestCredential(function(res) {
      console.log('RESULT')
      console.log(res)
      done()
    })
  })
})
