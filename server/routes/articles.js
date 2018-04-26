const router = require('express').Router()
const article = require('../controllers/article_controller')

router.get('/:id', article.getById)
      .get('/author/:query', article.getByAuthor)
      .get('/category/:query', article.getByCategory)
      .post('/create', article.create)
      .put('/update/:id', article.update)
      .delete('/delete/:id', article.remove)

module.exports = router