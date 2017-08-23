const requestInfo = {
  redirectURI: 'http://localhost:3000/_oauth/fiware',
  rootUrl: 'https://localhost:3010',
  clientId: 'bd78834613d94aaf939646f9014a0894',
  secret: 'be2d674d4d0f4e97b10d3c63e78fd06a',
  authHeader: 'YmQ3ODgzNDYxM2Q5NGFhZjkzOTY0NmY5MDE0YTA4OTQ6YmUyZDY3NGQ0ZDBmNGU5N2IxMGQzYzYzZTc4ZmQwNmE=='
}

// Mock info for the Login Request. This requests the credentialToken
const loginMock = {
  path: '/oauth2/authorize',
  requestParams: {
    response_type: 'code',
    client_id: requestInfo.clientId,
    redirect_uri: requestInfo.redirectURI
  },
  requestHeaders: {},
  responseHeaders: {},
  responseBody: {
    state: 'eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJSOWpwQkJ4WmNoek9sTnp5RDI4dUxORXM4N2VYWXVNQUFlbFR0cklxeTdqIiwiaXNDb3Jkb3ZhIjpmYWxzZX0=',
    code: 'rZzOAjVFIDFHlyxVvmUWZl62hCcou7'
  }
}

// Mock info for the Access token request
const accessTokenMock = {
  path: '/oauth2/token',
  requestParams: {
    code: 'e1ZuldvzJi7IKgNo17DdDoyqr0LN2S',
    redirect_uri: requestInfo.redirectURI,
    grant_type: 'authorization_code'
  },
  requestHeaders: {
    Authorization: `Basic ${requestInfo.authHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    Host: "account.lab.fiware.org",
    "Content-length": 126
  },
  responseHeaders: {},
  responseBody: {
    access_token: 'b2f1CJY819xKaa8Y0LFygkH1e9HRuI',
    refresh_token: 'qExtjn5h26NsGy5LEvJ3FdNcoIQ3Jz',
    expires_in: 3600,
    token_type: 'Bearer'
  }
}

module.exports = {
  requestInfo,
  loginMock,
  accessTokenMock,
}
