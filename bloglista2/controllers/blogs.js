const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


//kaikkien gettaus
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(Blog))
})

//postaus
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {

    if (!body.title && !body.url) {
      return response.status(400).json({
        error: 'url or title missing'
      })
    }
    
    console.log('REVKSETI', request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    // const token = getTokenFrom(request)
    // const decodedToken = jwt.verify(token, process.env.SECRET)

    // if (!token || !decodedToken.id) {
    //   return response.status(401).json({
    //     error: 'token missing or invalid'
    //   })
    // }
    console.log('SUORITUS JATKUU PRKL')



    let blog = new Blog(body)
    if (!blog.likes) {
      blog.likes = 0
    }
    console.log('decodee ', decodedToken)
    console.log('body ', body)

    let user = await User.findById(decodedToken.id)
    //let user = await User.find({ 'username': 'root' })
    console.log('user ', user)
    blog.user = user._id

    console.log('blogi', blog)

    const savedBlog = await blog.save()
    console.log('savedblog', savedBlog);
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201)
    return response.json(blog)

  } catch (exception) {
    if (exception === 'JsonWebtokenError') {
      response.status(401).json({
        error: exception.message
      })
    } else {
      console.log(exception)
      response.status(500).json({
        error: 'paskaa blogipostausmakkarassa'
      })
    }
  }
})

//dellaus
blogsRouter.delete('/:id', async (request, response) => {
  const delid = request.params.id
  try {
    console.log('DELLAUSREVKSETI', request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('DECOOKAUS', decodedToken);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const blog = await Blog.findById(delid)
    if(!blog){
      return response.status(400).send( {
        error: 'no blog'
      })
    }
    console.log('blogUUSER', blog.user)
    if ( blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(delid)
      console.log('poistid', delid)
      response.status(204).end()
    }
    else {
      return response.status(400).send({
        error: 'wrong user'
      })
    }

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
      error: 'paskaa blogiputtauksessa'
    })
  }
})


module.exports = blogsRouter


const isPopulated = (blog) => {
  return blog.title || blog.author || blog.likes || blog.url
}