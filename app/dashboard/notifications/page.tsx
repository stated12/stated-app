"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">

      <h1 className="text-2xl font-bold">
        All Notifications
      </h1>

      {notifications.length === 0 && (
        <div className="text-gray-500">
          No notifications yet.
        </div>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl border ${
            n.is_read
              ? "bg-gray-50"
              : "bg-white shadow"
          }`}
        >
          <div className="font-medium">
            {n.title}
          </div>
          <div className="text-sm text-gray-600">
            {n.message}
          </div>
        </div>
      ))}
    </div>
  );
}
