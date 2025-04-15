// app/admin/courses/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    professorId: "",
    studentIds: [],
    schedule: "",
    location: "",
    term: "",
    classDates: [],
    assignments: [],
    department: "",
    credits: "",
    capacity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentIdsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const ids = e.target.value
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    setFormData({ ...formData, studentIds: ids });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/courses/createCourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Course Created Successfully!");
        // Navigate back to courses list
        router.push("/admin/courses");
      } else {
        alert(data.msg || "Failed to create course.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-red-800">
            🎓 The Heritage University
          </h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
            Create New Course
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Empowering education through seamless connectivity
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
                placeholder="e.g., CS101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
                placeholder="e.g., Introduction to Computer Science"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="e.g., 3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professor ID
              </label>
              <input
                type="text"
                name="professorId"
                value={formData.professorId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
                placeholder="e.g., 60a1c2b3d4e5f6a7b8c9d0e1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student IDs (comma separated)
              </label>
              <textarea
                name="studentIds"
                value={formData.studentIds.join(", ")}
                onChange={handleStudentIdsChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                rows={3}
                placeholder="e.g., 61a2b3c4d5e6f7a8b9c0d1e2, 62b3c4d5e6f7a8b9c0d1e2f3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Term
                </label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                >
                  <option value="">Select Term</option>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                  <option value="Summer 2026">Summer 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="e.g., 40"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
                placeholder="e.g., Main Campus, Room 301"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule
              </label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
                placeholder="e.g., Mon/Wed/Fri 10:00-11:30 AM"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
              } text-gray-800 font-medium py-3 rounded-md transition-all duration-200 mt-6`}
            >
              {isSubmitting ? "CREATING..." : "CREATE COURSE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
