"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProfessorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/professors/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-[#fcf8f6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
      </div>

      {courses.length === 0 ? (
        <p>No courses assigned.</p>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {course.courseCode}: {course.courseName}
                </h2>
                <div className="text-sm mt-2 text-gray-700">
                  <p>
                    <strong>Students Enrolled:</strong>{" "}
                    {course.enrollment || 45}
                  </p>
                  <p>
                    <strong>Schedule:</strong> {course.schedule || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong> {course.location || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="bg-orange-100 border border-orange-300 px-4 py-2 rounded hover:bg-orange-200">
                    View Details
                  </button>
                  <Link
                    href={`/professor/coursework/${course._id}/student_manage`}
                    className="bg-orange-100 border border-orange-300 px-4 py-2 rounded hover:bg-orange-200"
                  >
                    Manage Students
                  </Link>
                  <button className="bg-orange-100 border border-orange-300 px-4 py-2 rounded hover:bg-orange-200">
                    Course Materials
                  </button>
                </div>
              </div>
              <div>
                <span className="bg-green-100 text-sm px-3 py-1 rounded-full text-gray-700">
                  {course.term || "Fall 2023"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
