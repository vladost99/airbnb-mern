const router = require("express").Router();
const bookingContoller = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, bookingContoller.create);
router.get("/", authMiddleware, bookingContoller.getMyList);
router.get("/:id", authMiddleware, bookingContoller.getById);

module.exports = router;
