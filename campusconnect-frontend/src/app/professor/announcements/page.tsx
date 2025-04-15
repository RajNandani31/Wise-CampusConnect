"use client";

import { useState } from "react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      title: "Project Submission Deadline Extended",
      message:
        "The deadline for the final project has been extended to April 15, 2025. Please ensure all submissions are completed through the course portal by 11:59 PM. If you encounter any technical difficulties, contact the IT support team.",
      date: "2025-04-01",
      course: "Advanced Software Engineering",
    },
    {
      title: "Midterm Marks Released",
      message:
        "The midterm examination results have been uploaded to the student portal. You can access your grades and feedback in the Grades section. Office hours will be extended this week for any grade discussions.",
      date: "2025-03-28",
      course: "Computer Science 401",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const postAnnouncement = () => {
    if (!newTitle.trim() || !newMessage.trim()) return;
    const newPost = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString().split("T")[0],
      course: newCourse || "General Announcement",
    };
    setAnnouncements([newPost, ...announcements]);
    setNewTitle("");
    setNewMessage("");
    setNewCourse("");
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4] p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#8B0000]">Announcements</h1>
        <p className="text-gray-600">
          Create and manage announcements for your courses
        </p>
      </div>

      {/* Top Tab Bar */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "create"
              ? "text-[#8B0000] border-b-2 border-[#8B0000]"
              : "text-gray-600 hover:text-[#8B0000]"
          }`}
        >
          Create Announcement
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "manage"
              ? "text-[#8B0000] border-b-2 border-[#8B0000]"
              : "text-gray-600 hover:text-[#8B0000]"
          }`}
        >
          Manage Announcements
        </button>
      </div>

      {activeTab === "create" && (
        /* Create Announcement Form */
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Post a New Announcement
            </h2>
            <p className="text-sm text-gray-500">
              This will be visible to all students enrolled in the selected
              course
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter announcement title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <input
                type="text"
                placeholder="Course name (optional)"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                placeholder="Write your announcement message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none transition resize-none h-32"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={postAnnouncement}
                className="bg-[#8B0000] hover:bg-[#700000] text-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                Post Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Feed - Always visible */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Announcements
          </h2>
          <span className="text-sm text-gray-500">
            {announcements.length} announcements
          </span>
        </div>

        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No announcements yet
            </div>
          ) : (
            announcements.map((a, index) => (
              <div
                key={index}
                className="border border-gray-100 p-5 rounded-xl hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-base text-gray-800">
                      {a.title}
                    </h3>
                    <span className="text-xs text-[#8B0000] bg-[#8B0000]/10 px-2 py-0.5 rounded-full">
                      {a.course}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {a.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{a.message}</p>

                {activeTab === "manage" && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2 justify-end">
                    <button className="text-xs text-gray-500 hover:text-[#8B0000] px-2 py-1">
                      Edit
                    </button>
                    <button className="text-xs text-gray-500 hover:text-red-600 px-2 py-1">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
