import express from "express";

import { saveImgPost, saveImgAuthor } from "../readUndWriteFiles/index.js";
import multer from "multer";

const filesRouter = express();

filesRouter.post("/", multer().single("profilePic"), async (req, res, next) => {
  try {
    await saveImgPost(req.file.originalname, req.file.buffer);
    console.log(req.file);
    res.send("Uploaded");
  } catch (error) {
    next(error);
  }
});

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
