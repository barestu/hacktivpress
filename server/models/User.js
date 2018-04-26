const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

let userSchema = new Schema ({
  username: {
    type: String,
    required: [true, 'required']
  },
  password: {
    type: String,
    required: [true, 'required']
  }
},{
  timestamps: true
})

userSchema.pre('save', function (next) {
  let saltRounds = 10
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(this.password, salt)

  this.password = hash

  next()
})

let User = mongoose.model('User', userSchema)

module.exports = User
