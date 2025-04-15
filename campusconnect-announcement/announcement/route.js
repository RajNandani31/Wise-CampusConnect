const express = require("express");
const router = express.Router();
const { createAnnouncement, getAnnouncements } = require("./controller");
const verifyToken = require("./auth");

router.post("/create", createAnnouncement);
router.get("/get", verifyToken, getAnnouncements);

module.exports = router;
