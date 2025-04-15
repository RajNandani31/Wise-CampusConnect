const User = require("../models/User");

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    if (!students) {
      return res.status(404).json({ message: "No students found" });
    }
    res
      .status(200)
      .json({ message: "Students fetched successfully", students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProfessors = async (req, res) => {
  try {
    const professors = await User.find({ role: "professor" });
    if (!professors) {
      return res.status(404).json({ message: "No professors found" });
    }
    res
      .status(200)
      .json({ message: "Professors fetched successfully", professors });
  } catch (error) {
    console.error("Error fetching professors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllStudents,
  getAllProfessors,
};
