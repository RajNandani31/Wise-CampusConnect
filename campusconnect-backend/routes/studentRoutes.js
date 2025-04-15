const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getStudentById,
  getAllCoursesOfStudent,
  getStudentByUserId,
} = require("../controllers/studentController");

router.get("/", auth, getStudentByUserId);
router.get("/courses", auth, getAllCoursesOfStudent);
router.get("/:studentId", getStudentById);

module.exports = router;
