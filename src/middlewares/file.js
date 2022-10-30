const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary"); //!duda destructuring

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { 
    folder: 'kingdomHearts', 
    allowenFormats: ["jpg", "png", "jpeg", "gif"]
  }
});


const upload = multer({ storage });

module.exports = upload;

