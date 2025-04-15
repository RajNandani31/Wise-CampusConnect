const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getAllProfessors,
} = require("../controllers/userController");

router.get("/students", getAllStudents);
router.get("/professors", getAllProfessors);

module.exports = router;
