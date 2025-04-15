const Assignment = require("../models/Assignments");
const Student = require("../models/Student");
const Course = require("../models/Courses");
const Announcement = require("../models/Announcement");

exports.createAssignment = async (req, res) => {
  try {
    const professorId = req.user.id;
    const {
      title,
      description,
      class: courseClass,
      dueDate,
      courseId,
    } = req.body;

    const assignment = new Assignment({
      title,
      description,
      class: courseClass,
      dueDate,
      professorId,
      courseId,
    });
    const recievers = await Student.find({ courses: courseId });
    const recieversArray = recievers.map((reciever) => reciever.user);
    const notifications = recieversArray.map((reciever) => ({
      title,
      description,
      redirectUrl: `/student/courses/${courseId}/assignments/${assignment._id}`,
      reciever,
    }));
    const notificationPromises = notifications.map(async (notification) => {
      const announcement = new Announcement(notification);
      await announcement.save();
    });
    await Promise.all(notificationPromises);
    await assignment.save();
    const course = await Course.findById(courseId);
    course.assignments.push(assignment._id);
    await course.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Assignment creation failed" });
  }
};

exports.getAssignmentById = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(500).json({ message: "Not found" });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all assignments for logged-in professor
exports.getAssignmentsProfessor = async (req, res) => {
  try {
    const professorId = req.user.id;
    const assignments = await Assignment.find({ professorId }).sort({
      createdAt: -1,
    });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch assignments" });
  }
};

exports.getAssignmentsStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    const courses = student.courses;
    const assignments = [];
    for (const course of courses) {
      const courseAssignments = await Assignment.find({
        courseId: course._id,
      }).sort({
        createdAt: -1,
      });
      assignments.push(...courseAssignments);
    }
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch assignments" });
  }
};
