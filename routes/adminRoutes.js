const express = require("express");
const {
  allRestaurents,
  singleRestaurent,
} = require("../controllers/vendorController/restaurent");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const checkAdmin = require("../middleware/checkAdmin");
const { allUsers } = require("../controllers/userController");
const { allVendors } = require("../controllers/adminController/vendor");
const router = express.Router();
// route to get all users
router.get("/users", jwtAuthMiddleware, checkAdmin, allUsers);
// route to get all vendors
router.get("/vendors", jwtAuthMiddleware, checkAdmin, allVendors);

router.get("/allRestaurents", jwtAuthMiddleware, checkAdmin, allRestaurents);
router.get("/restaurent/:id", jwtAuthMiddleware, checkAdmin, singleRestaurent);

module.exports = router;
