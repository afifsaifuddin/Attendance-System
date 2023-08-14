const express = require("express");
const { authController, AdminController } = require("../Controllers");
const { loginValidator, validateRegist } = require("../middleware/validator");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/auth/account", authController.getAccount);
router.get("/auth/role", authController.getRole);
router.post("/auth", loginValidator, validateRegist, authController.login);
router.post("/", verifyToken, AdminController.createEmployee);
router.patch("/", verifyToken, AdminController.employeeForm);
router.get("/auth/keepLogin", verifyToken, authController.keepLogin);

module.exports = router;
