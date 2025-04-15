"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  FileText,
  Save,
  ExternalLink,
  Download,
  Maximize,
  Minimize,
} from "lucide-react";
import Link from "next/link";

interface Submission {
  _id: string;
  studentId: string;
  fileUrl: string;
  assignmentId: string;
  createdAt: string;
  grade?: number;
  feedback?: string;
  student?: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function ViewSubmissionPage() {
  const params = useParams();
  const submissionId = params.submissionId as string;
  const pathname = usePathname();
  const courseId = pathname.split("/")[3]; // Extract course ID from the URL

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string>("unknown");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
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

        const submissionRes = await axios.get(
          `http://localhost:8000/api/submission/${submissionId}`,
          config
        );

        const submissionData = submissionRes.data;

        // If the submission has a student ID, fetch the student info
        if (submissionData.studentId) {
          try {
            const studentRes = await axios.get(
              `http://localhost:8000/api/student/${submissionData.studentId}`,
              config
            );
            submissionData.student = studentRes.data;
          } catch (err) {
            console.error("Failed to fetch student data:", err);
          }
        }

        setSubmission(submissionData);
        setGrade(submissionData.grade);
        setFeedback(submissionData.feedback || "");

        // Determine document type
        if (submissionData.fileUrl) {
          const ext = getFileExtension(submissionData.fileUrl);
          setDocumentType(ext);

          // For text-based documents, try to fetch the content
          if (["txt", "md", "html", "css", "js", "json", "xml"].includes(ext)) {
            try {
              const docResponse = await axios.get(
                `http://localhost:8000${submissionData.fileUrl}`,
                { responseType: "text" }
              );
              setDocumentContent(docResponse.data);
            } catch (err) {
              console.error("Failed to fetch document content:", err);
              setDocumentContent(null);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch submission:", error);
        setError("Failed to load submission. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    if (submissionId) {
      fetchSubmission();
    }
  }, [submissionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/submission/updateSubmission",
        {
          grade,
          feedback,
          submissionId,
        }
      );

      setSuccess("Grading submitted successfully!");

      // Update local submission data
      if (submission) {
        setSubmission({
          ...submission,
          grade,
          feedback,
        });
      }
    } catch (error) {
      console.error("Failed to update submission:", error);
      setError("Failed to submit grading. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getFileExtension = (url: string) => {
    if (!url) return "file";
    return url.split(".").pop()?.toLowerCase() || "file";
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderDocument = () => {
    if (!submission?.fileUrl) {
      return (
        <div className="text-center text-gray-500">
          <FileText size={48} className="text-gray-300 mx-auto mb-3" />
          <p>No file was submitted</p>
        </div>
      );
    }

    const fileUrl = `http://localhost:8000${submission.fileUrl}`;
    const ext = documentType;

    // Handle different file types
    switch (true) {
      // PDF documents
      case ext === "pdf":
        return (
          <div className="w-full h-full relative">
            <button
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-neutral-600 transition-colors text-white bg-neutral-700"
              title={isFullscreen ? "Exit fullscreen" : "View in fullscreen"}
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
            <iframe
              src={fileUrl}
              className="w-full h-full border-0"
              title="PDF Document"
            />
          </div>
        );

      // Image files
      case ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext):
        return (
          <div className="w-full h-full flex items-center justify-center overflow-auto relative">
            <button
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-neutral-600 transition-colors text-white bg-neutral-700"
              title={isFullscreen ? "Exit fullscreen" : "View in fullscreen"}
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
            <iframe
              src={fileUrl}
              className="w-full h-full border-0"
              title="PDF Document"
            />
            <img
              src={fileUrl}
              alt="Submitted Image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );

      // Plain text, Markdown, etc.
      case ["txt", "md", "html", "css", "js", "json", "xml"].includes(ext) &&
        documentContent !== null:
        return (
          <div className="w-full h-full overflow-auto relative">
            <button
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-neutral-600 transition-colors text-white bg-neutral-700"
              title={isFullscreen ? "Exit fullscreen" : "View in fullscreen"}
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
            <iframe
              src={fileUrl}
              className="w-full h-full border-0"
              title="PDF Document"
            />
            <div className="p-4 bg-white rounded border border-gray-200 h-full">
              <pre className="whitespace-pre-wrap break-words text-sm font-mono">
                {documentContent}
              </pre>
            </div>
          </div>
        );

      // Microsoft Office documents (doc, docx, ppt, pptx, xls, xlsx)
      case ["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(ext):
        return (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="text-center mb-4">
              <FileText
                size={48}
                className={`mx-auto mb-4 ${
                  ext.includes("doc")
                    ? "text-blue-500"
                    : ext.includes("ppt")
                    ? "text-orange-500"
                    : ext.includes("xls")
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              />
              <p className="text-gray-700 font-medium mb-2">
                {ext.toUpperCase()} Document
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Microsoft Office documents cannot be displayed directly in the
                browser
              </p>
            </div>
            <div className="flex space-x-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
              >
                <Download size={16} className="mr-2" />
                Download
              </a>
              <a
                href={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                  `http://localhost:8000/${submission.fileUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
              >
                <ExternalLink size={16} className="mr-2" />
                View in Office Online
              </a>
            </div>
          </div>
        );

      // Default for other file types
      default:
        return (
          <div className="text-center">
            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">{ext.toUpperCase()} file</p>
            <a
              href={fileUrl}
              download
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center"
            >
              <Download size={16} className="mr-2" />
              Download File
            </a>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submission...</p>
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

  if (!submission) {
    return (
      <div className="p-8 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
        <p className="font-medium">Submission not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-6xl mx-auto p-6 ${
        isFullscreen ? "h-screen overflow-hidden" : ""
      }`}
    >
      {/* Header with back button */}
      {!isFullscreen && (
        <div className="mb-6">
          <Link
            href={`/professor/coursework/${courseId}/student_manage/assignments`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Assignment
          </Link>
        </div>
      )}

      {isFullscreen ? (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="w-full h-full">{renderDocument()}</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Document viewer */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <div className="mb-4 border-b pb-4">
              <h1 className="text-xl font-bold mb-2">Submission Details</h1>
              {submission.student && (
                <p className="text-gray-600 mb-1">
                  Student:{" "}
                  <span className="font-medium">
                    {submission.student.name || submission.studentId}
                  </span>
                </p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 h-96 flex flex-col items-center justify-center border border-gray-200 relative">
              {renderDocument()}
            </div>
          </div>

          {/* Right side - Grading and feedback */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Grade Submission</h2>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Grade (0-100)
                </label>
                <input
                  type="number"
                  id="grade"
                  min="0"
                  max="100"
                  value={grade === undefined ? "" : grade}
                  onChange={(e) =>
                    setGrade(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter grade"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide feedback to the student..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-3 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Grading
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
