const express = require("express");
const {
  allRestaurents,
} = require("../controllers/vendorController/restaurent");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const checkAdmin = require("../middleware/checkAdmin");
const router = express.Router();

router.get("/allRestaurents", jwtAuthMiddleware, checkAdmin, allRestaurents);


module.exports = router;
