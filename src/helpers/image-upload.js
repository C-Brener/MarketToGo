import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("products")) {
      folder = "products";
    }

    cb(null, `public/image/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please, sent only jpg or png"));
    }
    cb(undefined, true);
  },
});


export default imageUpload