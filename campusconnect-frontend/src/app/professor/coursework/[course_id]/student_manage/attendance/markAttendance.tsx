"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { saveRequestOffline } from "../../../../../../lib/saveRequest";

type AttendanceStatus = "present" | "absent" | "late" | "";

type MarkAttendanceProps = {
  date: string;
  setDate: (date: string) => void;
};

type Student = {
  _id: string;
  name: string;
  email: string;
};

export default function MarkAttendance({ date, setDate }: MarkAttendanceProps) {
  const pathname = usePathname();
  const courseId = pathname.split("/")[3];
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8000/api/courses/${courseId}/students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(res.data);
        console.log("Fetched students:", res.data);
        const initialAttendance = Object.fromEntries(
          res.data.map((s: Student) => [s._id, "present"])
        );
        setAttendance(initialAttendance);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load students. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchStudents();
    }
  }, [courseId]);

  const handleChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? "" : status,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      // Convert attendance object to array format expected by API
      const AttendanceData = Object.entries(attendance).map(
        ([studentId, status]) => ({
          studentId,
          status: status || "absent", // Default to absent if no status is selected
        })
      );
      if (navigator.onLine) {
        try {
          await axios.post("http://localhost:8000/api/attendance/create", {
            courseId,
            AttendanceData,
            date,
          });
          setSuccess("Attendance submitted successfully!");
        } catch (err) {
          const errorMsg = err.response?.data?.msg || "Something went wrong";
          setError(errorMsg);
          console.error("Failed to submit attendance:", err);
        }
      } else {
        console.warn("Offline mode: saving request offline");
        await saveRequestOffline(
          "http://localhost:8000/api/attendance/create",
          {
            courseId,
            AttendanceData,
            date,
          }
        );
        setSuccess(
          "Attendance saved offline. It will be submitted when you are back online."
        );
      }
    } catch (err) {
      console.error("Failed to submit attendance:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        Loading students...
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2 text-red-800">
            📅 Mark Attendance
          </h2>
          <p className="text-gray-600 text-sm">
            Record attendance for today's class
          </p>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-200 rounded px-3 py-1 text-sm shadow-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-gray-500 text-sm">
          <tr>
            <th className="px-4 py-2">Student</th>
            <th className="px-4 py-2">Present</th>
            <th className="px-4 py-2">Absent</th>
            <th className="px-4 py-2">Late</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr
              key={s._id}
              className={`rounded-xl ${
                i % 2 === 0 ? "bg-[#f5f5eb]" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 font-medium">{s.name}</td>
              {["present", "absent", "late"].map((status) => (
                <td className="px-4 py-2" key={status}>
                  <input
                    type="checkbox"
                    checked={attendance[s._id] === status}
                    onChange={() =>
                      handleChange(s._id, status as AttendanceStatus)
                    }
                    className="form-checkbox w-5 h-5 text-red-800 border-gray-300 rounded"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-[#e9e3d6] text-red-800 px-4 py-2 rounded shadow-sm font-medium hover:bg-[#e0d9ca] disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
}
