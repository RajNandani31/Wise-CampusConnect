// app/student/courses/courseDetails/layout.tsx
"use client";

import { LayoutDashboard, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const courseId = pathname.split("/")[3];
  const [course, setCourse] = useState(null);
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await fetch(
        `http://localhost:8000/api/courses/${courseId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }
      const data = await response.json();
      console.log(data);
      setCourse(data);
      const professorResponse = await fetch(
        `http://localhost:8000/api/professors/${data.professorId}`
      );
      const data2 = await professorResponse.json();
      console.log(data2);
      setProfessor(data2);
    };
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="bg-[#f9f6f3] min-h-screen p-6 text-[#3d3d3d]">
      <h2 className="text-2xl font-semibold mb-1">
        {course?.courseCode}: {course?.courseName}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{professor?.name}</p>

      <div className="flex space-x-2 mb-4">
        <Link href={`/student/courses/${courseId}`}>
          <Tab
            label="Overview"
            icon={<LayoutDashboard size={16} />}
            active={pathname === `/student/courses/${courseId}`}
          />
        </Link>
        <Link href={`/student/courses/${courseId}/syllabus`}>
          <Tab
            label="Syllabus"
            icon={<Calendar size={16} />}
            active={pathname.includes("syllabus")}
          />
        </Link>
        <Link href={`/student/courses/${courseId}/assignments`}>
          <Tab
            label="Assignments"
            icon={<FileText size={16} />}
            active={pathname.includes("assignments")}
          />
        </Link>
        <Link href={`/student/courses/${courseId}/attendance`}>
          <Tab
            label="Attendance"
            icon={<FileText size={16} />}
            active={pathname.includes("attendance")}
          />
        </Link>
        <Link href={`/student/courses/${courseId}/materials`}>
          <Tab
            label="Materials"
            icon={<FileText size={16} />}
            active={pathname.includes("materials")}
          />
        </Link>
      </div>

      {children}
    </div>
  );
}

function Tab({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-1 px-4 py-2 rounded-t-xl ${
        active ? "bg-[#e6e6ce] text-black" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}
