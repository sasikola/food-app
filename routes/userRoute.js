const express = require("express");
const {
  allUsers,
  profile,
  updatePassword,
  updateProfile,
  resetPassword,
} = require("../controllers/userController");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();



// route to ger profile data
router.get("/profile", jwtAuthMiddleware, profile);

// route to update the profile password
router.put("/profile/password", jwtAuthMiddleware, updatePassword);

// route to update the profile details
router.put("/profile/update", jwtAuthMiddleware, updateProfile);
router.post("/resetPassword", resetPassword);

module.exports = router;
