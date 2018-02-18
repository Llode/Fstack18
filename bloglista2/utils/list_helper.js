const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, nxt) => (sum + nxt.likes), 0)
  console.log('total likes ', likes)
  return likes
}

const favouriteBlog = (blogs) => {
  const max = blogs.reduce( (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  console.log('fave ', max)
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}