const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'required']
  },
  content: {
    type: String,
    required: [true, 'required']
  },
  category: {
    type: String,
    default: null
  },
  author: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps: true
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article