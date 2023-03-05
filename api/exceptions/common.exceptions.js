module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static Unauthorization(message = null) {
    return new ApiError(401, message || "User is not authorized");
  }

  static UserNotFound() {
    return new ApiError(404, "User not found");
  }
  static PasswordNotMatch() {
    return new ApiError(409, "Password not match");
  }
  static UserAlreadyExist() {
    return new ApiError(409, "User already exist");
  }

  static InvalidURL() {
    return this.BadRequest("Invalid URL");
  }
};
