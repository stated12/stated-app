"use client";

import { useState } from "react";

export default function SupportPage() {
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitTicket() {
    if (!message.trim()) return;

    setLoading(true);

    await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        message,
      }),
    });

    setSuccess(true);
    setMessage("");
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10">

      <div>
        <h1 className="text-2xl font-bold mb-2">Support</h1>
        <p className="text-gray-600 text-sm">
          Need help? Submit your issue below and our team will review it.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="general">General Question</option>
          <option value="commitment">Commitment Issue</option>
          <option value="billing">Billing / Credits</option>
          <option value="technical">Technical Problem</option>
          <option value="account">Account Issue</option>
        </select>

        <textarea
          placeholder={`Type your concern below.

Please include:
- What happened?
- Which commitment (if relevant)?
- Screenshots (if billing issue include payment ID)
- Steps to reproduce the issue`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full border rounded px-3 py-2"
        />

        {success && (
          <div className="text-green-600 text-sm">
            Support request submitted successfully.
          </div>
        )}

        <button
          onClick={submitTicket}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>

        <div className="space-y-4 text-sm text-gray-700">

          <div>
            <div className="font-medium">What is a commitment?</div>
            <div>
              A commitment is a public declaration of something you intend to complete
              within a defined time period. It appears on your public profile.
            </div>
          </div>

          <div>
            <div className="font-medium">Why are my credits not reflecting?</div>
            <div>
              If you purchased credits and they are not visible, please include your
              payment ID and a screenshot in your support request.
            </div>
          </div>

          <div>
            <div className="font-medium">Why did my commitment expire?</div>
            <div>
              Commitments automatically expire when the end date passes.
              You can mark it completed before expiry to maintain reputation.
            </div>
          </div>

          <div>
            <div className="font-medium">Can I edit a commitment?</div>
            <div>
              Commitments cannot be edited after creation to preserve integrity.
              You may withdraw and create a new one.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
