const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, nxt) => (sum + nxt.likes), 0)
  console.log('total likes ', likes)
  return likes
}

const favouriteBlog = (blogs) => {
  const indexarr = blogs.map((x) => (x.likes))
  console.log('iarr ',indexarr)
  const index = Math.max(indexarr)
  console.log('index ',index)
  console.log('blogi ', blogs[index])
  return blogs[index]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}