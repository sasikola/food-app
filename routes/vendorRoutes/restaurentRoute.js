const express = require("express");
const {
  createRestaurent,
  allRestaurents,
} = require("../../controllers/vendorController/restaurent");
const { jwtAuthMiddleware } = require("../../middleware/authMiddleware");
const checkVendor = require("../../middleware/checkVendor");
const checkAdmin = require("../../middleware/checkAdmin");
const router = express.Router();

router.post("/addRestaurent", jwtAuthMiddleware, checkVendor, createRestaurent);
router.get("/restaurents", jwtAuthMiddleware, checkAdmin, allRestaurents);

module.exports = router;
