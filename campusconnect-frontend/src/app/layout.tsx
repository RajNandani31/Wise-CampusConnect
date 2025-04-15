"use client";

import { useEffect } from "react";
import "../styles/globals.css";
import { retryQueuedRequests } from "../lib/retryRequest";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.addEventListener("online", retryQueuedRequests);
    return () => window.removeEventListener("online", retryQueuedRequests);
  }, []);

  return (
    <html lang="en">
      <body className="bg-neutral-50 text-black">{children}</body>
    </html>
  );
}
