const util = require("util");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
  
    var dir = `${__dirname}/../upload/${req.query.id}`;
   
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, path.join(dir));
  },
  filename: (req, file, callback) => {
    const match = ["application/pdf","application/msword"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept pdf`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-dameer-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("monfichier");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;