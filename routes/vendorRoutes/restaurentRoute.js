const express = require("express");
const { createRestaurent } = require("../../controllers/vendorController/restaurent");
const { jwtAuthMiddleware } = require("../../middleware/authMiddleware");
const checkVendor = require("../../middleware/checkVendor");
const router = express.Router();

router.post("/addRestaurent", jwtAuthMiddleware,checkVendor, createRestaurent);

module.exports = router;
