import express from "express";
import uniqid from "uniqid";
import { getPosts, writePost } from "../readUndWriteFiles/index.js";

import createHttpError from "http-errors";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const postPathNow = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/posts.json"
);

console.log(postPathNow);
const postRouter = express();

postRouter.get("/", async (req, res, next) => {
  try {
    console.log(req);
    const posts = await getPosts();

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/:idPost", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const findPost = posts.find((post) => post.id === req.params.idPost);

    if (findPost) {
      res.send(findPost);
    } else {
      next(createHttpError(404, `Post with the id ${req.params.id} not found`));
    }
  } catch (error) {
    next(error);
  }
});

postRouter.post("/", async (req, res, next) => {
  try {
    const posts = await getPosts();

    console.log(req);

    const newPost = { ...req.body, id: uniqid(), createdAt: new Date() };

    posts.push(newPost);

    await writePost(posts);

    res.status(201).send({ id: newPost.id });
  } catch (error) {
    next(error);
  }
});

postRouter.put("/:postID", async (req, res, next) => {
  try {
    const posts = await getPosts();

    const remainingPost = posts.filter((post) => post.id !== req.params.postID);

    const upgradedPost = { ...req.body, id: req.params.postID };

    remainingPost.push(upgradedPost);

    await writePost(remainingPost);

    res.send(upgradedPost);
  } catch (error) {
    next(error);
  }
});

postRouter.delete("/:idPost", async (req, res, next) => {
  try {
    const posts = await getPosts();

    const remainingPosts = posts.filter(
      (post) => post.id !== req.params.idPost
    );

    if (posts.id === req.params.id) {
      await writePost(remainingPosts);
      res.status(204).send();
    } else {
      next(createHttpError(401, `post with the id ${req.params.id} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default postRouter;
