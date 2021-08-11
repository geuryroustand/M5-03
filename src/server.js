import express from "express";
import cors from "cors";
<<<<<<< HEAD
import postRouter from "./data/index.js";

const server = express();
const port = 3001;
server.use(cors());
server.use(express.json());
// Router

server.use("/posts", postRouter);

server.listen(port, () => {
  console.log("Server running");
=======
import authorRouter from "../src/data/authors.js";
const server = express();

const port = 3001;

// server.use(cors());
server.use(express.json());

server.use("/authors", authorRouter);

server.listen(port, () => {
  console.log("Server listing port");
>>>>>>> 42d9fa9a7e9ef901e0926c7fe3c974820d44c4b1
});
