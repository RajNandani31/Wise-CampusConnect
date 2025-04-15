"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  CalendarClock,
  FileText,
  User,
  Download,
  FileCheck,
} from "lucide-react";

interface Assignment {
  _id: string;
  title: string;
  class: string;
  status: string;
  dueDate: string;
  description?: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface Submission {
  _id: string;
  studentId: string;
  fileUrl: string;
  assignmentId: string;
  createdAt: string;
  student?: Student;
}

export default function AssignmentSubmissionsPage() {
  const params = useParams();
  const assignmentId = params.assignmentId as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const assignmentRes = await axios.get(
          `http://localhost:8000/api/assignment/${assignmentId}`,
          config
        );
        setAssignment(assignmentRes.data);
        const submissionsRes = await axios.get(
          `http://localhost:8000/api/submission/getSubmissions/${assignmentId}`,
          config
        );
        console.log("Submissions Response:", submissionsRes.data);
        let submissionsData = [];
        if (Array.isArray(submissionsRes.data)) {
          submissionsData = submissionsRes.data;
        }

        const submissionsWithStudents = await Promise.all(
          submissionsData.map(async (submission) => {
            try {
              const studentRes = await axios.get(
                `http://localhost:8000/api/student/${submission.studentId}`
              );
              return {
                ...submission,
                student: studentRes.data,
              };
            } catch (err) {
              console.error(
                `Failed to fetch student data for ID: ${submission.studentId}`,
                err
              );
              return submission;
            }
          })
        );

        setSubmissions(submissionsWithStudents);
      } catch (error) {
        console.error("Failed to fetch assignment or submissions:", error);
        setError(
          "Failed to load assignment data. Please try refreshing the page."
        );
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchData();
    }
  }, [assignmentId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFileExtension = (url: string) => {
    if (!url) return "file";
    return url.split(".").pop()?.toLowerCase() || "file";
  };

  const getFileIcon = (url: string) => {
    const ext = getFileExtension(url);

    if (["pdf"].includes(ext)) {
      return <FileText className="text-red-500" />;
    } else if (["doc", "docx"].includes(ext)) {
      return <FileText className="text-blue-500" />;
    } else if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
      return <FileText className="text-green-500" />;
    } else {
      return <FileText className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-600">
        <p className="font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-8 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
        <p className="font-medium">Assignment not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
    {/* Assignment Header */}
    <div className="bg-white shadow-sm rounded-xl p-6 mb-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileCheck className="text-red-800" size={24} />
            {assignment.title}
          </h1>
          <p className="text-gray-600 mt-1">{assignment.class}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <CalendarClock size={16} className="text-gray-600" />
            <span className="text-gray-600 text-sm">
              Due: {formatDate(assignment.dueDate)}
            </span>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              assignment.status === "Completed"
                ? "bg-green-50 text-green-700"
                : "bg-[#f9f5e8] text-red-800"
            }`}
          >
            {assignment.status || "Pending"}
          </span>
        </div>
      </div>
  
      {assignment.description && (
        <div className="mt-4 p-4 bg-[#f5f5eb] rounded-lg text-gray-700 text-sm">
          {assignment.description}
        </div>
      )}
    </div>
  
    {/* Submissions Section */}
    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-red-800">
        <Download size={20} className="text-red-800" />
        Submissions ({submissions.length})
      </h2>
  
      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => {
            return (
              <div
                key={submission._id}
                className="flex justify-between items-center bg-[#f5f5eb] p-4 rounded-lg border border-gray-200 hover:border-red-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#e9e3d6] h-10 w-10 rounded-full flex items-center justify-center text-red-800">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {submission.student?.name}
                    </p>
                    {submission.createdAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted: {formatDate(submission.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-gray-600 flex items-center gap-1">
                    {getFileIcon(submission.fileUrl)}
                    {getFileExtension(submission.fileUrl).toUpperCase()}
                  </span>
                  <a
                    href={`./submissions/${submission._id}`}
                    className="px-4 py-2 bg-[#e9e3d6] text-red-800 rounded hover:bg-[#e0d9ca] transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <Download size={16} />
                    View Submission
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#f5f5eb] p-8 rounded-lg text-center">
          <FileText size={40} className="text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">
            No submissions have been received yet.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Student submissions will appear here once they've been uploaded.
          </p>
        </div>
      )}
    </div>
  </div>  );
}
