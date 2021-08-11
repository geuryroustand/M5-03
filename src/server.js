import express from "express";
import cors from "cors";
import postRouter from "./data/index.js";

const server = express();
const port = 3001;
server.use(cors());
server.use(express.json());
// Router

server.use("/posts", postRouter);

server.listen(port, () => {
  console.log("Server running");
});
