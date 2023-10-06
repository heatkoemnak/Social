const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    storage: multer.diskStorage({}),
    fileFilter: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      console.log(ext);
      if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        return cb(new Error('Only images are allowed'));
      }
      cb(null, true);
    },
  }),
});
