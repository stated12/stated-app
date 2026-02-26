export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">

        <div className="text-5xl font-bold text-gray-900 mb-4">
          Account doesn't exist
        </div>

        <div className="text-gray-600 mb-8">
          The profile you’re looking for may have been deleted
          or never existed.
        </div>

        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </a>

      </div>
    </div>
  );
}
