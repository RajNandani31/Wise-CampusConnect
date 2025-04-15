import Link from "next/link";
import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const courses = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    instructor: "Dr. Alan Turing",
    credits: 3,
    enrolled: 35,
    capacity: 40,
    status: "Active",
  },
  {
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    instructor: "Dr. Katherine Johnson",
    credits: 4,
    enrolled: 30,
    capacity: 35,
    status: "Active",
  },
];

const Courses = () => {
  return (
    <div className="p-8 bg-[#fdf9f6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Link
          href="/admin/courses/create"
          className="bg-[#eef0dd] text-sm font-medium px-4 py-2 rounded-md"
        >
          Add Course
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-2xl font-semibold">5</p>
          <p className="text-gray-600 text-sm mt-1">Active Courses</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-2xl font-semibold">190</p>
          <p className="text-blue-600 text-sm mt-1">Total Enrollments</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-2xl font-semibold">215</p>
          <p className="text-gray-600 text-sm mt-1">Total Capacity</p>
        </div>
      </div>

      {/* All Courses Table */}
      <div className="bg-white rounded-md shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold px-4 py-4 border-b">
          All Courses
        </h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium text-blue-700">Code</th>
              <th className="px-4 py-3 font-medium text-blue-700">Name</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Instructor</th>
              <th className="px-4 py-3 font-medium">Credits</th>
              <th className="px-4 py-3 font-medium">Enrollment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3">{course.code}</td>
                <td className="px-4 py-3">{course.name}</td>
                <td className="px-4 py-3">{course.department}</td>
                <td className="px-4 py-3">{course.instructor}</td>
                <td className="px-4 py-3 font-semibold">{course.credits}</td>
                <td className="px-4 py-3">
                  {course.enrolled}/{course.capacity}
                </td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3 text-gray-700">
                  <FiEye
                    className="cursor-pointer hover:text-blue-600"
                    size={18}
                  />
                  <FiEdit2
                    className="cursor-pointer hover:text-indigo-600"
                    size={18}
                  />
                  <FiTrash2
                    className="cursor-pointer hover:text-red-600"
                    size={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
