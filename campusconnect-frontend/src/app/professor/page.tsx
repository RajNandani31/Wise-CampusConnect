export default function DashboardPage() {
  const summaryCards = [
    { title: "Courses", subtitle: "Teaching this semester:", value: 3 },
    { title: "Students", subtitle: "Across All Courses:", value: 105 },
    { title: "Pending Reviews", subtitle: "Assignments to grade:", value: 12 },
  ];

  const courseStatus = [
    {
      title: "Introduction to Computer Science",
      code: "CS101",
      students: 35,
      submitted: 28,
    },
    {
      title: "Introduction to Computer Science",
      code: "CS101",
      students: 35,
      submitted: 12,
    },
    {
      title: "Introduction to Computer Science",
      code: "CS101",
      students: 35,
      submitted: 20,
    },
  ];

  const upcomingClasses = [
    {
      title: "CS101 - Introduction to Computer Science",
      time: "10:00 - 11:30",
      room: "Science Building 305",
      date: "Today",
    },
    {
      title: "CS305 - Data Structures And Algorithms",
      time: "10:00 - 11:30",
      room: "Science Building 305",
      date: "Tomorrow",
    },
  ];

  return (
    <div className="bg-[#fdf9f5] min-h-screen px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm text-gray-500">{card.subtitle}</div>
            <div className="text-3xl font-bold mt-1">
              {String(card.value).padStart(2, "0")}
            </div>
            <div className="text-md font-medium mt-1">{card.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-4">Course Status</h3>
          <div className="space-y-4">
            {courseStatus.map((course, idx) => {
              const progress = Math.round(
                (course.submitted / course.students) * 100
              );
              return (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-500">
                    {course.code} • {course.students} Students
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-2 mb-1">
                    Assignment Submissions
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full bg-[#c79352]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {course.submitted}/{course.students}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
          <div className="space-y-4">
            {upcomingClasses.map((cls, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow-sm text-sm"
              >
                <div className="font-medium mb-1">{cls.title}</div>
                <div>
                  <span className="font-semibold">Time :</span> {cls.time}
                </div>
                <div>
                  <span className="font-semibold">Room :</span> {cls.room}
                </div>
                <div>
                  <span className="font-semibold">Date :</span> {cls.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
