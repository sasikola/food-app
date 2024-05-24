const express = require("express");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const {
  createRestaurent,
  singleRestaurent,
  deleteRestaurent,
  updateRestaurent,
} = require("../controllers/vendorController/restaurent");

const checkVendor = require("../middleware/checkVendor");
const {
  createFood,
  allFoods,
  updateFood,
  deleteFood,
  singleFood,
} = require("../controllers/vendorController/food");

const router = express.Router();

// Restarurent Routes
router.post("/addRestaurent", jwtAuthMiddleware, checkVendor, createRestaurent);
router.get("/restaurent/:id", jwtAuthMiddleware, checkVendor, singleRestaurent);
router.delete(
  "/restaurent/:id",
  jwtAuthMiddleware,
  checkVendor,
  deleteRestaurent
);
router.put("/restaurent/:id", jwtAuthMiddleware, checkVendor, updateRestaurent);

// food routes
router.post("/food/create", jwtAuthMiddleware, checkVendor, createFood);
router.get("/food/get", jwtAuthMiddleware, checkVendor, allFoods);
router.get("/food/get/:id", jwtAuthMiddleware, checkVendor, singleFood);
router.put("/food/update/:id", jwtAuthMiddleware, checkVendor, updateFood);
router.delete("/food/delete/:id", jwtAuthMiddleware, checkVendor, deleteFood);

module.exports = router;
