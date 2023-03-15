const router = require("express").Router();
const bookingContoller = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth.middleware");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { createBookingSchema } = require("../dto/booking.dto");

router.post(
  "/",
  validator.body(createBookingSchema),
  authMiddleware,
  bookingContoller.create
);
router.get("/", authMiddleware, bookingContoller.getMyList);
router.get("/:id", authMiddleware, bookingContoller.getById);

module.exports = router;
