"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Notification {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  redirectUrl?: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5001/api/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(response.data.notifications);
        setError(null);
      } catch (err) {
        setError("Failed to fetch notifications. Please try again later.");
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} at ${hours}:${minutes}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Notifications
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-800"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-800 p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            No notifications available at this time.
          </p>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="space-y-4">
          {notifications.map((notification: Notification) => (
            <div
              key={notification._id}
              className="bg-white border-l-4 border-red-800 rounded-lg shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {notification.title}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {notification.description}
                </p>

                <div className="flex justify-end mt-2">
                  {notification.redirectUrl && (
                    <a
                      href={notification.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-red-800 hover:bg-red-900 text-white text-sm font-medium px-4 py-1 rounded transition-colors duration-200"
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
