var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'productUploads')
    },
    filename: (req, file, cb) => {

        console.log("file==>",file)

        cb(null, file.fieldname + '-' + Date.now())
    }
});


  
var upload = multer({ storage: storage });

module.exports=upload;