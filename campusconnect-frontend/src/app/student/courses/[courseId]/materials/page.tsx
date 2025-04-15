"use client";

export default function MaterialsPage() {
  const materials = [
    {
      title: "Course Syllabus",
      type: "PDF",
      date: "9/1/2023",
      size: "245 KB",
    },
    {
      title: "Introduction to Programming Slides",
      type: "PPTX",
      date: "9/5/2023",
      size: "1.2 MB",
    },
    {
      title: "Python Installation Guide",
      type: "PDF",
      date: "9/5/2023",
      size: "350 KB",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-4 py-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#800000] mb-1">
              Course Materials
            </h2>
            <p className="text-gray-600 text-sm">
              Lecture slides, handouts, and additional resources.
            </p>
          </div>
        </div>

        {materials.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
            No materials uploaded yet.
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date Added</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-neutral-50" : "bg-white"}
                  >
                    <td className="px-4 py-3">{material.title}</td>
                    <td className="px-4 py-3">{material.type}</td>
                    <td className="px-4 py-3">{material.date}</td>
                    <td className="px-4 py-3">{material.size}</td>
                    <td className="px-4 py-3">
                      <button className="bg-[#e6e6ce] hover:bg-[#dcdcc0] text-black text-sm font-medium rounded-md px-4 py-1">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
