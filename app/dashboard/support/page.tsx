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
      headers: {
        "Content-Type": "application/json",
      },
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

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold mb-2">
          Support
        </h1>

        <p className="text-gray-600 text-sm">
          Need help with Stated? You can submit a support request below.
          Please review the FAQs first — many common questions are answered there.
        </p>

      </div>

      {/* SUPPORT FORM */}

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >

          <option value="general">General Question</option>

          <option value="commitment">
            Commitment Issue
          </option>

          <option value="reputation">
            Reputation / Scoring
          </option>

          <option value="billing">
            Billing / Credits
          </option>

          <option value="company">
            Company Account
          </option>

          <option value="technical">
            Technical Problem
          </option>

          <option value="account">
            Account Access Issue
          </option>

          <option value="abuse">
            Report Abuse
          </option>

        </select>

        <textarea
          placeholder={`Describe your issue clearly.

Helpful details to include:
• What happened?
• Which commitment (if relevant)?
• Payment ID (for billing issues)
• Steps to reproduce the problem`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full border rounded px-3 py-2"
        />

        {success && (

          <div className="text-green-600 text-sm">

            Support request submitted successfully.
            Our team typically reviews requests within 24 hours.

          </div>

        )}

        <button
          onClick={submitTicket}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >

          {loading
            ? "Submitting..."
            : "Submit Ticket"}

        </button>

      </div>

      {/* FAQ */}

      <div className="space-y-6">

        <h2 className="text-lg font-semibold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-sm text-gray-700">

          <div>

            <div className="font-medium">
              What is a commitment?
            </div>

            <div>
              A commitment is a public declaration of something you intend
              to complete within a defined time period. Commitments appear
              on your public profile and can be tracked over time.
            </div>

          </div>

          <div>

            <div className="font-medium">
              How is reputation calculated?
            </div>

            <div>
              Reputation reflects your history of completing commitments.
              Successfully completed commitments improve reputation,
              while expired or withdrawn commitments may reduce it.
            </div>

          </div>

          <div>

            <div className="font-medium">
              Why do commitments require credits?
            </div>

            <div>
              Credits help prevent spam and ensure commitments represent
              genuine intent. Each commitment consumes a credit when created.
            </div>

          </div>

          <div>

            <div className="font-medium">
              Why did my commitment expire?
            </div>

            <div>
              Commitments automatically expire when the selected time period
              ends. To maintain reputation, mark the commitment completed
              before the deadline if it was achieved.
            </div>

          </div>

          <div>

            <div className="font-medium">
              Can commitments be edited?
            </div>

            <div>
              Commitments cannot be edited after creation to preserve
              integrity and accountability. If something changes, you can
              withdraw the commitment and create a new one.
            </div>

          </div>

          <div>

            <div className="font-medium">
              Can companies create commitments?
            </div>

            <div>
              Yes. Companies can publish commitments that represent
              organizational goals, initiatives, or announcements.
              These appear on the company's public profile.
            </div>

          </div>

          <div>

            <div className="font-medium">
              What proof is required for completion?
            </div>

            <div>
              When marking a commitment as completed, you may upload
              supporting proof such as screenshots, documents, or links
              showing that the commitment was fulfilled.
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}
