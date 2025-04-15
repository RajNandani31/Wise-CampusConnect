const Professor = require("../models/Professor");
const Course = require("../models/Courses");

const getProfessorById = async (req, res) => {
  const { professorId } = req.params;
  try {
    const professor = await Professor.findById(professorId).populate("courses");
    if (!professor) return res.status(404).json({ msg: "Professor not found" });
    res.status(200).json({ professor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getCoursesOfProfessor = async (req, res) => {
  const userId = req.user.id;
  try {
    const professor = await Professor.findOne({ user: userId }).populate(
      "courses"
    );
    if (!professor) return res.status(404).json({ msg: "Professor not found" });
    const courses = professor.courses;
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getProfessorById,
  getCoursesOfProfessor,
};
