const Course = require("../models/Courses");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const Assignment = require("../models/Assignments");

const createCourse = async (req, res) => {
  const {
    courseName,
    professorId,
    studentIds,
    courseCode,
    schedule,
    location,
    term,
    classDates,
    assignments,
  } = req.body;
  try {
    const course = await Course.create({
      courseName,
      courseCode,
      professorId,
      studentIds,
      schedule,
      location,
      term,
      classDates,
      assignments,
    });
    const professor = await Professor.findById(professorId);
    if (!professor) return res.status(404).json({ msg: "Professor not found" });
    professor.courses.push(course._id);
    await professor.save();
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length === 0)
      return res.status(404).json({ msg: "No students found" });
    for (const student of students) {
      student.courses.push(course._id);
      await student.save();
    }
    res.status(201).json({ msg: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllCourses = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId).populate("courses");
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json(student.courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

getAllStudentsOfCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    const studentIds = course.studentIds;
    if (studentIds.length === 0)
      return res.status(404).json({ msg: "Students not found" });
    const students = await Student.find({ _id: { $in: studentIds } });
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

getAllAssignmentsOfCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    const assignmentIds = course.assignments;
    if (assignmentIds.length === 0)
      return res.status(404).json({ msg: "Assignments not found" });
    const assignments = await Assignment.find({ _id: { $in: assignmentIds } });
    res.status(200).json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createCourse,
  getCourse,
  getAllStudentsOfCourse,
  getAllAssignmentsOfCourse,
};
