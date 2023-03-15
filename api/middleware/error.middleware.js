module.exports = function (err, req, res, next) {
  if (err || (err.error && err.error.isJoi)) {
    res.status(err.status || 400).json({
      message: err.message || err.error.toString(),
      status: err.status || 400,
    });
  } else {
    next(err);
  }
};
