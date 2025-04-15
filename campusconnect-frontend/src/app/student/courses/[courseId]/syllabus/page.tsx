"use client";

export default function SyllabusPage() {
  return (
    <div className="bg-[#f5f4ef] min-h-screen px-8 py-6 text-[#2c2c2c]">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-[#800000]">
              Course Syllabus
            </h3>
            <p className="text-sm text-gray-500">
              Weekly topics, readings, and assignments.
            </p>
          </div>
          <div>
            <input
              type="date"
              className=" rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[#c4a992]"
            />
          </div>
        </div>

        <div className="overflow-x-auto ">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-3">Week</th>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Readings</th>
                <th className="px-6 py-3">Assignments</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {[
                [
                  "1",
                  "Introduction to Programming",
                  "Chapter 1",
                  "Hello World",
                ],
                [
                  "2",
                  "Variables and Data Types",
                  "Chapter 2",
                  "Basic Calculator",
                ],
                ["3", "Control Structures", "Chapter 3", "Number Analysis"],
                ["4", "Functions and Methods", "Chapter 4", "Function Library"],
              ].map(([week, topic, reading, assignment], index) => (
                <tr
                  key={week}
                  className={`${
                    index % 2 === 0 ? "bg-[#f8f8f0]" : "bg-white"
                  } hover:bg-[#f3f1eb] transition`}
                >
                  <td className="px-6 py-4 font-medium">{week}</td>
                  <td className="px-6 py-4">{topic}</td>
                  <td className="px-6 py-4 text-gray-600">{reading}</td>
                  <td className="px-6 py-4 text-gray-600">{assignment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
