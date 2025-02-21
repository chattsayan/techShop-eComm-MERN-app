import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, "uploads/");
  },
  filename(req, file, callBack) {
    callBack(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, callBack) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return callBack(null, true);
  } else {
    callBack(new Error("Images only!"));
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, callBack) => checkFileType(file, callBack),
});

router.post("/", upload.single("image"), (req, res) => {
  // console.log("File received:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "File upload failed" });
  }

  res.status(200).send({
    message: "Image uploaded successfully!",
    image: `/${req.file.path.replace(/\\/g, "/")}`,
  });
});

export default router;
