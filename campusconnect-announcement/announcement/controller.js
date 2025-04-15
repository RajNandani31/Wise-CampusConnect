const User = require("./models/User");
const Announcement = require("./model");

const createAnnouncement = async (req, res) => {
  const { title, description, redirectUrl, recievers } = req.body;

  try {
    const recieversArray = await User.find({ _id: { $in: recievers } });
    if (recieversArray.length === 0) {
      return res.status(404).json({ message: "No recievers found" });
    }
    const announcementPromises = recieversArray.map(async (reciever) => {
      const announcement = new Announcement({
        title,
        description,
        redirectUrl,
        reciever: reciever._id,
      });
      await announcement.save();
      return announcement;
    });
    const announcements = await Promise.all(announcementPromises);
    res
      .status(201)
      .json({ message: "Announcements created successfully", announcements });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAnnouncements = async (req, res) => {
  const userId = req.user.id;
  console.log("User ID:", userId);
  const notifications = await Announcement.find({ reciever: userId });
  console.log("Notifications:", notifications);
  if (!notifications) {
    return res.status(404).json({ message: "No notifications found" });
  }
  res
    .status(200)
    .json({ message: "Notifications fetched successfully", notifications });
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
};
