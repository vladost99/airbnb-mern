module.exports = function (err, req, res, next) {
  if (!err) return next();

  res.status(err.status).json({
    message: err.message,
    status: err.status,
  });
};
