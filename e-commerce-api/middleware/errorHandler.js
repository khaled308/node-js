const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Bad request", stack = null } = err;

  res.status(status).send({ message, stack });
};

export default errorHandler;
