const Course = require("../models/Courses");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

const createAttendance = async (req, res) => {
  const { courseId, AttendanceData, date } = req.body;
  try {
    if (!Array.isArray(AttendanceData) || AttendanceData.length === 0)
      return res.status(400).json({ msg: "No student IDs provided" });

    if (!date) return res.status(400).json({ msg: "Date is required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    const formattedDateToCheck = new Date(date).toISOString().split("T")[0];
    const attendanceAlreadyTaken = course.classDates.some((classDate) => {
      const formattedClassDate = new Date(classDate)
        .toISOString()
        .split("T")[0];
      return formattedClassDate === formattedDateToCheck;
    });

    if (attendanceAlreadyTaken) {
      return res
        .status(400)
        .json({ msg: "Attendance already taken for this date" });
    }

    course.classDates.push(date);
    await course.save();

    await Promise.all(
      AttendanceData.map((attendance) =>
        Attendance.create({
          studentId: attendance.studentId,
          status: attendance.status,
          courseId,
          date,
        })
      )
    );

    res.status(201).json({ msg: "Attendance created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAttendanceByDateStudent = async (req, res) => {
  const { courseId, date, studentId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    if (!date) return res.status(400).json({ msg: "Date is required" });
    const formattedDateToCheck = new Date(date).toISOString().split("T")[0];
    const attendanceAlreadyTaken = course.classDates.some((classDate) => {
      const formattedClassDate = new Date(classDate)
        .toISOString()
        .split("T")[0];
      return formattedClassDate === formattedDateToCheck;
    });
    if (!attendanceAlreadyTaken) {
      return res
        .status(400)
        .json({ msg: "Attendance not taken for this date" });
    }
    const attendanceRecord = await Attendance.findOne({
      studentId,
      courseId,
      date,
    });
    res.status(200).json(attendanceRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createAttendance,
  getAttendanceByDateStudent,
};
