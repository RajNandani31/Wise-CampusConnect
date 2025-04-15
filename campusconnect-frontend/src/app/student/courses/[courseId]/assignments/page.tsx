"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface Assignment {
  _id: string;
  title: string;
  class: string;
  course: string;
  dueDate: string;
  status: string;
}

export default function AssignmentsPage() {
  const [fetchedAssignments, setFetchedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const courseId = pathName.split("/")[3];

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8000/api/courses/${courseId}/assignments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched Assignments:", res.data);
        setFetchedAssignments(res.data || []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const handleViewAssignment = (assignmentId) => {
    router.push(`./assignments/${assignmentId}`);
  };

  const allAssignments = [...fetchedAssignments];

  return (
    <div className="bg-[#f5f4ef] min-h-screen px-8 py-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#800000] mb-4">
          My Assignments
        </h2>

        {loading ? (
          <p className="text-sm text-gray-600">Loading assignments...</p>
        ) : allAssignments.length === 0 ? (
          <p className="text-sm text-gray-600">No assignments available.</p>
        ) : (
          <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {allAssignments.map((item: Assignment, index) => {
                const status = item.status?.toLowerCase() || "pending";
                const dueDate = item.dueDate
                  ? new Date(item.dueDate).toLocaleDateString()
                  : item.dueDate || "No due date";

                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#f8f8f0]" : "bg-white"
                    } hover:bg-[#f3f1eb] transition`}
                  >
                    <td className="px-6 py-4 font-medium">
                      {item.title || "Untitled"}
                    </td>
                    <td className="px-6 py-4">
                      {item.class || item.course || "Unassigned"}
                    </td>
                    <td className="px-6 py-4">{dueDate}</td>
                    <td className="px-6 py-4">
                      {status === "pending" && (
                        <span className="text-xs text-gray-700">{dueDate}</span>
                      )}
                      {status === "submitted" && (
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                          Submitted
                        </span>
                      )}
                      {status === "graded" && (
                        <span className="bg-green-200 text-green-900 text-xs px-3 py-1 rounded-full font-medium">
                          Graded
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewAssignment(item._id)}
                        className="bg-[#e6e6ce] text-black text-sm font-medium rounded-md px-4 py-1 hover:bg-[#d4d4b3]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
