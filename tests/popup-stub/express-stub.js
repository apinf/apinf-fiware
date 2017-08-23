const express = require('express')
const data = require('../mock.data.js')
const address = 'localhost'
const port = '3010'

let app = express()

app.get('/oauth2/authorize', (req, res) => {
  console.log(req.query)
  console.log(req.query.response_type == 'code')
  console.log(req.query.client_id == clientId)
  console.log(req.query.state == state)
  if (
    req.query.response_type == 'code' &&
    req.query.client_id == data.requestInfo.clientId &&
    req.query.state == data.requestInfo.state
  ) {
    res.json({
      state: state,
      code: 'rZzOAjVFIDFHlyxVvmUWZl62hCcou7'
    })
  }
})

let listener = app.listen(port, address, () => {
  console.log('API running on: ' + address+':'+port)
})
