const Student = require("../models/Student");
const Course = require("../models/Courses");

const getStudentById = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getStudentByUserId = async (req, res) => {
  const studentUserId = req.user.id;
  try {
    const student = await Student.findOne({ user: studentUserId });
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllCoursesOfStudent = async (req, res) => {
  const studentUserId = req.user.id;
  try {
    const student = await Student.findOne({ user: studentUserId });
    if (!student) return res.status(404).json({ msg: "Student not found" });
    const courseIds = student.courses;
    const courses = await Course.find({ _id: { $in: courseIds } });
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getStudentById,
  getAllCoursesOfStudent,
  getStudentByUserId,
};
