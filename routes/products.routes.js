const express=require('express');

const router=express.Router();

const {create,findAll,updateById,deleteById}=require('../controllers/products.controllers')
const upload = require('../middleware/productUploadMiddleWare')

router.post('/',upload.array('img',2),create);

router.get('/',findAll);

router.put('/:id',updateById)

router.delete('/:id',deleteById)


module.exports = router;