const router = require("express").Router();
const userCotrollers = require("../controllers/user.controller");
const asyncHandler = require("../utils/async-handler.utils");
const authMiddleware = require("../middleware/auth.middleware");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { loginSchema, registerSchema } = require("../dto/auth.dto");

router.post(
  `/register`,
  validator.body(registerSchema),
  asyncHandler(userCotrollers.register)
);
router.post(
  `/login`,
  validator.body(loginSchema),
  asyncHandler(userCotrollers.login)
);
router.get(`/profile`, authMiddleware, asyncHandler(userCotrollers.profile));

module.exports = router;
