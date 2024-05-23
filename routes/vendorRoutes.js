const express = require("express");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const { createRestaurent, singleRestaurent } = require("../controllers/vendorController/restaurent");

const checkVendor = require("../middleware/checkVendor");


const router = express.Router();

router.post("/addRestaurent", jwtAuthMiddleware, checkVendor, createRestaurent);
router.get("/restaurent/:id", jwtAuthMiddleware, checkVendor, singleRestaurent);

module.exports = router;
