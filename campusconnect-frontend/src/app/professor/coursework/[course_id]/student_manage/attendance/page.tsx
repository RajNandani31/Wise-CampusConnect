"use client";

import { useState } from "react";
import MarkAttendance from "./markAttendance";
import PreviousAttendance from "./previousAttendance";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"mark" | "previous">("mark");
  const [date, setDate] = useState("2025-03-29");

  return (
    <div className="mt-7">
      <div className="bg-[#f5f5eb] min-h-screen px-10 py-8 text-sm">
        <div className="text-center mb-6">
          <div className="text-xl font-semibold mb-2 text-red-800">
            Attendance Management
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("mark")}
            className={`px-5 py-2 rounded-lg border ${
              activeTab === "mark"
                ? "bg-[#e9e3d6] text-red-800 border-red-800 font-medium"
                : "text-gray-600 hover:text-red-800 border-gray-300 hover:border-red-800"
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab("previous")}
            className={`px-5 py-2 rounded-lg border ${
              activeTab === "previous"
                ? "bg-[#e9e3d6] text-red-800 border-red-800 font-medium"
                : "text-gray-600 hover:text-red-800 border-gray-300 hover:border-red-800"
            }`}
          >
            Previous Attendance
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          {activeTab === "mark" ? (
            <MarkAttendance date={date} setDate={setDate} />
          ) : (
            <PreviousAttendance />
          )}
        </div>
      </div>
    </div>
  );
}
