const commonErrors = require("../exceptions/common.exceptions");
const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(commonErrors.Unauthorization());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(commonErrors.Unauthorization());
    }

    const userData = tokenService.validate(accessToken);
    if (!userData) {
      return next(commonErrors.Unauthorization());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(commonErrors.BadRequest("Bad request"));
  }
};
