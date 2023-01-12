module.exports = (err, req, res, next) => {
  const { status = 500, message = "Bad request" } = err;

  res.status(status).send(message);
};
