export default function GradesPage() {
  // Single course data
  const course = {
    code: "CS101",
    title: "Introduction to Computer Science",
    students: 25,
    averageAttendance: 87,
    highestGrade: 95.6,
    averageGrade: 88.2,
  };

  const grades = [
    {
      name: "John Smith",
      id: "S12345",
      quiz: 85,
      midterm: 78,
      project: 78,
      final: null,
      grade: "85.6 (B)",
    },
    {
      name: "Emma Johnson",
      id: "S12346",
      quiz: 92,
      midterm: 88,
      project: 90,
      final: null,
      grade: "91.8 (A)",
    },
    {
      name: "Michael Brown",
      id: "S12347",
      quiz: 78,
      midterm: 72,
      project: 80,
      final: null,
      grade: "79.0 (C)",
    },
    {
      name: "Sophia Davis",
      id: "S12348",
      quiz: 88,
      midterm: 90,
      project: 85,
      final: null,
      grade: "88.8 (B)",
    },
    {
      name: "James Wilson",
      id: "S12349",
      quiz: 95,
      midterm: 92,
      project: 97,
      final: null,
      grade: "95.6 (A)",
    },
  ];

  return (
    <div className="mt-7">
      <div className="text-center mb-6">
        <div className="text-xl font-semibold mb-2 text-red-800">
          Grades
        </div>
      </div>

      <div className="bg-[#f5f5eb] min-h-screen px-10 py-8 text-sm">
        {/* Course Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {course.code}
            </h2>
            <p className="text-gray-600">{course.title}</p>
          </div>
          <span className="inline-block bg-[#e9e3d6] text-red-800 text-xs px-3 py-1 rounded-full font-medium">
            Spring 2025
          </span>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">Students Enrolled</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">
              {course.students}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">Average Attendance</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">
              {course.averageAttendance}%
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">Highest Grade</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">
              {course.highestGrade}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">Average Grade</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">
              {course.averageGrade}
            </div>
          </div>
        </div>

        {/* Table Title & Actions */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Student Grades
          </h2>
          <div className="flex gap-4">
        
          </div>
        </div>

        {/* Grades Table */}
        <div className="overflow-auto rounded-xl shadow-sm">
          <table className="w-full bg-white text-left border-separate border-spacing-y-2">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">
                  Quiz 1<br />
                  <span className="text-xs">(5%)</span>
                </th>
                <th className="px-4 py-2">
                  Midterm
                  <br />
                  <span className="text-xs">(25%)</span>
                </th>
                <th className="px-4 py-2">
                  Project
                  <br />
                  <span className="text-xs">(30%)</span>
                </th>
                <th className="px-4 py-2">
                  Final
                  <br />
                  <span className="text-xs">(40%)</span>
                </th>
                <th className="px-4 py-2">Current Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((student, i) => (
                <tr
                  key={i}
                  className={`rounded-xl ${
                    i % 2 === 0 ? "bg-[#f9f9f2]" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 font-medium">{student.name}</td>
                  <td className="px-4 py-2 text-gray-600">{student.id}</td>
                  <td className="px-4 py-2">{student.quiz}</td>
                  <td className="px-4 py-2">{student.midterm}</td>
                  <td className="px-4 py-2">{student.project}</td>
                  <td className="px-4 py-2">{student.final ?? "—"}</td>
                  <td className="px-4 py-2 font-semibold">{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end mt-4 gap-4">
        
        </div>
      </div>
    </div>
  );
}
