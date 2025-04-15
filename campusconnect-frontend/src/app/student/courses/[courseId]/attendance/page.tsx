"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { usePathname } from "next/navigation";

interface Student {
  _id: string;
  name: string;
}

interface Course {
  _id: string;
  courseCode: string;
  name: string;
  classDates: string[];
}

interface AttendanceItem {
  date: string;
  rawDate: string;
  status: string;
}

interface AttendanceSummary {
  present: number;
  total: number;
  percentage: number;
}

export default function CourseAttendanceView() {
  const [student, setStudent] = useState<Student | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceSummary, setAttendanceSummary] = useState<AttendanceSummary>(
    {
      present: 0,
      total: 0,
      percentage: 0,
    }
  );

  const pathname = usePathname();
  const courseId = pathname?.split("/")?.[3] || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const studentRes = await axios.get<Student>(
          "http://localhost:8000/api/student/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudent(studentRes.data);

        const courseRes = await axios.get<Course>(
          `http://localhost:8000/api/courses/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourse(courseRes.data);

        const attendancePromises = courseRes.data.classDates.map((date) =>
          axios
            .post(
              "http://localhost:8000/api/attendance/get",
              { courseId, date, studentId: studentRes.data._id },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => ({
              date: new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              rawDate: date,
              status: res.data?.status || "Not Recorded",
            }))
        );

        const items = await Promise.all(attendancePromises);
        items.sort(
          (a, b) =>
            new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
        );
        setAttendanceData(items);

        const presentCount = items.filter((i) =>
          ["present", "late"].includes(i.status.toLowerCase())
        ).length;

        setAttendanceSummary({
          present: presentCount,
          total: items.length,
          percentage:
            items.length > 0
              ? Math.round((presentCount / items.length) * 100)
              : 0,
        });

        setLoading(false);
      } catch (err) {
        const error = err as Error | AxiosError;
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"
        ></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          <p className="mt-2">Please try logging in again.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-4 py-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#800000] mb-1">
              Attendance Overview
            </h2>
            <p className="text-gray-600 text-sm">
              Weekly attendance status for your course.
            </p>
          </div>
          <Link
            href="/student/attendance"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Courses
          </Link>
        </div>

        {student && course && (
          <div className="mb-4">
            <p className="text-gray-800 font-medium">
              {course.courseCode} - {course.name}
            </p>
            <p className="text-gray-600">
              Student: <span className="font-medium">{student.name}</span>
            </p>
          </div>
        )}

        {attendanceData.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
            No attendance records found for this course.
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3">Week</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item, index) => (
                  <tr
                    key={item.rawDate}
                    className={index % 2 === 0 ? "bg-neutral-50" : "bg-white"}
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">
                      {item.status.toLowerCase() === "present" ? (
                        <span className="text-green-600 font-medium">
                          Present ✅
                        </span>
                      ) : item.status.toLowerCase() === "absent" ? (
                        <span className="text-red-500 font-medium">
                          Absent ❌
                        </span>
                      ) : (
                        <span className="text-gray-500 font-medium">
                          {item.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="font-semibold text-blue-700">
            ✅ {attendanceSummary.present} / {attendanceSummary.total} classes
            attended ({attendanceSummary.percentage}%)
          </p>
        </div>
      </div>
    </div>
  );
}
