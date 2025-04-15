const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  studentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  schedule: {
    type: String,
  },
  location: {
    type: String,
  },
  term: {
    type: String, // e.g., "Fall 2023"
  },
  classDates: [
    {
      type: Date,
    },
  ],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Courses = mongoose.model("Course", courseSchema);
module.exports = Courses;
