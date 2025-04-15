const express = require("express");
const router = express.Router();

const { createCourse, getCourse, getAllStudentsOfCourse, getAllAssignmentsOfCourse} = require("../controllers/courseController");

router.post("/createCourse", createCourse);
router.get("/:courseId", getCourse);
router.get("/:courseId/students", getAllStudentsOfCourse);
router.get("/:courseId/assignments", getAllAssignmentsOfCourse);

module.exports = router;
