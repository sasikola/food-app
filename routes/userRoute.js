const express = require("express");
const {
  allUsers,
  profile,
  updatePassword,
  updateProfile,
  resetPassword,
} = require("../controllers/userController");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const { allRestaurents, singleRestaurent } = require("../controllers/vendorController/restaurent");

const router = express.Router();



// route to ger profile data
router.get("/profile", jwtAuthMiddleware, profile);

// route to update the profile password
router.put("/profile/password", jwtAuthMiddleware, updatePassword);

// route to update the profile details
router.put("/profile/update", jwtAuthMiddleware, updateProfile);
router.post("/resetPassword", resetPassword);

// restaurent routes
router.get("/restaurents", jwtAuthMiddleware, allRestaurents);
router.get("/restaurent/:id", jwtAuthMiddleware, singleRestaurent);

module.exports = router;
