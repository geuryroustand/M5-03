import express from "express";
import uniqid from "uniqid";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const authorRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentFilePath);
const authorJsonPath = join(currentFolderPath, "posts.json");

authorRouter.post("/", (req, res) => {
  const newAuthor = {
    ...req.body,
    id: uniqid(),
    avatar: ` https://ui-avatars.com/api/?name=John+Doe`,
  };

  const authors = JSON.parse(fs.readFileSync(authorJsonPath));

  authors.push(newAuthor);

  fs.writeFileSync(authorJsonPath, JSON.stringify(authors));

  res.status(201).send({ id: newAuthor.id });
});

authorRouter.get("/", (req, res) => {
  const arrFile = fs.readFileSync(authorJsonPath);
  res.send(JSON.parse(arrFile));
});

authorRouter.get("/:id", (req, res) => {
  const arrfile = JSON.parse(fs.readFileSync(authorJsonPath));

  const authorsFilter = arrfile.find((arrs) => arrs.id === req.params.id);
  res.send(authorsFilter);
});

authorRouter.delete("/:id", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorJsonPath));

  const ramainAuthors = authors.filter((auth) => auth.id !== req.params.id);
  fs.writeFileSync(authorJsonPath, JSON.stringify(ramainAuthors));

  res.status(204).send();
});

export default authorRouter;
