const express = require("express");
const router = express.Router();

const {
  getProfessorById,
  getCoursesOfProfessor,
} = require("../controllers/professorController");
const verifyToken = require("../middleware/auth");

router.get("/courses", verifyToken, getCoursesOfProfessor);
router.get("/:professorId", getProfessorById);

module.exports = router;
