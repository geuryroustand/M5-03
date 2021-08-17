import fs from "fs-extra";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { writeJSON, readJSON, writeFile } = fs;

const postsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/posts.json"
);
const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img"
);

const publicFolderPathAuthor = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/authors"
);

const authorsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/authors.json"
);

export const getPosts = () => readJSON(postsPath);

export const writePost = (content) => writeJSON(postsPath, content);

export const saveImgPost = (fileName, contentBuffer) =>
  writeFile(join(publicFolderPath, fileName), contentBuffer);

export const getAuthors = () => readJSON(authorsPath);

export const writeAuthors = (content) => writeJSON(authorsPath, content);

export const saveImgAuthor = (fileName, contentBuffer) =>
  writeFile(join(publicFolderPathAuthor, fileName), contentBuffer);
