const router = require('express').Router();

const cateController = require('../controller/cateController');
router.post('/add-cate', cateController.addCate);
router.get('/get-categories', cateController.getCates);
router.get('/:name', cateController.getCateByName);
router.get('/', cateController.getAllPosts);

module.exports = router;
