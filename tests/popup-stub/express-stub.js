const express = require('express')
const path = require('path')
const data = require('../mock.data.js')
const address = 'localhost'
const port = '3010'
const cors = require('cors')

let app = express()

app.use(express.static(path.resolve(__dirname) + '/public'))
app.use(cors())

app.get('/oauth2/authorize', (req, res) => {
  if (
    req.query.response_type == 'code' &&
    req.query.client_id == data.requestInfo.clientId &&
    req.query.state.state == data.requestInfo.state.state
  ) {
    res.sendfile('tests/popup-stub/public/end-of-popup.html')
  }
})

let listener = app.listen(port, address, () => {
  console.log('API running on: ' + address+':'+port)
})
