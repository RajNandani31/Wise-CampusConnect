"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Assignment {
  _id: string;
  title: string;
  class: string;
  dueDate: string;
  status: string;
}

export default function AssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const courseId = pathname.split("/")[3];

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8000/api/assignment/getAssignmentsProfessor",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignments(res.data || []);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf9f3] ">
      <h1 className="text-xl justify-center font-bold text-[#8B0000] mb-6 ml-8">
        Assignment Management
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-gray-500">No assignments have been created yet.</p>
      ) : (
        <div className="bg-[#f6f2e8] p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-[#8B0000] mb-4">
            📋 Assigned Tasks
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Title</th>
                <th className="py-2">Class</th>
                <th className="py-2">Due Date</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item) => (
                <tr
                  key={item._id}
                  className="border-b w-2xl hover:bg-[#fcfaf6] transition"
                >
                  <td className="py-3">{item.title}</td>
                  <td>{item.class}</td>
                  <td>
                    {item.dueDate
                      ? new Date(item.dueDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        router.push(
                          `/professor/coursework/${courseId}/student_manage/assignments/${item._id}/submissions`
                        )
                      }
                      className="px-4 py-2 rounded-full border border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition"
                    >
                      View Submissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
