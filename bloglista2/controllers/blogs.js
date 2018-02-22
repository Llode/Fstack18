const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//kaikkien gettaus
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog))
})

//postaus
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.title && !body.url) {
      return response.status(400).json({
        error: 'url or title missing'
      })
    }
    const blog = new Blog(body)
    if (!blog.likes) {
      blog.likes = 0
    }

    console.log('blogi', blog)

    await blog.save()
    response.status(201)
    return response.json(blog)

  } catch (exception) {
    console.log(exception)
    response.status(500).json({
      error: 'something went wong'
    })
  }
})
//dellaus
blogsRouter.delete('/:id', async (request, response) => {
  const delid = request.params.id
  try {
    await Blog.findByIdAndRemove(delid)
    console.log('poistid', delid)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({
      error: 'malformatted idf'
    })
  }


})
//puttaus
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  console.log('body ', body)
  const blog = {
    likes: body.likes
  }

  console.log('blog', blog)
  if (!isPopulated(blog)) {
    return res.status(400).json({
      error: 'cant update with empty blog'
    })
  }
  try {
    await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    })
    console.log('updateID ', req.params.id)
    return res.status(200).json(blog)
  } catch (exception) {
    console.log(exception)
    res.status(400).json({
      error: 'something gone wrong'
    })
  }
})


module.exports = blogsRouter


const isPopulated = (blog) => {
  return blog.title || blog.author || blog.likes || blog.url
}