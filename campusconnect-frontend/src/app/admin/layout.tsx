import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-[#f2ede9] shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 text-red-900">Admin Panel</h2>
        <nav className="space-y-4 text-sm">
          <Link href="/admin" className="block hover:text-red-900">
            Dashboard
          </Link>
          <Link href="/admin/users" className="block hover:text-red-900">
            Users
          </Link>
          <Link href="/admin/departments" className="block hover:text-red-900">
            Departments
          </Link>
          <Link href="/admin/courses" className="block hover:text-red-900">
            Courses
          </Link>
          <Link
            href="/admin/announcements"
            className="block hover:text-red-900"
          >
            Announcements
          </Link>
          <Link href="/admin/settings_" className="block hover:text-red-900">
            Settings
          </Link>
          <Link href="/" className="block text-red-700 hover:text-red-800">
            Logout
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-red-800">Hello, Admin</h1>
          <p className="text-sm text-gray-500">Academic Year 2024-25</p>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
