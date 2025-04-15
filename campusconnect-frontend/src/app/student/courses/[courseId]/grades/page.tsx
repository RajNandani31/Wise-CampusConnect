export default function GradesPage() {
  const gpa = 3.43;
  const totalCredits = 14;

  const grades = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      grade: "A",
      gradeColor: "text-green-600",
      progress: 92,
    },
    {
      code: "MATH201",
      name: "Calculus II",
      grade: "B+",
      gradeColor: "text-indigo-600",
      progress: 88,
    },
  ];

  return (
    <div className="bg-[#fdf9f5] min-h-screen px-10 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Grades</h2>

      {/* GPA Card */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-medium mb-1">Current Semester GPA</h3>
        <div className="text-4xl font-bold text-[#2d267f]">{gpa}</div>
        <div className="text-sm text-[#7d82b8] mt-1">
          Total Credits: {totalCredits}
        </div>
      </div>

      {/* Course Grades */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Course Grades</h3>
        <div className="grid grid-cols-4 text-sm font-semibold text-gray-600 mb-2">
          <div>Course Code</div>
          <div>Course Name</div>
          <div>Grade</div>
          <div>Progress</div>
        </div>

        {grades.map((course, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 py-4 items-center border-t border-[#f3ede6] text-sm"
          >
            <div className="font-semibold text-black">{course.code}</div>
            <div className="text-gray-700">{course.name}</div>
            <div className={`font-semibold ${course.gradeColor}`}>
              {course.grade}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full h-2 rounded-full bg-[#f5f1ec]">
                <div
                  className="h-2 rounded-full bg-black"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{course.progress} %</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
