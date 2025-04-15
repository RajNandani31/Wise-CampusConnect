"use client";

import AssignmentList from "@/components/assignmentlist";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const courseId = pathname.split("/")[3]; // Extract course ID from the URL

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          href={`/professor/coursework/${courseId}/student_manage/assignments/create`}
          className="bg-red-800 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Create Assignment
        </Link>
      </div>
      <AssignmentList />
    </div>
  );
}
