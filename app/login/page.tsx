                                                                                                                                            padding: 12,
             "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");

  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <>
            <br /><br />
            <p style={{ color: "red" }}>{error}</p>
          </>
        )}

      </form>

    </div>
  );

}                                                                                                                                                                                                                                                                                                       background: '#000',
                                                                                                                                                                                                                                                                                                                      color: '#fff',
                                                                                                                                                                                                                                                                                                                        border: 'none',
                                                                                                                                                                                                                                                                                                                          borderRadius: 6,
                                                                                                                                                                                                                                                                                                                          }
