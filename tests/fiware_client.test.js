import nock from 'nock'
import { chai } from 'meteor/practicalmeteor:chai'
import fiwareClient from '../fiware_client.js'


// Defining clientID for testing
const clientId = 'bd78834613d94aaf939646f9014a0894'

// Defining secret for testing
const secret = 'be2d674d4d0f4e97b10d3c63e78fd06a'

describe('should pass', function() {
  it('should pass', function(done) {
    // Defining mock url for login
    const loginUrlMock = nock(`https://account.lab.fiware.org`)

    console.log(fiwareClient)
    ServiceConfiguration.configurations.insert({
      service: 'fiware',
      clientId: clientId,
      secret: secret,
      rootURL: loginUrlMock,
      redirectURI: 'http://localhost:3000'
    })

    Fiware.requestCredential({}, function(res) {
      console.log(res)
      done()
    })
  })
})
