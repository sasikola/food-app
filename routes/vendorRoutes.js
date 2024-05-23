const express = require("express");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const { createRestaurent, singleRestaurent, deleteRestaurent, updateRestaurent } = require("../controllers/vendorController/restaurent");

const checkVendor = require("../middleware/checkVendor");


const router = express.Router();

router.post("/addRestaurent", jwtAuthMiddleware, checkVendor, createRestaurent);
router.get("/restaurent/:id", jwtAuthMiddleware, checkVendor, singleRestaurent);
router.delete("/restaurent/:id", jwtAuthMiddleware, checkVendor, deleteRestaurent);
router.put("/restaurent/:id", jwtAuthMiddleware, checkVendor, updateRestaurent);

module.exports = router;
