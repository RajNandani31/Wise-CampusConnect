"use client";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FBF7F4] text-gray-900">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col md:block overflow-y-auto ">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <h2 className="text-xl font-bold text-[#8B0000]">CampusConnect</h2>
          </div>
        </div>

        <div className="flex-1 p-4">
          <p className="text-sm font-medium text-gray-500 px-2 mb-4">
            MAIN MENU
          </p>

          <nav className="space-y-1 text-sm">
            <Link
              href="/student"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FA] text-gray-700 hover:text-[#8B0000] font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/student/courses"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FA] text-gray-700 hover:text-[#8B0000] font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Courses
            </Link>

            <Link
              href="/student/notifications"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FA] text-gray-700 hover:text-[#8B0000] font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Notifications
            </Link>

            <p className="text-sm font-medium text-gray-500 px-2 my-4">
              ACCOUNT
            </p>

            <Link
              href=""
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FA] text-gray-700 hover:text-[#8B0000] font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              Profile
            </Link>

            <Link
              href="/professor/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FA] text-gray-700 hover:text-[#8B0000] font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#F4F7FA] text-[#8B0000] hover:bg-[#f0e6e6] font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-[#8B0000]">
              Welcome Student
            </h1>
            <span className="block h-1.5 w-1.5 rounded-full bg-green-500 ml-2"></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="block text-right text-xs text-gray-500">
                Academic Year
              </span>
              <span className="font-medium">2024-25</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#8B0000] text-white flex items-center justify-center">
              <span className="font-medium">S</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-[#FBF7F4]">{children}</main>
      </div>
    </div>
  );
}
