import express from "express";
import uniqid from "uniqid";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import { getAuthors, writeAuthors } from "../readUndWriteFiles/index.js";

const authorRouter = express();

authorRouter.get("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();

    res.send(authors);
  } catch (error) {
    next(error);
  }
});

authorRouter.get("/:idAuthor", async (req, res, next) => {
  try {
    const authors = await getAuthors();

    const findAuthor = authors.find(
      (author) => author.id === req.params.idAuthor
    );

    res.send(findAuthor);
  } catch (error) {
    next(error);
  }
});

authorRouter.post("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();

    // console.log(authors);
    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };

    authors.push(newAuthor);

    // console.log(authors);
    await writeAuthors(authors);

    res.status(201).send({ id: newAuthor.id });
  } catch (error) {
    next(error);
  }
});
authorRouter.delete("/:idAuthor", async (req, res, next) => {
  try {
    const authors = await getAuthors();

    const upgradeAuthor = authors.filter(
      (author) => author.id !== req.params.idAuthor
    );

    await writeAuthors(upgradeAuthor);

    res.send(`Delated author with the id: ${req.params.idAuthor}`);
  } catch (error) {
    next(error);
  }
});

authorRouter.put("/:idAuthor", async (req, res, next) => {
  try {
    const authors = await getAuthors();

    const remainAuthors = authors.filter(
      (author) => author.id !== req.params.idAuthor
    );

    const modifitedAuthor = {
      ...req.body,
      id: req.params.idAuthor,
    };

    remainAuthors.push(modifitedAuthor);

    await writeAuthors(remainAuthors);

    res.send(modifitedAuthor);
  } catch (error) {
    next(error);
  }
});

const saveImagInStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "imgs-blog-post",
  },
});

authorRouter.put(
  "/:profilId/cover",
  multer({ storage: saveImagInStorage }).single("cover"),
  async (req, res, next) => {
    try {
      const authors = await getAuthors();

      const restOfAuthors = authors.filter(
        (author) => author.id !== req.params.profilId
      );

      const upgradeAuthor = authors.find(
        (author) => author.id === req.params.profilId
      );

      if (!upgradeAuthor) {
        console.log(`Author with ${req.params.id} is not found!`);
        res.send(`Author with ${req.params.id} is not found!`);
        req.status(404).send({
          message: `Author with ${req.params.id} is not found!`,
        });
      }

      const newAuthor = {
        ...upgradeAuthor,
        cover: req.file.path,
        upgradedAt: new Date(),
        id: req.params.profilId,
      };

      restOfAuthors.push(newAuthor);

      await writeAuthors(restOfAuthors);

      res.send(newAuthor);
    } catch (error) {
      next(error);
    }
  }
);

export default authorRouter;
