const mongoose = require("mongoose");
const Course = require("./Courses");
const Student = require("./Student");

const attendanceSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
