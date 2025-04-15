const express = require("express");
const router = express.Router();

const {
  createAttendance,
  getAttendanceByDateStudent,
} = require("../controllers/attendanceController");

router.post("/get", getAttendanceByDateStudent);
router.post("/create", createAttendance);

module.exports = router;
