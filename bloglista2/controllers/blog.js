const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog))
})


blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  console.log('blogi', blog)
  if (!blog.url && !blog.title) {

    response.status(400)
    return response.send()
  } else {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

module.exports = blogsRouter