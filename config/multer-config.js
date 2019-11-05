const multer = require('multer');
const datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage()
const dUri = new datauri();

const fileFilter = (req,file,cb)=>{
  if(file.mimetype=='image/jpeg' || file.mimetype == "image/png" || file.mimetype == "image/jpg")
     cb(null,true);
  else
    cb(null,false);
};

const upload = multer({
  storage : storage,
  limits:{
   fileSize : 1024*1024*5
  },
  fileFilter: fileFilter 
});

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(),req.file.buffer);
module.exports = {upload,dataUri};