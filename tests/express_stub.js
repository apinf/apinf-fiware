const express = require('express')
const clientId = 'bd78834613d94aaf939646f9014a0894'
const state = 'eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJrOFJuQ0lGbzNreU9hc3RLek0xTDZuWDYwRWdQSXZoaDYtQV9wWkhDdzdDIiwiaXNDb3Jkb3ZhIjpmYWxzZX0='
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
    req.query.client_id == clientId &&
    req.query.state == state
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
