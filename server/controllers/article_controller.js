const User = require('../models/User')
const Article = require('../models/Article')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  getAll: (req, res) => {
    Article.find()
      .populate('author')
      .then(response => {
        res.status(200).send({
          message: 'Show all data',
          articles: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Show data failed',
          error: err.message
        })
      })
  },

  getById: (req, res) => {
    Article.findById({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Show article',
          article: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Show article failed',
          error: err.message
        })
      })
  },

  getByAuthor: (req, res) => {
    Article.find({
      author: req.params.query
    })
      .then(response => {
        res.status(200).send({
          message: 'Show article by author',
          article: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Error show article failed',
          error:err.message
        })
      })
  },

  getByCategory: (req, res) => {
    Article.find({
      category: req.params.query
    })
      .then(response => {
        res.status(200).send({
          message: 'Show article by category',
          article: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Error show article failed',
          error: err.message
        })
      })
  },

  create: (req, res) => {
    console.log('HERE', req.headers)
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let newArticle = new Article ({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: decoded.id
    })

    newArticle.save()
      .then(response => {
        res.status(201).send({
          message: 'Post article success',
          article: newArticle
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Post article failed',
          error: err.message
        })
      })
  },

  update: (req, res) => {
    Article.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    })
      .then(updated => {
        Article.findById({
          _id: req.params.id
        })
        .then(response => {
          res.status(201).send({
            message: 'Update article success',
            article: response
          })
        })
        .catch(err => {
          res.status(400).send({
            message: 'Error Article not found',
            error: err.message
          })
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Update article failed',
          error: err.message
        })
      })
  },

  remove: (req, res) => {
    Article.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Delete article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Delete article failed',
          error: err.message
        })
      })
  }
}