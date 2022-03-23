const express=require('express');

const router=express.Router();
const upload = require('../middleware/uploadMiddleware')

const {create,findAll}=require('../controllers/users.controllers')

console.log(upload.single('profilePic'),"PPPPP")

router.post('/',upload.single('profilePic'),create);

router.get('/',findAll);



module.exports = router;