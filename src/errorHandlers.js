export const notFound = (err, req, res, next) => {
  if (err && err.status === 400) {
    res.status(400).send({ massage: err.message || "Not found" });
  }
  next();
};

export const forbidden = (err, req, res, next) => {
  if (err && err.status === 403) {
    res.status(403).send({ massage: err.message || "Forbidden" });
  }
  next();
};

export const catchAllErrorHandler = (err, req, res, next) => {
  if (err) {
    if (!req.headersSent) {
      res
        .status(err.status || 500)
        .send({ massage: err.message || "Something went wrong" });
    }
  }
  next();
};
