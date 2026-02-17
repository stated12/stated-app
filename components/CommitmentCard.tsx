"use client";

type Commitment = {
  id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
};

export default function CommitmentCard({ commitment }: { commitment: Commitment }) {
  const start = new Date(commitment.start_date).toLocaleDateString();
  const end = new Date(commitment.end_date).toLocaleDateString();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full max-w-md mx-auto">

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {commitment.title}
      </h3>

      {/* Status */}
      <div className="flex justify-between items-center mb-2">

        <span className={`text-sm px-3 py-1 rounded-full ${
          commitment.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}>
          {commitment.status}
        </span>

      </div>

      {/* Dates */}
      <p className="text-sm text-gray-500">
        {start} → {end}
      </p>

    </div>
  );
}
