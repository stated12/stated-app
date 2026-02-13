const { error } = await supabase.auth.signUp({
          email,
            password,
            });

            if (error) {
              setError(error.message);
              } else {
                router.push("/dashboard");
                }