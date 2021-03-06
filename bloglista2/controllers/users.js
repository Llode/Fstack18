const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    if(!body.adult){
      body.adult = true
    }

    if(body.password.length < 3) {
      return res.status(400).json({
        error: 'The password must be longer than 3 chars'
      })
    }

    const existingUser = await User.find({
      username: body.username
    })

    if (existingUser.length > 0) {
      return res.status(400).json({
        error: 'username must be unique'
      })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    res.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    res.status(500).json({
      error: 'Wrong turn'
    })
  }
})

module.exports = usersRouter