const router = require('express').Router()
const article = require('../controllers/article_controller')
const { loginAuth } = require('../middleware/auth')
const { multer, sendUploadToGCS } = require('../middleware/upload')

router.get('/', article.getAll)
      .get('/:id', article.getById)
      .get('/author/:query', article.getByAuthor)
      .get('/category/:query', article.getByCategory)
      .post('/create', loginAuth, article.create)
      .post('/upload-image', loginAuth, multer.single('img_file'), sendUploadToGCS, article.uploadImage)
      .put('/update/:id', loginAuth, article.update)
      .delete('/delete/:id', loginAuth, article.remove)

module.exports = router