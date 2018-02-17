import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogilista')
const Blog = require('./models/note')


mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
app.use(express.static('build'))
app.use('/blogs', blogRouter)
app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
