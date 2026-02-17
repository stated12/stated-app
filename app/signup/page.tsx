                                                                                                                          const { data, error: signupError } = await supabase.auth.signUp({
                "use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      // Sign up user
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("User not created");
        setLoading(false);
        return;
      }

      // Insert profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username: username,
        });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // Go to onboarding
      router.push("/onboarding");

    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>

      <h2>Create account</h2>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

      </form>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

    </div>
  );
}                                                                                                                  email,
                                                                                                                                          password,
                                                                                                                                                });

                                                                                                                                                      if (signupError) {
                                                                                                                                                              setError(signupError.message);
                                                                                                                                                                      setLoading(false);
                                                                                                                                                                              return;
                                                                                                                                                                                    }

                                                                                                                                                                                          const user = data.user;

                                                                                                                                                                                                if (!user) {
                                                                                                                                                                                                        setError("Signup failed");
                                                                                                                                                                                                                setLoading(false);
                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                    // 3. Create profile
                                                                                                                                                                                                                                          const { error: profileError } = await supabase
                                                                                                                                                                                                                                                  .from("profiles")
                                                                                                                                                                                                                                                          .insert({
                                                                                                                                                                                                                                                                    id: user.id,
                                                                                                                                                                                                                                                                              username: username,
                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                            if (profileError) {
                                                                                                                                                                                                                                                                                                    setError(profileError.message);
                                                                                                                                                                                                                                                                                                            setLoading(false);
                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                // 4. Redirect
                                                                                                                                                                                                                                                                                                                                      router.push("/dashboard");

                                                                                                                                                                                                                                                                                                                                          } catch (err: any) {
                                                                                                                                                                                                                                                                                                                                                setError(err.message);
                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                        setLoading(false);
                                                                                                                                                                                                                                                                                                                                                          };

                                                                                                                                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                                                                                                                                <div style={{ maxWidth: 400, margin: "100px auto" }}>
                                                                                                                                                                                                                                                                                                                                                                      <h1>Create account</h1>

                                                                                                                                                                                                                                                                                                                                                                            <form onSubmit={handleSignup}>

                                                                                                                                                                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                                                                                                                                                                                                                        placeholder="Username"
                                                                                                                                                                                                                                                                                                                                                                                                                  value={username}
                                                                                                                                                                                                                                                                                                                                                                                                                            required
                                                                                                                                                                                                                                                                                                                                                                                                                                      onChange={(e) => setUsername(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                style={{ display: "block", marginBottom: 10, width: "100%" }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                        />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          type="email"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    placeholder="Email"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              value={email}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        required
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            style={{ display: "block", marginBottom: 10, width: "100%" }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      type="password"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                placeholder="Password"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          value={password}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    required
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        style={{ display: "block", marginBottom: 10, width: "100%" }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {error && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <p style={{ color: "red" }}>{error}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button type="submit" disabled={loading}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            {loading ? "Creating..." : "Create account"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
