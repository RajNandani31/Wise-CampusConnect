const express = require("express");
const router = express.Router();
const {
  createAssignment,
  getAssignmentsProfessor,
  getAssignmentsStudent,
  getAssignmentById,
} = require("../controllers/assignmentController");
const authenticateJWT = require("../middleware/auth");

router.post("/createAssignment", authenticateJWT, createAssignment);
router.get(
  "/getAssignmentsProfessor",
  authenticateJWT,
  getAssignmentsProfessor
);
router.get("/getAssignmentsStudent", authenticateJWT, getAssignmentsStudent);
router.get("/:assignmentId", authenticateJWT, getAssignmentById);

module.exports = router;
