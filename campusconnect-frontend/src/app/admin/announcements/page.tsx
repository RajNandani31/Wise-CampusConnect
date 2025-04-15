import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const announcements = [
  {
    title: "Fall Semester Registration Open",
    type: "General",
    author: "Admin Office",
    date: "7/15/2023",
    views: 1250,
    status: "Published",
  },
  {
    title: "Campus Maintenance Schedule",
    type: "General",
    author: "Facilities Department",
    date: "8/5/2023",
    views: 980,
    status: "Published",
  },
];

export default function Announcements() {
  return (
    <div className="p-8 bg-[#fdf9f6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Announcements</h1>
        <Link
          className="bg-[#e6e4d8] px-4 py-2 rounded-md text-sm font-medium shadow"
          href="./announcements/create"
        >
          Create Announcement
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="Active Announcements" value="5" />
        <StatCard title="Important Alerts" value="2" />
        <StatCard title="Total Views" value="6,604" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow p-6">
        <h2 className="text-xl font-medium mb-4">All Announcements</h2>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Title</th>
              <th>Type</th>
              <th>Author</th>
              <th>Date</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {announcements.map((a, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-3">{a.title}</td>
                <td>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {a.type}
                  </span>
                </td>
                <td>{a.author}</td>
                <td>{a.date}</td>
                <td>{a.views.toLocaleString()}</td>
                <td>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {a.status}
                  </span>
                </td>
                <td className="flex gap-3 text-lg text-gray-600 mt-2.5">
                  <FiEye className="cursor-pointer" />
                  <FiEdit2 className="cursor-pointer" />
                  <FiTrash2 className="cursor-pointer text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-md shadow px-6 py-4">
    <div className="text-xl font-semibold">{value}</div>
    <div className="text-sm text-blue-600">{title}</div>
  </div>
);
