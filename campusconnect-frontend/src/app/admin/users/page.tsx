import React from "react";

const users = [
  {
    id: 1001,
    name: "John Smith",
    email: "john.smith@university.edu",
    role: "Student",
    department: "Computer Science",
    status: "Active",
  },
  {
    id: 1002,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "Student",
    department: "Mathematics",
    status: "Active",
  },
  {
    id: 2001,
    name: "Dr. Robert Chen",
    email: "robert.chen@university.edu",
    role: "Professor",
    department: "Computer Science",
    status: "Active",
  },
  {
    id: 2002,
    name: "Emily Watson",
    email: "emily.watson@university.edu",
    role: "Professor",
    department: "Physics",
    status: "Inactive",
  },
];

const badgeStyle = {
  Student: "bg-blue-100 text-blue-800",
  Professor: "bg-yellow-100 text-yellow-800",
  Active: "bg-green-500 text-white",
  Inactive: "bg-red-500 text-white",
};

const UserManagement = () => {
  return (
    <div className="p-8 bg-[#fdf9f6] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button className="bg-[#eef0dd] px-4 py-2 rounded-md text-sm font-medium">
          Add New User
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search users ..."
          className="border border-gray-200 rounded-md px-4 py-2 w-full max-w-md"
        />
        <button className="ml-4 font-medium text-gray-700">Filter</button>
      </div>

      <div className="bg-white rounded-md shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-3">{u.id}</td>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                  {u.email}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      badgeStyle[u.role]
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">{u.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      badgeStyle[u.status]
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-gray-100 text-sm px-3 py-1 rounded-md">
                    Edit
                  </button>
                  {u.status === "Active" ? (
                    <button className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-md">
                      Deactivate
                    </button>
                  ) : (
                    <button className="bg-red-100 text-green-600 text-sm px-3 py-1 rounded-md">
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
