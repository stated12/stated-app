"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
      <div style={{ padding: 20 }}>

            <h1>Dashboard</h1>

                  <div style={{
                          marginTop: 20,
                                  padding: 20,
                                          border: "1px solid #ddd",
                                                  borderRadius: 8
                                                        }}>
                                                                <h2>Commitments</h2>

                                                                        <Link href="/dashboard/create">
                                                                                  <button
                                                                                              style={{
                                                                                                            padding: "10px 16px",
                                                                                                                          backgroundColor: "#2563eb",
                                                                                                                                        color: "white",
                                                                                                                                                      border: "none",
                                                                                                                                                                    borderRadius: 6,
                                                                                                                                                                                  cursor: "pointer"
                                                                                                                                                                                              }}
                                                                                                                                                                                                        >
                                                                                                                                                                                                                    Create Commitment
                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                      </Link>

                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                  }