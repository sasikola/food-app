const express = require("express");
const {
  userRegister,
  userLogin,
  vendorRegister,
  vendorLogin,
  adminLogin,
} = require("../controllers/authController");

const router = express.Router();

// user register and login
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
// vendor registration and login
router.post("/vendor/register", vendorRegister);
router.post("/vendor/login", vendorLogin);

// admin login
router.post("/admin/login", adminLogin);

module.exports = router;
