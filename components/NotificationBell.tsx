"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Notification = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  created_at: string;
  read: boolean;
  notification_type?: string;
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

// ✅ Icon per notification type
function NotifIcon({ type }: { type?: string }) {
  switch (type) {
    case "cheer":
      return (
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 6v4a.5.5 0 00.5.5H4L6.5 13V3L4 5.5H2.5A.5.5 0 002 6z" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M6.5 3.5L12 1.5v13l-5.5-2" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M13.5 5.5c.6.6.8 1.5.8 2.5s-.2 1.9-.8 2.5" stroke="#ea580c" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      );
    case "follow":
      return (
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="6" cy="6" r="2.5" stroke="#10b981" strokeWidth="1.3"/>
            <circle cx="11" cy="6" r="2.5" stroke="#10b981" strokeWidth="1.3"/>
            <path d="M1 14c0-2.8 2.2-5 5-5h4c2.8 0 5 2.2 5 5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      );
    default:
      return (
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2a5 5 0 015 5v2l1 2H2l1-2V7a5 5 0 015-5z" stroke="#4338ca" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M6.5 13a1.5 1.5 0 003 0" stroke="#4338ca" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      );
  }
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Notification update error:", err);
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Bell button */}
      <button onClick={() => setOpen(!open)} className="relative text-xl">
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
            <div className="font-semibold text-gray-900">Notifications</div>
            {unreadCount > 0 && (
              <div className="text-xs text-gray-500">{unreadCount} new</div>
            )}
          </div>

          {/* Empty state */}
          {notifications.length === 0 && (
            <div className="text-sm text-gray-500 py-4 text-center">
              No notifications yet
            </div>
          )}

          {/* Notification list */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.slice(0, 5).map((n) => (
              <Link
                key={n.id}
                href={n.link || "/dashboard"}
                onClick={async () => {
                  if (!n.read) await markRead(n.id);
                  setOpen(false);
                }}
                style={{ textDecoration: "none" }}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
              >
                {/* ✅ Type icon */}
                <NotifIcon type={n.notification_type} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    className={`text-sm ${
                      n.read ? "text-gray-700" : "font-semibold text-gray-900"
                    }`}
                    style={{ lineHeight: 1.4 }}
                  >
                    {n.title}
                  </div>
                  {n.message && (
                    <div
                      className="text-xs text-gray-500 mt-0.5"
                      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {n.message}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-0.5">
                    {timeAgo(n.created_at)}
                  </div>
                </div>

                {!n.read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 ml-1 flex-shrink-0" />
                )}
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
