require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT || 3003
let mongoUrl = 'mongodb://blogiuser:blogg@ds141068.mlab.com:41068/blogilista'

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = 'mongodb://blogiuser:blogg@ds141068.mlab.com:41068/blogilista'
}

module.exports = {
  mongoUrl,
  port
}