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
  let key = (obj) => {
    return obj.author
  }
  let dict = {}

  blogs.forEach(element => {
    dict[key(element)] = 0
  });
  blogs.forEach(element => {
    dict[key(element)] += element.likes
  });
  console.log(dict)
  let author = ""
  let max = 0
  console.log(Object.keys(dict))

  for( var prop in dict) {
    if (dict[prop] > max) {
      max = dict[prop]
      author = prop
    }
  }

  return {
    author: author,
    likes: max
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