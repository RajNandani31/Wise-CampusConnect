import React from "react";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

const departments = [
  {
    name: "Computer Science",
    code: "CS",
    head: "Dr. Alan Turing",
    faculty: 12,
    students: 450,
    courses: 24,
  },
  {
    name: "Mathematics",
    code: "MATH",
    head: "Dr. Katherine Johnson",
    faculty: 15,
    students: 380,
    courses: 28,
  },
];

const Departments = () => {
  return (
    <div className="p-8 bg-[#fdf9f6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <button className="bg-[#eef0dd] text-sm font-medium px-4 py-2 rounded-md">
          Add Department
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-2xl font-semibold">6</p>
          <p className="text-gray-600 text-sm mt-1">Total Departments</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-2xl font-semibold">71</p>
          <p className="text-gray-600 text-sm mt-1">Total Faculty Members</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-2xl font-semibold">128</p>
          <p className="text-gray-600 text-sm mt-1">Total Courses</p>
        </div>
      </div>

      {/* Departments Table */}
      <div className="bg-white rounded-md shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold px-4 py-4 border-b">
          All Departments
        </h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Department Head</th>
              <th className="px-4 py-3 font-medium">Faculty</th>
              <th className="px-4 py-3 font-medium">Students</th>
              <th className="px-4 py-3 font-medium">Courses</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{dept.name}</td>
                <td className="px-4 py-3">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                    {dept.code}
                  </span>
                </td>
                <td className="px-4 py-3">{dept.head}</td>
                <td className="px-4 py-3 font-semibold">{dept.faculty}</td>
                <td className="px-4 py-3">{dept.students}</td>
                <td className="px-4 py-3">{dept.courses}</td>
                <td className="px-4 py-3 flex gap-3 items-center text-gray-700">
                  <FiExternalLink
                    className="cursor-pointer hover:text-blue-600"
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

export default Departments;
