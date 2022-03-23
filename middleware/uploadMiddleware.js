var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'usersUploads')
    },
    filename: (req, file, cb) => {

        console.log("file==>",file)

        cb(null, file.originalname + '-' + Date.now())
    }
});


  
var upload = multer({ storage: storage });

module.exports=upload;