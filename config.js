/**
  * Converts a string to base64
  * @param   {String} string       String to be converted
  * @return  {String}              Converted string
 */
const toBase64 = (string) => new Buffer(string).toString('base64')

// Hardcoded hashes
const hashs = {
  getAuthHeadear: (config) => toBase64(`${config.clientId}:${config.secret}`)
}

// Hardcoded endpoints
const endpoints = {

  // Function that builds loginUrl dynamicaly with the config object
  buildLoginUrl: (config) => (
    config.rootURL + '/oauth2/authorize?response_type=code' +
    '&client_id=' + config.clientId +
    '&redirect_uri=' + config.redirectURI +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken)
  ),

  // Function that builds getTokens Url dynamicaly with the config object
  buildGetTokensUrl: (config) => config.rootURL + '/oauth2/token',

  // Function that builds getAccounts Url dynamicaly with the config object
  buildGetAccountsUrl: (config, accessToken) => (
    config.rootURL + "/user?access_token=" + accessToken
  )
}

const config = {
  toBase64,
  endpoints,
  hashs
}

// Exporting configs
export default config
