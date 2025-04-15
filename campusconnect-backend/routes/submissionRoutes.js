const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  submitAssignment,
  getSubmissions,
  getSubmission,
  updateSubmission,
  checkSubmission,
} = require("../controllers/submissionController");
const authenticateJWT = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/updateSubmission", updateSubmission);
router.post(
  "/:assignmentId",
  authenticateJWT,
  upload.single("file"),
  submitAssignment
);
router.get("/:submissionId", getSubmission);
router.post("/getSubmission/:submissionId", getSubmission);
router.get("/getSubmissions/:assignmentId", authenticateJWT, getSubmissions);
router.get("/check/:assignmentId", authenticateJWT, checkSubmission);
module.exports = router;
