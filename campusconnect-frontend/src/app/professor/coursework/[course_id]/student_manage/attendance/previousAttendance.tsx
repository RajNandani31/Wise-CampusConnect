"use client";
import { useEffect, useState } from "react";
import { CalendarDays, Download } from "lucide-react";

type AttendanceStatus = "present" | "absent" | "late" | null;

type Student = {
  _id: string;
  name: string;
  email: string;
};

type Course = {
  _id: string;
  name: string;
  studentIds: string[];
  classDates: string[];
};

export default function PreviousAttendance() {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceData, setAttendanceData] = useState<
    Record<string, Record<string, AttendanceStatus>>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const path = window.location.pathname;
      const courseId = path.split("/")[3];

      try {
        const courseResponse = await fetch(
          `http://localhost:8000/api/courses/${courseId}`
        );
        if (!courseResponse.ok) throw new Error("Failed to fetch course");
        const courseData = await courseResponse.json();
        setCourse(courseData);

        const { classDates, studentIds } = courseData;
        classDates.sort(
          (a: string, b: string) =>
            new Date(a).getTime() - new Date(b).getTime()
        );

        const studentPromises = studentIds.map((id: string) =>
          fetch(`http://localhost:8000/api/student/${id}`).then((res) =>
            res.json()
          )
        );
        const studentData = await Promise.all(studentPromises);
        setStudents(studentData);
        setFilteredStudents(studentData);

        const attendanceRecords: Record<
          string,
          Record<string, AttendanceStatus>
        > = {};

        studentIds.forEach((studentId: string) => {
          attendanceRecords[studentId] = {};
          classDates.forEach((date: string) => {
            attendanceRecords[studentId][date] = null;
          });
        });

        const attendancePromises: Promise<void>[] = [];

        for (const studentId of studentIds) {
          for (const date of classDates) {
            const promise = fetch(`http://localhost:8000/api/attendance/get`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                courseId,
                date,
                studentId,
              }),
            })
              .then(async (res) => {
                if (res.ok) {
                  const record = await res.json();
                  if (record) {
                    attendanceRecords[studentId][date] = record.status;
                  }
                }
              })
              .catch((error) => {
                console.error(
                  `Error fetching attendance for ${studentId} on ${date}:`,
                  error
                );
              });

            attendancePromises.push(promise);
          }
        }

        await Promise.all(attendancePromises);
        setAttendanceData(attendanceRecords);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const exportToCSV = () => {
    if (!course) return;

    let csvContent =
      "Student Name," +
      course.classDates.map((date) => formatDate(date)).join(",") +
      "\n";

    filteredStudents.forEach((student) => {
      const studentRecord = attendanceData[student._id];
      const statusValues = course.classDates.map((date) => {
        const status = studentRecord?.[date];
        return status || "not recorded";
      });

      csvContent += `${student.name},${statusValues.join(",")}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance-report-${course.name}-${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-center text-red-500">
          Course not found or error loading course data
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-800">
            <CalendarDays className="w-5 h-5 text-red-800" />
            {course.name} - Attendance Records
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {course.classDates.length} classes • {students.length} students
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="bg-[#e9e3d6] hover:bg-[#e0d9ca] text-red-800 py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="bg-[#f5f5eb] text-gray-700 px-4 py-3 sticky left-0 z-10 border border-gray-200">
                Student
              </th>
              {course.classDates.map((date) => (
                <th
                  key={date}
                  className="bg-[#f5f5eb] text-gray-700 border border-gray-200 px-3 py-5 text-center whitespace-nowrap"
                >
                  <div className="transform -rotate-45 origin-center font-medium">
                    {formatDate(date)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={course.classDates.length + 1}
                  className="px-4 py-8 text-center text-gray-600 border border-gray-200"
                >
                  {searchTerm
                    ? "No matching students found"
                    : "No students enrolled in this course"}
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, i) => (
                <tr
                  key={student._id}
                  className={`transition hover:bg-[#f9f9f2] ${
                    i % 2 === 0 ? "bg-white" : "bg-[#f5f5eb]/50"
                  }`}
                >
                  <td className="px-4 py-3 border border-gray-200 font-medium sticky left-0 bg-inherit z-10">
                    <div>
                      <div className="text-gray-800">{student.name}</div>
                      <div className="text-gray-600 text-xs">
                        {student.email}
                      </div>
                    </div>
                  </td>
                  {course.classDates.map((date) => {
                    const status = attendanceData[student._id]?.[date];
                    let statusStyle = "text-gray-400";
                    let symbol = "-";
                    let tooltip = "No record";
                    let bgColor = "bg-gray-100";

                    if (status === "present") {
                      statusStyle = "text-green-700";
                      bgColor = "bg-green-50";
                      symbol = "P";
                      tooltip = "Present";
                    } else if (status === "absent") {
                      statusStyle = "text-red-800";
                      bgColor = "bg-red-50";
                      symbol = "A";
                      tooltip = "Absent";
                    } else if (status === "late") {
                      statusStyle = "text-amber-700";
                      bgColor = "bg-amber-50";
                      symbol = "L";
                      tooltip = "Late";
                    }

                    return (
                      <td
                        key={date}
                        className="px-4 py-3 text-center border border-gray-200"
                        title={`${student.name} - ${formatDate(
                          date
                        )}: ${tooltip}`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold ${bgColor} ${statusStyle}`}
                        >
                          {symbol}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center border-t border-gray-200 pt-4">
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-green-700 font-semibold text-xs">
              P
            </span>
            <span className="text-gray-700">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-800 font-semibold text-xs">
              A
            </span>
            <span className="text-gray-700">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-semibold text-xs">
              L
            </span>
            <span className="text-gray-700">Late</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400 font-semibold text-xs">
              -
            </span>
            <span className="text-gray-700">No Record</span>
          </div>
        </div>
      </div>
    </div>  );
}
