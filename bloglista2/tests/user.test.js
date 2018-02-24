const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({
      username: 'root',
      password: 'sekret',
      adult: true
    })
    await user.save()
  })
  afterAll(() => {
    server.close()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await listHelper.usersInDb()

    const newUser = {
      username: 'pauajuusar',
      name: 'Die Hackermann',
      adult: false,
      password: 'dadada'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await listHelper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Password check works', async () => {

    const usersBeforeOperation = await listHelper.usersInDb()
    const badAPwd = {
      username: 'bad boii',
      name: 'Aku',
      adult: false,
      password: 'da'
    }
    await api.post('/api/users')
      .send(badAPwd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await listHelper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
  test('post fails with non-unique username', async () => {
    const usersBeforeOperation = await listHelper.usersInDb()
    const notNewUser = {
      username: 'pauajuusar',
      name: 'Die Hackermannen',
      adult: true,
      password: 'trololol'
    }

    await api
      .post('/api/users')
      .send(notNewUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await listHelper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})