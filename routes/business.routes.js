const express=require('express');

const router=express.Router();

const {create,findAll}=require('../controllers/business.controllers')

router.post('/',create);

router.get('/',findAll);



module.exports = router;