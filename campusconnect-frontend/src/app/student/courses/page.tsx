"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  _id?: string;
  courseName?: string;
  courseCode?: string;
  progress?: number;
  status?: string;
  instructor?: string;
  schedule?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/student/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setCourses(data || []);
        console.log("Fetched Courses:", data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf8f5]">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#2c2c2c]">My Courses</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {courses.length > 0 &&
              `Showing ${courses.length} of ${courses.length} courses`}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c4a992]"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <select className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#c4a992]">
              <option value="all">All</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="flex space-x-2 text-sm">
            <button className="text-[#c4a992] hover:underline">
              Sort by Name
            </button>
            <span className="text-gray-400">|</span>
            <button className="text-[#c4a992] hover:underline">
              Sort by Date
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  3 issues found. Course data may be incomplete.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c4a992]"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No courses found.</p>
            <Link
              href="/student/explore"
              className="inline-block bg-[#c4a992] hover:bg-[#b38a7f] text-white px-4 py-2 rounded"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: Course, index) => {
              const courseId = course._id || index;
              const courseName = course.courseName || "Course Name";
              const courseCode =
                course.courseCode || (index === 0 ? "WEB101" : "CS101");
              const progress = course.progress || 65;
              const status = course.status || "In Progress";
              const instructor = course.instructor || "Professor Name";
              const schedule =
                course.schedule ||
                (index === 0 ? "MWF 10:00-11:30 AM" : "Mon Wed Fri");

              return (
                <div
                  key={courseId}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-medium text-gray-600">
                        {courseCode}
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {status}
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-[#2c2c2c] mb-4">
                      {courseName}
                    </h2>

                    <div className="space-y-2 mb-6">
                      <div className="flex">
                        <span className="text-gray-600 w-24">Instructor:</span>
                        <span>{instructor}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-24">Schedule:</span>
                        <span>{schedule}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded h-2">
                        <div
                          className="bg-[#c4a992] h-2 rounded"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <Link
                      href={`/student/courses/${courseId}`}
                      className="block text-center bg-[#c4a992] hover:bg-[#b38a7f] text-white py-2 rounded transition"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
