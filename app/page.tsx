export default function Page() {
      return (
          <div style={{ padding: 40 }}>
                <h1>ENV TEST</h1>
                      <p>
                              {process.env.NEXT_PUBLIC_SUPABASE_URL || "NO ENV FOUND"}
                                    </p>
                                        </div>
                                          );
                                          }