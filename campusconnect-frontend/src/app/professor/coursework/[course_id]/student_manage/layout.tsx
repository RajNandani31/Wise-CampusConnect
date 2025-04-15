"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const courseId = pathname.split("/")[3];
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/courses/${courseId}`,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await res.json();
        setCourseName(data.courseName);
        return data;
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const tabs = [
    {
      href: `/professor/coursework/${courseId}/student_manage/`,
      label: "Grades",
      icon: "🎓",
    },
    {
      href: `/professor/coursework/${courseId}/student_manage/attendance`,
      label: "Attendance",
      icon: "👥",
    },
    {
      href: `/professor/coursework/${courseId}/student_manage/assignments`,
      label: "Assignments",
      icon: "📄",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Student Management ({courseName})
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href === "/professor/student_manage" &&
              pathname === "/professor/student_manage");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1 px-4 py-2 border rounded-full
                ${
                  isActive
                    ? "bg-[#f1f2f6] text-black font-semibold shadow"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              <span>{tab.icon}</span> {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
