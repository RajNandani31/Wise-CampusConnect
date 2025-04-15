"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";

interface Assignment {
  title?: string;
  description?: string;
  dueDate?: string;
  due?: string;
  class?: string;
  course?: string;
  status?: string;
  instructions?: string;
  grade?: string | number;
  feedback?: string;
}

interface SubmissionDetails {
  submittedAt: string;
  fileUrl?: string;
}

interface SubmissionResponse {
  submitted: boolean;
  submittedAt: string;
  fileUrl?: string;
}

export default function AssignmentDetailPage() {
  const { assignmentId } = useParams() as { assignmentId: string };
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionDetails, setSubmissionDetails] =
    useState<SubmissionDetails | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<Assignment>(
          `http://localhost:8000/api/assignment/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssignment(res.data);

        try {
          const submissionRes = await axios.get<SubmissionResponse>(
            `http://localhost:8000/api/submission/check/${assignmentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(submissionRes.data);
          if (submissionRes.data.submitted) {
            setIsSubmitted(true);
            setSubmissionDetails({
              submittedAt: new Date(
                submissionRes.data.submittedAt
              ).toLocaleString(),
            });
            if (submissionRes.data.fileUrl) {
              setFilePreviewUrl(submissionRes.data.fileUrl);
            }
          }
        } catch (error) {
          console.log("No submission found");
        }
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchAssignmentDetails();
    }
  }, [assignmentId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post<{ fileUrl?: string }>(
        `http://localhost:8000/api/submission/${assignmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitted(true);
      setSubmissionDetails({
        submittedAt: new Date().toLocaleString(),
      });

      // Set file preview URL from response
      if (response.data && response.data.fileUrl) {
        setFilePreviewUrl(response.data.fileUrl);
      }

      alert("✅ Submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed.");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#fdf8f4] min-h-screen flex items-center justify-center">
        <p>Loading assignment details...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="bg-[#fdf8f4] min-h-screen flex items-center justify-center">
        <p>Assignment not found</p>
      </div>
    );
  }

  const status = assignment.status?.toLowerCase() || "pending";
  const dueDate = assignment.dueDate
    ? new Date(assignment.dueDate).toLocaleDateString()
    : assignment.due || "No due date";

  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Assignment Details */}
          <div className="w-full md:w-1/2 bg-white rounded-xl border p-6 shadow-sm">
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {assignment.title || "Untitled Assignment"}
              </h2>
              {status === "pending" && (
                <span className="text-sm text-gray-700">Due: {dueDate}</span>
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
            </div>

            <p className="text-sm text-blue-800 mb-4">
              {assignment.class || assignment.course || "Unassigned"}
            </p>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                {assignment.description || "No description provided."}
              </div>
            </div>

            {/* Additional details like instructions, attachments, etc. */}
            {assignment.instructions && (
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Instructions</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  {assignment.instructions}
                </div>
              </div>
            )}

            {/* Grade info if available */}
            {status === "graded" && assignment.grade && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h3 className="text-md font-medium mb-2">Grade</h3>
                <p className="text-lg font-bold">{assignment.grade}</p>
                {assignment.feedback && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Feedback:</h4>
                    <p className="text-sm">{assignment.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Submission Section */}
          <div className="w-full md:w-1/2 bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              {isSubmitted ? "Your Submission" : "Submit Assignment"}
            </h3>

            {!isSubmitted && status === "pending" ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    {selectedFile ? selectedFile.name : "Choose a file"}
                  </label>
                  {!selectedFile && (
                    <p className="text-sm text-gray-500 mt-2">
                      Upload your assignment file
                    </p>
                  )}
                  {selectedFile && (
                    <div className="mt-2 text-sm text-gray-700">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Assignment
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-amber-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="font-medium text-amber-800">
                      Assignment Already Submitted
                    </span>
                  </div>

                  {submissionDetails && (
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Submitted on:</span>{" "}
                        {submissionDetails.submittedAt}
                      </p>
                    </div>
                  )}
                </div>

                {/* Document Preview */}
                {filePreviewUrl && (
                  <div>
                    <h4 className="text-md font-medium mb-2">
                      Submitted Document
                    </h4>
                    <div className="border rounded-lg overflow-hidden h-96">
                      <iframe
                        src={`http://localhost:8000${filePreviewUrl}`}
                        className="w-full h-full"
                        title="Submitted document preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
