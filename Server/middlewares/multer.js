const multer = require('multer');

module.exports = multer({ 
    storage: multer.diskStorage({}),

    fileFilter: (req, file, cb) => {
      if(!file.mimetype.match(/png || jpeg || jpg || gif$i/)){
        cb(new Error("File does not support"), false)
        return;
      } 
  
      cb(null, true)
    }
  }).single('avater');
// var filestorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,'./uploads')
//     },
//     filename:(req,file, cb) => {
//         cb(null,Date.now() + '-' + file.originalname)
//     }
//   })
  
//   module.exports = multer({
//     storage:filestorageEngine
//   }).single('avater');