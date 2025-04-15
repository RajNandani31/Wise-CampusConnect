// src/app/login/page.tsx
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FBF7F4] text-[#333] p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        {/* Left side - Branding */}
        <div className="bg-[#E3E3CB]  p-8 md:p-12 flex flex-col justify-center items-center md:items-start md:w-1/2">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              CampusConnect
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Empowering education through seamless connectivity
            </p>

            <div className="relative h-64 w-full"></div>

            <p className="mt-8 text-sm opacity-75">
              The Heritage University's official student portal
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <div className="mb-8 flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <h2 className="text-xl font-semibold text-[#8B0000]">
              The Heritage University
            </h2>
          </div>

          <h3 className="text-xl font-medium mb-6">
            Welcome to the College Portal
          </h3>

          <LoginForm />

          <div className="mt-8 p-4 bg-[#F4F7FA] rounded-lg text-sm">
            <p className="mb-3 text-gray-500 text-center">
              Multi user login system
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white border rounded-lg p-2 text-center">
                <strong>Student</strong>
                <br />
                student email id
                <br />
                password
              </div>
              <div className="bg-white border rounded-lg p-2 text-center">
                <strong>Professor</strong>
                <br />
                professor email id
                <br />
                password
              </div>
              <div className="bg-white border rounded-lg p-2 text-center">
                <strong>Admin</strong>
                <br />
                admin email id
                <br />
                password
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-xs text-gray-400 absolute bottom-4 flex gap-6 justify-center">
        <a href="#" className="hover:text-[#8B0000]">
          Support
        </a>
        <a href="#" className="hover:text-[#8B0000]">
          Terms of Use
        </a>
        <a href="#" className="hover:text-[#8B0000]">
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}
