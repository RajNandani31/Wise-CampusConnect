const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const {
  registerStudent,
  loginUser,
  registerProfessor,
  registerAdmin,
} = require("../controllers/authController");

const User = require("../models/User");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const Admin = require("../models/Admin");

router.post("/register/student", registerStudent);
router.post("/login", loginUser);
router.post("/register/professor", registerProfessor);
router.post("/register/admin", registerAdmin);
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let profile = {};

    if (user.role === "student") {
      const student = await Student.findOne({ user: user._id }).select(
        "branch year contact"
      );
      profile = student || {};
    } else if (user.role === "professor") {
      const professor = await Professor.findOne({ user: user._id }).select(
        "department contact"
      );
      profile = professor || {};
    } else if (user.role === "admin") {
      const admin = await Admin.findOne({ user: user._id }).select("name");
      profile = admin || {};
    }

    res.status(200).json({
      msg: `Welcome ${user.name}`,
      userId: user._id,
      email: user.email,
      role: user.role,
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
