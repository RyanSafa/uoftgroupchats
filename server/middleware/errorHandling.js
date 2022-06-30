const ErrorHandler = (Error, req, res, next) => {
  res.status(Error.status || 500);
  res.send({ error: true, message: Error.message || "Enternal Server Error." });
};

module.exports = ErrorHandler;
