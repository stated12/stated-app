const handleSignup = async (e) => {
          e.preventDefault();
            setError(null);
              setLoading(true);

                try {
                    // Step 1: Create auth user
                        const { data: authData, error: authError } = await supabase.auth.signUp({
                              email,
                                    password
                                        });

                                            if (authError) {
                                                  setError(authError.message);
                                                        setLoading(false);
                                                              return;
                                                                  }

                                                                      const user = authData.user;

                                                                          if (!user) {
                                                                                setError("Signup failed. Try again.");
                                                                                      setLoading(false);
                                                                                            return;
                                                                                                }

                                                                                                    // Step 2: Insert profile WITH id
                                                                                                        const { error: profileError } = await supabase
                                                                                                              .from("profiles")
                                                                                                                    .insert({
                                                                                                                            id: user.id,                // REQUIRED
                                                                                                                                    username: username,
                                                                                                                                            display_name: username
                                                                                                                                                  });

                                                                                                                                                      if (profileError) {
                                                                                                                                                            setError(profileError.message);
                                                                                                                                                                  setLoading(false);
                                                                                                                                                                        return;
                                                                                                                                                                            }

                                                                                                                                                                                // Step 3: Redirect
                                                                                                                                                                                    window.location.href = "/dashboard";

                                                                                                                                                                                      } catch (err) {
                                                                                                                                                                                          setError("Unexpected error occurred.");
                                                                                                                                                                                            }

                                                                                                                                                                                              setLoading(false);
                                                                                                                                                                                              };
}