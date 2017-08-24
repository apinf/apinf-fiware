const express = require('express')
const data = require('../mock.data.js')
const address = 'localhost'
const port = '3010'

let app = express()

app.get('/oauth2/authorize', (req, res) => {

  if (
    req.query.response_type == 'code' &&
    req.query.client_id == data.requestInfo.clientId &&
    req.query.state.state == data.requestInfo.state.state
  ) {
    res.json(data.loginMock.responseBody)
  }
})

let listener = app.listen(port, address, () => {
  console.log('API running on: ' + address+':'+port)
})
