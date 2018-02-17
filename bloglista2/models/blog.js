const mongoose = require('mongoose')

const mongoUrl = 'mongodb://blogiuser:blogg@ds141068.mlab.com:41068/blogilista'
mongoose.connect(mongoUrl)

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog