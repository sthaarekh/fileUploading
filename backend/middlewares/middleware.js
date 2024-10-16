const multer = require("multer");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory for storing files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + file.originalname); // Generate unique filenames
  }
});

// Configure multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
