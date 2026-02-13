const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
            password
            });

            if (authError) {
              setError(authError.message);
                return;
                }

                const user = authData.user;

                const { error: profileError } = await supabase
                  .from("profiles")
                    .insert({
                        id: user.id,
                            username: username,
                                display_name: username
                                  });

                                  if (profileError) {
                                    setError(profileError.message);
                                      return;
                                      }

                                      window.location.href = "/dashboard";
})