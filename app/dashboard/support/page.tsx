"use client";

import { useState } from "react";

export default function SupportPage() {
  const [subject, setSubject] = useState("Reputation & Scoring Issue");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function getHelperText(selected: string) {
    switch (selected) {
      case "Billing & Subscription":
        return `Type your concern clearly.

If this relates to a payment, include:
• Email used for payment
• Payment date and time
• Payment method
• Payment reference ID (if available)`;

      case "Commitment Issue":
        return `Type your concern clearly.

If this relates to a specific commitment, include:
• Commitment text
• Deadline
• Current status shown`;

      case "Reputation & Scoring Issue":
        return `Type your concern clearly.

If you believe your score is incorrect, include:
• Commitment text (if relevant)
• Current score displayed
• Expected outcome`;

      case "Company & Member Access":
        return `Type your concern clearly.

If this relates to company access, include:
• Company name
• Role (owner/admin/member)
• Description of the issue`;

      case "Technical Bug":
        return `Type your concern clearly.

Include:
• Page where issue occurred
• What you expected to happen
• What actually happened`;

      case "Account & Access":
        return `Type your concern clearly.

Include:
• Email used for account
• Description of access issue`;

      case "Report Integrity Concern":
        return `Type your concern clearly.

If reporting misuse or integrity concerns, include:
• Username or company involved
• Description of the concern
• Any relevant details`;

      default:
        return `Type your concern clearly and include relevant details.`;
    }
  }

  async function handleSubmit() {
    setError("");
    setSuccess(false);

    if (!message.trim()) {
      setError("Please describe your issue.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request.");
      }

      setSuccess(true);
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">

      <h1 className="text-2xl font-bold">Support</h1>

      {/* FAQ SECTION */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="font-semibold text-lg">Frequently Asked Questions</h2>

        <div>
          <div className="font-medium">How is reputation calculated?</div>
          <div className="text-sm text-gray-600">
            Reputation is based on your commitment history.
            Completed commitments increase your score.
            Withdrawn commitments reduce it.
            Higher completion rates receive a bonus adjustment.
            The same logic applies equally to all users.
          </div>
        </div>

        <div>
          <div className="font-medium">What happens when a deadline passes?</div>
          <div className="text-sm text-gray-600">
            If a commitment reaches its end date and is not marked completed,
            it is automatically marked as expired. Expired commitments may
            impact your reputation score.
          </div>
        </div>

        <div>
          <div className="font-medium">Why can’t commitments be edited?</div>
          <div className="text-sm text-gray-600">
            Commitment text and duration cannot be edited after creation.
            This preserves the integrity of the public record and prevents
            retroactive modification.
          </div>
        </div>

        <div>
          <div className="font-medium">How do billing and credits work?</div>
          <div className="text-sm text-gray-600">
            Credits are deducted when a commitment is created.
            If a payment succeeds but credits are not updated,
            submit a billing request with payment details.
          </div>
        </div>

        <div>
          <div className="font-medium">Can commitments be deleted?</div>
          <div className="text-sm text-gray-600">
            Public commitments cannot be deleted.
            They can only change status. This ensures historical
            consistency and credibility.
          </div>
        </div>

        <div>
          <div className="font-medium">What if I believe something is incorrect?</div>
          <div className="text-sm text-gray-600">
            Submit a support request under the appropriate category.
            All disputes are reviewed manually.
          </div>
        </div>
      </div>

      {/* SUPPORT FORM */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="font-semibold text-lg">Submit a Request</h2>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option>Reputation & Scoring Issue</option>
          <option>Commitment Issue</option>
          <option>Billing & Subscription</option>
          <option>Company & Member Access</option>
          <option>Technical Bug</option>
          <option>Account & Access</option>
          <option>Report Integrity Concern</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder={getHelperText(subject)}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full border rounded px-3 py-2 whitespace-pre-line"
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm">
            Your request has been recorded. Support typically responds within 24–48 hours.
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
