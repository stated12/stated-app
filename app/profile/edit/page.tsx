export default function EditProfile() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Profile</h1>

      <div style={{ marginTop: "20px" }}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Your name"
          style={{
            display: "block",
            marginTop: "5px",
            marginBottom: "15px",
            padding: "8px",
            width: "100%",
            maxWidth: "400px"
          }}
        />

        <label>Bio</label>
        <textarea
          placeholder="Your bio"
          style={{
            display: "block",
            marginTop: "5px",
            marginBottom: "15px",
            padding: "8px",
            width: "100%",
            maxWidth: "400px"
          }}
        />

        <button
          style={{
            background: "#2563eb",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            border: "none"
          }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
