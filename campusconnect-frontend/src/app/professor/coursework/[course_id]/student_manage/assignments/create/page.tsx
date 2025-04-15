"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // <-- Import useRouter

export default function CreateAssignmentForm() {
  const router = useRouter(); // <-- Initialize router
  const pathname = usePathname();
  const courseId = pathname.split("/")[3]; // Extract course ID from the URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class: "",
    dueDate: "",
    dueTime: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      courseId: courseId,
      title: formData.title,
      description: formData.description,
      class: formData.class,
      dueDate: `${formData.dueDate} ${formData.dueTime}`,
    };

    try {
      const res = await fetch(
        "http://localhost:8000/api/assignment/createAssignment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to create assignment");

      alert("✅ Assignment created!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        class: "",
        dueDate: "",
        dueTime: "",
      });

      // Optionally navigate back to assignments page
      router.push(
        `/professor/coursework/${courseId}/student_manage/assignments`
      );
    } catch (err: any) {
      console.error(err);
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() =>
          router.push(
            `/professor/coursework/${courseId}/student_manage/assignments`
          )
        }
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Assignments
      </button>

      <h2 className="text-xl font-bold mb-4">📝 Create New Assignment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Operating Systems Assignment 3"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full px-4 py-2 border rounded"
            value={formData.description}
            onChange={handleChange}
            placeholder="Details, instructions, or references..."
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Class</label>
            <input
              type="text"
              name="class"
              className="w-full px-4 py-2 border rounded"
              value={formData.class}
              onChange={handleChange}
              placeholder="e.g. CSE - 2025"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="w-full px-4 py-2 border rounded"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">Time</label>
            <input
              type="time"
              name="dueTime"
              className="w-full px-4 py-2 border rounded"
              value={formData.dueTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
}
