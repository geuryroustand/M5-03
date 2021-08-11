import express from "express";
import fs from "fs";
import uniqid from "uniqid";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const postRouter = express();

const postPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json");

// const getPost = () => JSON.parse();

postRouter.get("/", (req, res) => {
  const getPosts = JSON.parse(fs.readFileSync(postPath));
  res.send(getPosts);
});

postRouter.post("/", (req, res) => {
  const newPost = { ...req.body, id: uniqid(), createdAt: new Date() };
  const getArrPosts = JSON.parse(fs.readFileSync(postPath));
  getArrPosts.push(newPost);
  fs.writeFileSync(postPath, JSON.stringify(getArrPosts));
  res.status(201).send({ id: newPost.id });

  console.log("post");
});

export default postRouter;
