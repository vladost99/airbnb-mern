const router = require("express").Router();
const userCotrollers = require("../controllers/user.controller");
const asyncHandler = require("../utils/async-handler.utils");
const authMiddleware = require("../middleware/auth.middleware");

router.post(`/register`, asyncHandler(userCotrollers.register));
router.post(`/login`, asyncHandler(userCotrollers.login));
router.get(`/profile`, authMiddleware, asyncHandler(userCotrollers.profile));

module.exports = router;
