const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.SECRET

module.exports = {
  register: (req, res) => {
    let newUser = new User ({
      username: req.body.username,
      password: req.body.password
    })

    newUser.save()
      .then(response => {
        res.status(201).send({
          message: 'Register success',
          user: newUser
        })
      })
      .catch(err => {
        res.status(200).send({
          message: 'Register failed',
          error: err.message
        })
      })
  },

  login: (req, res) => {
    let plainPass = req.body.password

    User.findOne({
      username: req.body.username
    })
      .then(user => {
        bcrypt.compare(plainPass, user.password, function (err, found) {
          if (found) {
            let token = jwt.sign({
              id: user._id,
              username: user.username
            })

            res.status(200).send({
              message: 'Login success',
              token: token
            })
          } else {
            res.status(400).send({
              message: 'Invalid password',
              error: err.message
            })
          }
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Invalid email',
          error: err.message
        })
      })
  }
}