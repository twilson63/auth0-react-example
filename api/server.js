const express = require('express')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')

const app = express()

var port = process.env.PORT || 5000

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://twilson63.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://test-api.com',
  issuer: 'https://twilson63.auth0.com/',
  algorithms: ['RS256']
})

app.use(cors({ credentials: true }))

app.use(jwtCheck)

app.get('/authorized', function(req, res) {
  res.send([{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }])
})

app.listen(port)
