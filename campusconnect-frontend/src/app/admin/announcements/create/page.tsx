"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface Professor {
  _id: string;
  name?: string;
  fullName?: string;
}

interface Student {
  _id: string;
  name?: string;
  fullName?: string;
}

interface AnnouncementData {
  title: string;
  description: string;
  recievers: string[];
  redirectUrl?: string;
}

export default function CreateAnnouncementPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedReceivers, setSelectedReceivers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const professorsResponse = await fetch(
          "http://localhost:8000/api/users/professors",
          {
            method: "GET",
          }
        );

        const studentsResponse = await fetch(
          "http://localhost:8000/api/users/students",
          { method: "GET" }
        );

        if (!professorsResponse.ok || !studentsResponse.ok) {
          throw new Error("Failed to fetch users");
        }

        const professorsData = await professorsResponse.json();
        const studentsData = await studentsResponse.json();

        setProfessors(professorsData.professors);
        setStudents(studentsData.students);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        setLoading(false);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleReceiverToggle = (userId: string) => {
    setSelectedReceivers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAllProfessors = () => {
    if (professors.every((prof) => selectedReceivers.includes(prof._id))) {
      // If all professors are selected, unselect them
      setSelectedReceivers((prev) =>
        prev.filter((id) => !professors.some((prof) => prof._id === id))
      );
    } else {
      // Select all professors
      const professorIds = professors.map((prof) => prof._id);
      setSelectedReceivers((prev) => {
        const currentWithoutProfs = prev.filter(
          (id) => !professors.some((prof) => prof._id === id)
        );
        return [...currentWithoutProfs, ...professorIds];
      });
    }
  };

  const handleSelectAllStudents = () => {
    if (students.every((student) => selectedReceivers.includes(student._id))) {
      setSelectedReceivers((prev) =>
        prev.filter((id) => !students.some((student) => student._id === id))
      );
    } else {
      const studentIds = students.map((student) => student._id);
      setSelectedReceivers((prev) => {
        const currentWithoutStudents = prev.filter(
          (id) => !students.some((student) => student._id === id)
        );
        return [...currentWithoutStudents, ...studentIds];
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || selectedReceivers.length === 0) {
      setError(
        "Please fill in all required fields and select at least one receiver."
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    const announcementData: AnnouncementData = {
      title,
      description,
      recievers: selectedReceivers,
    };

    if (redirectUrl) {
      announcementData.redirectUrl = redirectUrl;
    }

    try {
      const response = await fetch("http://localhost:5001/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcementData),
      });

      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }

      setSuccess(true);
      // Reset form
      setTitle("");
      setDescription("");
      setRedirectUrl("");
      setSelectedReceivers([]);
    } catch (err) {
      setError("Failed to create announcement. Please try again.");
      console.error("Error creating announcement:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Announcement
        </h1>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          Announcement created successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description: <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="redirectUrl"
          >
            Redirect URL: <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="url"
            id="redirectUrl"
            value={redirectUrl}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRedirectUrl(e.target.value)
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/resource"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Receivers: <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Professors</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="selectAllProfessors"
                    checked={
                      professors.length > 0 &&
                      professors.every((prof) =>
                        selectedReceivers.includes(prof._id)
                      )
                    }
                    onChange={handleSelectAllProfessors}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllProfessors">Select All</label>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-4">Loading professors...</div>
              ) : professors.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No professors found
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {professors.map((professor) => (
                    <div key={professor._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`prof-${professor._id}`}
                        checked={selectedReceivers.includes(professor._id)}
                        onChange={() => handleReceiverToggle(professor._id)}
                        className="mr-2"
                      />
                      <label htmlFor={`prof-${professor._id}`}>
                        {professor.name ||
                          professor.fullName ||
                          `Professor ${professor._id}`}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Students</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="selectAllStudents"
                    checked={
                      students.length > 0 &&
                      students.every((student) =>
                        selectedReceivers.includes(student._id)
                      )
                    }
                    onChange={handleSelectAllStudents}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllStudents">Select All</label>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-4">Loading students...</div>
              ) : students.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No students found
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {students.map((student) => (
                    <div key={student._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`student-${student._id}`}
                        checked={selectedReceivers.includes(student._id)}
                        onChange={() => handleReceiverToggle(student._id)}
                        className="mr-2"
                      />
                      <label htmlFor={`student-${student._id}`}>
                        {student.name ||
                          student.fullName ||
                          `Student ${student._id}`}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {submitting ? "Creating..." : "Create Announcement"}
          </button>
        </div>
      </form>
    </div>
  );
}
