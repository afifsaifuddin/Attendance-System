const express = require("express");
const { verifyToken } = require("../middleware/auth");
const HistoryController = require("../Controllers/historyController");
const router = express.Router();

router.post("/", verifyToken, HistoryController.employeeLogin);
router.patch("/", verifyToken, HistoryController.employeeLogout);
// router.get("/history/:userId", HistoryController.getHistory);
router.get("/history", verifyToken, HistoryController.getHistory);

module.exports = router;
