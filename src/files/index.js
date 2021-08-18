import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import multer from "multer";

const filesRouter = express();

const saveImg = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "imgs-blog-post",
  },
});

filesRouter.post(
  "/",
  multer({ storage: saveImg }).single("profilePic"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      res.send("Uploaded");
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.post("/:pic", multer().single("pic"), async (req, res, next) => {
  try {
    console.log(req.file);
    await saveImgAuthor(req.file.originalname, req.file.buffer);
    res.send("Uploaded");
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
