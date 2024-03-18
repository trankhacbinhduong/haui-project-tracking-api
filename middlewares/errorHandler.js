const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
