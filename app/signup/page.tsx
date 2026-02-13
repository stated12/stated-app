const handleSignup = async (e) => {
          e.preventDefault();
            setError(null);
              setLoading(true);

                // Create auth user
                  const { data, error } = await supabase.auth.signUp({
                      email,
                          password,
                            });

                              if (error) {
                                  setError(error.message);
                                      setLoading(false);
                                          return;
                                            }

                                              if (!data.user) {
                                                  setError("Signup failed");
                                                      setLoading(false);
                                                          return;
                                                            }

                                                              // Insert profile
                                                                const { error: profileError } = await supabase
                                                                    .from("profiles")
                                                                        .insert({
                                                                              id: data.user.id,
                                                                                    username: username,
                                                                                          display_name: username,
                                                                                              });

                                                                                                if (profileError) {
                                                                                                    setError("Database error saving new user");
                                                                                                        setLoading(false);
                                                                                                            return;
                                                                                                              }

                                                                                                                // Redirect
                                                                                                                  router.push("/dashboard");

                                                                                                                    setLoading(false);
                                                                                                                    };
}