const requestInfo = {
  redirectURI: 'http://localhost:3000/_oauth/fiware',
  rootURL: 'http://localhost:3010',
  clientId: 'bd78834613d94aaf939646f9014a0894',
  secret: 'be2d674d4d0f4e97b10d3c63e78fd06a',
  authHeader: 'YmQ3ODgzNDYxM2Q5NGFhZjkzOTY0NmY5MDE0YTA4OTQ6YmUyZDY3NGQ0ZDBmNGU5N2IxMGQzYzYzZTc4ZmQwNmE=',
  state: 'eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJYR2U3SmhEYjBQOEVNdHMwNHpLaklTYVFfX3NMVW5uYTdQWE9mSTVnR3o4IiwiaXNDb3Jkb3ZhIjpmYWxzZX0='
}

const configResponse = {
  "setCredentialToken": true,
  "credentialToken": "XGe7JhDb0P8EMts04zKjISaQ__sLUnna7PXOfI5gGz8",
  "credentialSecret": "yBgBEHSxKQ6Jicc3LKhF8VsH6PkFneG3A2V_RtFBrXV",
  "storagePrefix": "Meteor.oauth.credentialSecret-",
  "isCordova": false
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
    state: requestInfo.state,
    code: 'rZzOAjVFIDFHlyxVvmUWZl62hCcou7'
  }
}

// Mock info for the Access token request
const accessTokenMock = {
  path: loginMock.path,
  requestParams: {
    code: 'e1ZuldvzJi7IKgNo17DdDoyqr0LN2S',
    redirect_uri: requestInfo.redirectURI,
    grant_type: 'authorization_code'
  },
  requestHeaders: {
    Authorization: `Basic ${requestInfo.authHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    Host: 'account.lab.fiware.org',
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

// Mock info for the account information request
const getAccountMock = {
  path: '/user',
  requestParams: {
    access_token: accessTokenMock.responseBody.access_token
  },
  requestHeaders: {
    authorization: `Basic ${requestInfo.authHeader}`,
    host: 'account.lab.fiware.org'
  },
  responseHeaders: {},
  responseBody: {
    organizations: [],
    displayName: 'vellames',
    roles: [
      { name: 'provider', id: '106' }
    ],
    app_id: requestInfo.clientId,
    isGravatarEnabled: false,
      email: 'c.vellames@outlook.com',
    id: 'vellames'
  }
}

module.exports = {
  requestInfo,
  loginMock,
  accessTokenMock,
  configResponse,
  getAccountMock
}
