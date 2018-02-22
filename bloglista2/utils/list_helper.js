const User = require('../models/user')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, nxt) => (sum + nxt.likes), 0)
  console.log('total likes ', likes)
  return likes
}

const favouriteBlog = (blogs) => {
  const max = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  console.log('fave ', max)
  return max
}

const mostBlogs = (blogs) => {
  const names = blogs.map(i => i.author)
  const name = names.sort((a, b) => {
    blogs.filter(v => v.author === a.author).length -
      blogs.filter(v => v.author === b.author).length
  }).pop()
  let amount = 1

  names.forEach(elem => {
    if (elem === name) {
      amount++
    }
  })
  return {
    author: name,
    blogs: amount
  }
}
//TEE
const mostLikes = (blogs) => {

  return {
    author: undefined,
    likes: undefined
  }
}
const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}