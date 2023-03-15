const router = require("express").Router();
const asyncHandler = require("../utils/async-handler.utils");
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");
const placesController = require("../controllers/places.controller");
const photosMiddleware = multer({ dest: "uploads" });
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  uploadByLinkSchema,
  createPlaceSchema,
  updatePlaceSchema,
} = require("../dto/places.dto");

router.post(
  `/upload-by-link`,
  validator.body(uploadByLinkSchema),
  authMiddleware,
  asyncHandler(placesController.uploadByLink)
);

router.post(
  `/upload`,
  authMiddleware,
  photosMiddleware.array("photos", 100),
  placesController.upload
);

router.post(
  `/`,
  validator.body(createPlaceSchema),
  authMiddleware,
  asyncHandler(placesController.create)
);
router.get(
  `/user-places`,
  authMiddleware,
  asyncHandler(placesController.getMyList)
);
router.get("/:id", asyncHandler(placesController.getPlaceById));
router.get("/", asyncHandler(placesController.getPlaces));
router.put(
  "/:id",
  validator.body(updatePlaceSchema),
  authMiddleware,
  asyncHandler(placesController.update)
);
module.exports = router;
