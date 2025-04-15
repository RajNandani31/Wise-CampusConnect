// src/components/forms/LoginForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const loginRes = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      console.log(loginData);
      if (!loginRes.ok) {
        setError(loginData.msg || "Login failed");
        return; // Clear error message on successful login
      }
      const token = loginData.token;
      localStorage.setItem("token", token);
      const profileRes = await fetch("http://localhost:8000/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await profileRes.json();
      if (!profileRes.ok) {
        setError(profileData.msg || "Failed to fetch profile data");
        return;
      }
      const role = profileData.role;
      router.push(`/${role}`); // Redirect based on role
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
      <div>
        <label className="block mb-1 text-gray-600">Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 ring-[#e6e6e6]"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 ring-[#e6e6e6]"
          required
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember Me
        </label>
        <a href="#" className="hover:underline">
          Forgot Password?
        </a>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        className="mt-2 bg-[#E3E3CB] hover:bg-[#d6d6bb] text-black font-semibold py-2 rounded-md"
      >
        LOGIN
      </button>
    </form>
  );
}
