const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

const userRoutes = require('./routes/users')
const articleRoutes = require('./routes/articles')

mongoose.connect(`mongodb://localhost/hacktivpress`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to database...')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api/user', userRoutes)
app.use('/api/article', articleRoutes)

app.listen(port, function() {
  console.log('Listening on port', port)
})