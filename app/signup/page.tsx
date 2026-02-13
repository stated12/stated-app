"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

    const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
          const [error, setError] = useState("");

            const handleSignup = async (e: any) => {
                e.preventDefault();
                    setError("");

                        // ONLY create auth user
                            const { data, error } = await supabase.auth.signUp({
                                  email,
                                        password,
                                            });

                                                if (error) {
                                                      setError(error.message);
                                                            return;
                                                                }

                                                                    // DO NOT insert into profiles
                                                                        // Trigger handles it automatically

                                                                            router.push("/dashboard");
                                                                              };

                                                                                return (
                                                                                    <div style={{ padding: 20 }}>
                                                                                          <h1>Create your account</h1>

                                                                                                <form onSubmit={handleSignup}>
                                                                                                        <input
                                                                                                                  placeholder="Username"
                                                                                                                            value={username}
                                                                                                                                      onChange={(e) => setUsername(e.target.value)}
                                                                                                                                              />
                                                                                                                                                      <br />
                                                                                                                                                              <input
                                                                                                                                                                        placeholder="Email"
                                                                                                                                                                                  value={email}
                                                                                                                                                                                            onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                                    />
                                                                                                                                                                                                            <br />
                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                              placeholder="Password"
                                                                                                                                                                                                                                        type="password"
                                                                                                                                                                                                                                                  value={password}
                                                                                                                                                                                                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                            <br />
                                                                                                                                                                                                                                                                                    <button type="submit">Create account</button>
                                                                                                                                                                                                                                                                                          </form>

                                                                                                                                                                                                                                                                                                {error && <p style={{ color: "red" }}>{error}</p>}
                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                      }