const ErrorHandler = (Error, req, res, next) => {
  res.status(Error.status || 500);
  res.send({
    status: Error.status,
    message: Error.message || "Enternal Server Error.",
  });
};

module.exports = ErrorHandler;
