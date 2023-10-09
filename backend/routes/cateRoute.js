const router = require('express').Router();

const cateController = require('../controller/cateController');
router.post('/add-cate', cateController.addCate);
router.get('/get-categories', cateController.getCates);
router.get('/:name', cateController.getCateByName);
router.delete('/delete/:id', cateController.deleteCate);

module.exports = router;
