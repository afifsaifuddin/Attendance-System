const express = require("express");
const salaryController = require("../Controllers/salaryController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/salary", verifyToken, salaryController.getSalary);
router.post("/salary", verifyToken, salaryController.employeeSalary);

module.exports = router;
