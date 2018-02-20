const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initBlogs = [{
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const blogsInDb = async () => {
  return await Blog.find({})
}

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added, with defined lieks', async () => {
  const newBlog = {
    title: 'testiblogin titteli',
    author: 'autoori',
    url: 'www.hs.fi'
  }
  const allBlogs = await blogsInDb()

  await sendGoodBlog(newBlog)

  const response = await getAllBlogs()

  const titles = response.body.map(r => r.title)
  const likes = response.body.map(r => r.likes)
  const urls = response.body.map(r => r.url)

  lenghtPlusOne(response, allBlogs)
  expect(titles).toContain('testiblogin titteli')
  expect(likes).toBeDefined
  expect(titles).toBeDefined && expect(urls).toBeUndefined
})

test('a blog must have either title or url', async () => {
  const brokenBlog = {
    author: 'none autoori',
    likes: 100
  }
  const titleBlog = {
    title: 'foo',
    author: 'urliton autoori',
    likes: 100
  }
  const urlBlog = {
    author: 'tittelitön autoori',
    url: 'www.foo.fi',
    likes: 100
  }
  let allBlogs = await blogsInDb()

  await api.post('/api/blogs')
    .send(brokenBlog)
    .expect(400)

  let response = await getAllBlogs()
  expect(response.body.length).toBe(allBlogs.length)

  await sendGoodBlog(titleBlog)
  response = await getAllBlogs()
  lenghtPlusOne(response, allBlogs)

  allBlogs = await blogsInDb()

  await sendGoodBlog(urlBlog)
  response = await getAllBlogs()
  lenghtPlusOne(response, allBlogs)
})

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  server.close()
})

async function getAllBlogs() {
  return await api.get('/api/blogs')
}

function lenghtPlusOne(response, allBlogs) {
  expect(response.body.length).toBe(allBlogs.length + 1)
}

async function sendGoodBlog(titleBlog) {
  await api
    .post('/api/blogs/')
    .send(titleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
}