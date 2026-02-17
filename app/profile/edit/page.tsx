export default function EditProfile() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Profile</h1>

      <input
        placeholder="Your name"
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px"
        }}
      />

      <textarea
        placeholder="Your bio"
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px"
        }}
      />

      <button
        style={{
          background: "#2563eb",
          color: "white",
          padding: "10px",
          borderRadius: "6px",
          border: "none"
        }}
      >
        Save
      </button>
    </div>
  );
}
