const multer = require('multer');
const fs = require('fs');
var path = require('path');

const storage = multer.diskStorage({
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },

  destination: function (req, file, cb) {
    const path = 'public/images';
    fs.mkdirSync(path, { recursive: true });

    cb(null, path)
  },
  filename: function (req, file, cb) {
    const uniqueTime = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${uniqueTime}-${file.originalname}`;

    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });


module.exports = upload;