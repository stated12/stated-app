"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Notification = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  created_at: string;
  is_read: boolean;
};

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationBell() {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    function handleClickOutside(event: any) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  async function fetchNotifications() {

    try {

      const res = await fetch("/api/notifications");

      if (!res.ok) return;

      const data = await res.json();

      setNotifications(data || []);

    } catch (err) {

      console.error("Bell fetch error:", err);

    }

  }

  async function markRead(id: string) {

    try {

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

    } catch (err) {

      console.error("Notification update error:", err);

    }

  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (

    <div className="relative" ref={dropdownRef}>

      {/* Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-xl"
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}

      </button>


      {/* Dropdown */}
      {open && (

        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl p-4 z-50 border">

          {/* Header */}
          <div className="flex justify-between items-center mb-3">

            <div className="font-semibold text-gray-900">
              Notifications
            </div>

            {unreadCount > 0 && (
              <div className="text-xs text-gray-500">
                {unreadCount} new
              </div>
            )}

          </div>


          {/* Empty state */}
          {notifications.length === 0 && (
            <div className="text-sm text-gray-500 py-4 text-center">
              No notifications yet
            </div>
          )}


          {/* Notification list */}
          <div className="space-y-3 max-h-80 overflow-y-auto">

            {notifications.slice(0,5).map((n) => (

              <Link
                key={n.id}
                href={n.link || "/dashboard"}
                onClick={() => {
                  markRead(n.id);
                  setOpen(false);
                }}
                className="block p-3 rounded-lg hover:bg-gray-50 transition"
              >

                <div className="flex justify-between items-start">

                  <div className="flex-1">

                    <div
                      className={`text-sm ${
                        n.is_read
                          ? "text-gray-700"
                          : "font-semibold text-gray-900"
                      }`}
                    >
                      {n.title}
                    </div>

                    {n.message && (
                      <div className="text-xs text-gray-500 mt-1">
                        {n.message}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-1">
                      {timeAgo(n.created_at)}
                    </div>

                  </div>

                  {!n.is_read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-2"></span>
                  )}

                </div>

              </Link>

            ))}

          </div>


          {/* View all */}
          <Link
            href="/dashboard/notifications"
            onClick={() => setOpen(false)}
            className="block text-center text-sm text-blue-600 mt-4 hover:underline"
          >
            View all
          </Link>

        </div>

      )}

    </div>

  );

}
