const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/getcategories',authMiddleware,categoryController.getAllCategory)
router.post('/addcategories',authMiddleware,categoryController.setCategory)

module.exports = router