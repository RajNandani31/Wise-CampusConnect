import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-[#fdf9f6] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h2 className="text-sm font-medium text-gray-600">Total Users</h2>
          <p className="text-2xl font-bold">1,352</p>
          <p className="text-sm text-gray-600">
            1,250 students, 95 professors, 7 admins
          </p>
        </div>
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h2 className="text-sm font-medium text-gray-600">
            New Registrations
          </h2>
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-gray-600">This week</p>
        </div>
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h2 className="text-sm font-medium text-gray-600">Active Courses</h2>
          <p className="text-2xl font-bold">86</p>
          <p className="text-sm text-gray-600">Across 12 departments</p>
        </div>
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h2 className="text-sm font-medium text-gray-600">System Alerts</h2>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-gray-600">Security updates available</p>
        </div>
      </div>

      <div className="bg-white rounded-md shadow p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">User Activity</h2>
        <svg width="100%" height="200">
          <line x1="40" y1="10" x2="40" y2="170" stroke="#ccc" />
          <line x1="40" y1="170" x2="1000" y2="170" stroke="#ccc" />

          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points="50,160 150,140 250,130 350,120 450,130 550,150 650,140"
          />

          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            points="50,170 150,160 250,150 350,145 450,150 550,160 650,155"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h3 className="text-md font-medium">User Management</h3>
          <p className="text-sm text-gray-600">
            Create, edit, and manage user accounts and permissions.
          </p>
        </div>
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h3 className="text-md font-medium">Announcements</h3>
          <p className="text-sm text-gray-600">
            Create and manage system-wide announcements.
          </p>
        </div>
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h3 className="text-md font-medium">Course Calendar</h3>
          <p className="text-sm text-gray-600">
            Manage academic schedules and course timetables.
          </p>
        </div>
        <div className="bg-[#eef0dd] p-4 rounded-md">
          <h3 className="text-md font-medium">System Settings</h3>
          <p className="text-sm text-gray-600">
            Configure system parameters and security settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
