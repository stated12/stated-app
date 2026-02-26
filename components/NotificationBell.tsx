"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data);
  }

  async function markRead(id: string) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  }

  const unreadCount = notifications.filter(
    (n) => !n.is_read
  ).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50">
          <div className="font-semibold mb-3">
            Notifications
          </div>

          {notifications.slice(0, 5).length === 0 && (
            <div className="text-sm text-gray-500">
              No notifications yet.
            </div>
          )}

          {notifications.slice(0, 5).map((n) => (
            <div
              key={n.id}
              className={`mb-3 text-sm ${
                n.is_read ? "text-gray-500" : "font-medium"
              }`}
            >
              <Link
                href={n.link || "#"}
                onClick={() => markRead(n.id)}
              >
                {n.title}
              </Link>
            </div>
          ))}

          <Link
            href="/dashboard/notifications"
            className="text-blue-600 text-sm"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
