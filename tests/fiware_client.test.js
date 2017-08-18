import nock from 'nock'
import { expect } from 'meteor/practicalmeteor:chai'

// Result for mock expect
const mockResult = {
  token: {
    accessToken: 'b2f1CJY819xKaa8Y0LFygkH1e9HRuI',
    refreshToken: 'qExtjn5h26NsGy5LEvJ3FdNcoIQ3Jz',
    expiresIn: 3600,
    tokenType: 'Bearer'
  },
  login: {
    state: 'eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJSOWpwQkJ4WmNoek9sTnp5RDI4dUxORXM4N2VYWXVNQUFlbFR0cklxeTdqIiwiaXNDb3Jkb3ZhIjpmYWxzZX0=',
    code: 'rZzOAjVFIDFHlyxVvmUWZl62hCcou7'
  }
}

const requestInfo = {
  rootUrl: `https://account.lab.fiware.org`,
  clientId: 'bd78834613d94aaf939646f9014a0894',
  secret: 'be2d674d4d0f4e97b10d3c63e78fd06a',
  getLoginUrl: '/oauth2/authorize?' +
               'response_type=code&' +
               'client_id=bd78834613d94aaf939646f9014a0894&' +
               'redirect_uri=http://localhost:3000/_oauth/fiware&' +
               'state=xxx'
}

// Denfines nock
const rootUrlMock = nock(requestInfo.rootUrl)

 // Mock for Access Token Request
const mockPostForAccesToken = {
  // Params for POST request
  params: {
    code: 'e1ZuldvzJi7IKgNo17DdDoyqr0LN2S',
    redirect_uri: 'http://localhost:3000/_oauth/fiware',
    grant_type: 'authorization_code'
  },
  // Headers for the POST request
  headers: {
    Authorization: 'Basic YmQ3ODgzNDYxM2Q5NGFhZjkzOTY0NmY5MDE0YTA4OTQ6YmUyZDY3NGQ0ZDBmNGU5N2IxMGQzYzYzZTc4ZmQwNmE==',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const responseHeaders = {
  "Content-Type": 'application/json;charset=UTF-8',
  "Cache-Control": 'no-store',
  "Pragma": 'no-cache'
}

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

    // Sets configuration o test DB
    ServiceConfiguration.configurations.insert({
      service: 'fiware',
      clientId: requestInfo.clientId,
      secret: requestInfo.secret,
      rootURL: requestInfo.rootUrl,
      redirectURI: 'http://localhost:3000/_oauth/fiware'
    })

    // Nock for Login Url
    rootUrlMock
      .filteringPath(/state=[^&]*/g, 'state=XXX')
      .get(requestInfo.getLoginUrl)
      .reply(302, mockResult.login)

    // Mock for Request Token
    rootUrlMock
      .post(
        '/oauth2/token',
        mockPostForAccesToken.params,
        mockPostForAccesToken.headers
      )
      .reply(200,
        mockResult.token,
        responseHeaders
      );

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
