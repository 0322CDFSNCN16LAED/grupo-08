const multer = require("multer");
/*para guardar los archivos y el nombre que quiero que se guarde */

module.exports = async (req, res, next) => {
  const multerDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images/products"));
    },
    filename: function (req, file, cb) {
      const imageName = Date.now() + path.extname(file.originalname);
      cb(null, imageName);
    },
  });

  const uploadFile = multer({ storage: multerDiskStorage });
};
