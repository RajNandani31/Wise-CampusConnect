"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sat", hours: 4 },
  { day: "Sun", hours: 1 },
  { day: "Mon", hours: 7 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 4 },
];

const assignments = [
  {
    name: "Design Accessibility",
    date: "Today, 10:30 AM",
    level: "Advanced",
    time: "2 hours",
    score: 184,
  },
  {
    name: "Typography",
    date: "4 Dec, 12:30 PM",
    level: "Intermediate",
    time: "4 hours",
    score: 190,
  },
  {
    name: "Design Composition",
    date: "2 Dec, 6:00 AM",
    level: "Advanced",
    time: "1 hour",
    score: 140,
  },
  {
    name: "UI Components",
    date: "30 Nov, 4:30 PM",
    level: "Intermediate",
    time: "3 hours",
    score: 168,
  },
];

const trending = [
  { title: "Framer Masterclass", lessons: 12, time: "6h", likes: 7000 },
  { title: "Design Composition", lessons: 8, time: "4h", likes: 6000 },
  { title: "Analytics Tools", lessons: 7, time: "3h", likes: 5800 },
];

const announcements = [
  {
    title: "New Course Available",
    description: "Check out the new UI/UX Masterclass launched today!",
  },
  {
    title: "Maintenance Alert",
    description:
      "Platform will be under maintenance on 10th Dec from 2 AM to 4 AM.",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#fcf8f5] text-[#2c2c2c]">
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data} barCategoryGap="30%" barGap={4}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#444", fontSize: 12, fontWeight: 500 }}
                  axisLine={true}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#444", fontSize: 12, fontWeight: 500 }}
                  axisLine={true}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    background: "#fff",
                    border: "1px solid #c4a992",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  cursor={{ fill: "#f9f4f1" }}
                />
                <Bar
                  dataKey="hours"
                  fill="#c4a992"
                  radius={[0, 0, 0, 0]} // pointed corners
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#f5e8df] rounded-2xl shadow-lg p-6 md:p-8 flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-4 leading-snug">
              Learn on your terms,
              <br /> anytime, anywhere.
            </h2>
            <button className="mt-6 bg-[#c4a992] hover:bg-[#b38a7f] text-white px-5 py-3 rounded-xl text-base font-semibold transition duration-300 ease-in-out">
              Download App
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Assignments</h2>
          <div className="text-sm text-gray-500 mb-6">
            24 Completed • Last updated on 4th Dec, 24
          </div>
          <ul className="divide-y divide-gray-200">
            {assignments.map((a, i) => (
              <li
                key={i}
                className="py-4 flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div className="mb-2 md:mb-0">
                  <div className="font-medium text-lg">{a.name}</div>
                  <div className="text-sm text-gray-500">{a.date}</div>
                </div>
                <div className="text-sm text-gray-600 md:ml-4">
                  {a.level} • {a.time}
                </div>
                <div className="font-semibold md:ml-4">{a.score}/200</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <ul className="space-y-4">
            {announcements.map((a, i) => (
              <li
                key={i}
                className="border rounded-xl p-4 bg-[#fffaf6] hover:shadow transition duration-200"
              >
                <div className="font-medium text-lg mb-1">{a.title}</div>
                <div className="text-sm text-gray-600">{a.description}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
          <ul className="space-y-4">
            {trending.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center hover:bg-gray-50 rounded-lg p-2 transition duration-200"
              >
                <div>
                  <div className="font-medium text-lg">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    {item.lessons} Lessons • {item.time}
                  </div>
                </div>
                <div className="text-sm text-gray-600">❤️ {item.likes}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
