const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Bad request", stack = null } = err;

  if (process.env.NODE_ENV === "dev")
    return res.status(status).send({ message, stack });

  res.status(status).send({ message });
};

export default errorHandler;
