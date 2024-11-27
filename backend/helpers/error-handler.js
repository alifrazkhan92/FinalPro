function errorHandler(err, req, res, next) {
  const status =
    err.name === "ValidationError"
      ? 400
      : err.name === "UnauthorizedError"
      ? 401
      : 500;
  const message =
    typeof err === "string"
      ? err
      : err.name === "UnauthorizedError"
      ? "Invalid Token"
      : err.message;
  return res.status(status).json({ message });
}

module.exports = errorHandler;
