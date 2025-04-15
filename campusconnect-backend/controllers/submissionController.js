const Submission = require("../models/Submission");
const Student = require("../models/Student");
const Assignment = require("../models/Assignments");

exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentUserId = req.user.id;
    const student = await Student.findOne({
      user: studentUserId,
    });
    const studentId = student._id;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const existingSubmission = await Submission.findOne({
      assignmentId: assignmentId,
      studentId: studentId,
    });

    if (existingSubmission) {
      return res
        .status(400)
        .json({ message: "You have already submitted this assignment" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const newSubmission = new Submission({
      assignmentId: assignmentId,
      studentId: studentId,
      fileUrl: fileUrl,
      submittedAt: new Date(),
    });

    await newSubmission.save();

    const fullFileUrl = `${req.protocol}://${req.get("host")}${fileUrl}`;

    return res.status(201).json({
      message: "Assignment submitted successfully",
      fileUrl: fullFileUrl,
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return res.status(500).json({ message: "Error submitting assignment" });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await Submission.find({ assignmentId });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetching submissions failed" });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submissions = await Submission.findById(submissionId);
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetching submissions failed" });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const { grade, feedback, submissionId } = req.body;

    const submission = await Submission.findByIdAndUpdate(submissionId, {
      grade,
      feedback,
    });
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.json({ message: "Submission updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Updating submission failed" });
  }
};

exports.checkSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentUserId = req.user.id;

    const student = await Student.findOne({
      user: studentUserId,
    });
    const studentId = student._id;

    const submission = await Submission.findOne({
      assignmentId: assignmentId,
      studentId: studentId,
    });

    if (submission) {
      return res.status(200).json({
        submitted: true,
        fileUrl: submission.fileUrl,
        submittedAt: submission.submittedAt,
        grade: submission.grade,
        feedback: submission.feedback,
      });
    }

    return res.status(200).json({
      submitted: false,
    });
  } catch (error) {
    console.error("Error checking submission status:", error);
    return res
      .status(500)
      .json({ message: "Error checking submission status" });
  }
};
