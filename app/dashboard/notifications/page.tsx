"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  created_at: string;
  read: boolean;
};

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  }

  async function handleClick(n: Notification) {
    if (!n.read) {
      await markAsRead(n.id);
    }

    if (n.link) {
      router.push(n.link);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">

      <h1 className="text-2xl font-bold">
        Notifications
      </h1>

      {notifications.length === 0 && (
        <div className="text-gray-500">
          No notifications yet.
        </div>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          onClick={() => handleClick(n)}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            n.read
              ? "bg-gray-50 border-gray-200"
              : "bg-white shadow border-blue-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="font-medium">
              {n.title}
            </div>
            {!n.read && (
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>

          <div className="text-sm text-gray-600 mt-1">
            {n.message}
          </div>

          <div className="text-xs text-gray-400 mt-2">
            {new Date(n.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
