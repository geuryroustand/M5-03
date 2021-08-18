import express from "express";
import cors from "cors";
import postRouter from "./blogs/index.js";
import authorRouter from "./authors/index.js";
import filesRouter from "./files/index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import listEndpoints from "express-list-endpoints";
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";

// const publicFolderPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "../public"
// );

const server = express();

const port = process.env.PORT;

const publicFolderPath = join(process.cwd(), "../public");

server.use(express.static(publicFolderPath));

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOpts = {
  origin: (origin, next) => {
    console.log(!origin);
    if (!origin || whitelist.includes(origin)) {
      next(null, true);
    } else {
      next(new Error(`Origin ${origin} not allowed!`));
    }
  },
};

server.use(cors(corsOpts));
server.use(express.json());

server.use("/posts", postRouter);
server.use("/authors", authorRouter);
server.use("/files", filesRouter);

// console.log(process.env);
console.table(listEndpoints(server));

// server.use(notFound);
// server.use(forbidden);
// server.use(catchAllErrorHandler);

server.listen(port, () => {
  console.log("Server listing port");
});

server.on("error", (err) => {
  console.log(`server not running : ${err}`);
});
