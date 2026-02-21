"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] =
    useState<"idle" | "checking" | "available" | "taken">("idle");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accountType, setAccountType] =
    useState<"individual" | "company">("individual");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  // CHECK USERNAME AVAILABILITY
  useEffect(() => {

    if (!username || username.length < 3) {
      setUsernameStatus("idle");
      return;
    }

    const check = async () => {

      setUsernameStatus("checking");

      const { data } =
        await supabase
          .from("profiles")
          .select("username")
          .eq("username", username.toLowerCase())
          .single();

      if (data) {
        setUsernameStatus("taken");
      } else {
        setUsernameStatus("available");
      }

    };

    const timeout = setTimeout(check, 500);

    return () => clearTimeout(timeout);

  }, [username]);



  async function handleSignup(e: React.FormEvent) {

    e.preventDefault();

    setError("");

    if (usernameStatus !== "available") {
      setError("Username is not available");
      return;
    }

    setLoading(true);

    try {

      // CREATE AUTH USER WITH METADATA
      const { data, error: authError } =
        await supabase.auth.signUp({

          email,
          password,

          options: {
            data: {
              username: username.toLowerCase(),
              display_name: username,
              account_type: accountType,
            },
          },

        });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Signup failed");
        setLoading(false);
        return;
      }

      // ENSURE PROFILE EXISTS (trigger should create it)
      const { error: profileError } =
        await supabase
          .from("profiles")
          .upsert({

            id: user.id,
            username: username.toLowerCase(),
            display_name: username,
            account_type: accountType,
            credits: 0,

          });

      if (profileError) {
        console.error(profileError);
      }

      router.push("/dashboard");

    } catch (err) {

      setError("Unexpected error");

    } finally {

      setLoading(false);

    }

  }



  return (

    <div style={styles.container}>

      <form onSubmit={handleSignup} style={styles.card}>

        <div style={styles.brand}>
          Stated
        </div>

        <div style={styles.tagline}>
          Make commitments. Stay accountable. Build trust publicly.
        </div>



        {/* USERNAME */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          minLength={3}
          onChange={(e) =>
            setUsername(
              e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9_]/g, "")
            )
          }
          style={styles.input}
        />

        <div style={styles.url}>
          stated.app/u/{username || "username"}
        </div>

        <div style={styles.usernameStatus}>

          {usernameStatus === "checking" && "Checking..."}

          {usernameStatus === "available" &&
            <span style={{color:"green"}}>✓ Available</span>}

          {usernameStatus === "taken" &&
            <span style={{color:"red"}}>✗ Already taken</span>}

        </div>



        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />



        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />



        {/* ACCOUNT TYPE */}

        <div style={styles.accountTypeContainer}>

          <button
            type="button"
            onClick={()=>setAccountType("individual")}
            style={{
              ...styles.accountTypeButton,
              background:
                accountType==="individual"
                  ? "#2563eb"
                  : "#eee",
              color:
                accountType==="individual"
                  ? "#fff"
                  : "#000"
            }}
          >
            Individual
          </button>


          <button
            type="button"
            onClick={()=>setAccountType("company")}
            style={{
              ...styles.accountTypeButton,
              background:
                accountType==="company"
                  ? "#2563eb"
                  : "#eee",
              color:
                accountType==="company"
                  ? "#fff"
                  : "#000"
            }}
          >
            Company
          </button>

        </div>



        {/* ERROR */}

        {error &&
          <div style={styles.error}>
            {error}
          </div>
        }



        {/* SUBMIT */}

        <button
          type="submit"
          disabled={
            loading ||
            usernameStatus !== "available"
          }
          style={styles.submit}
        >
          {loading
            ? "Creating..."
            : "Create account"}
        </button>



        <div style={styles.login}>
          Already have account?{" "}
          <span
            onClick={()=>router.push("/login")}
            style={styles.loginLink}
          >
            Login
          </span>
        </div>

      </form>

    </div>

  );

}



const styles:any = {

  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f5f5f5"
  },

  card:{
    width:400,
    background:"#fff",
    padding:32,
    borderRadius:12,
    boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
  },

  brand:{
    fontSize:32,
    fontWeight:"bold",
    color:"#2563eb",
    textAlign:"center",
    marginBottom:8
  },

  tagline:{
    textAlign:"center",
    marginBottom:24,
    color:"#555"
  },

  input:{
    width:"100%",
    padding:12,
    marginBottom:12,
    borderRadius:8,
    border:"1px solid #ddd"
  },

  url:{
    fontSize:12,
    marginBottom:4,
    color:"#666"
  },

  usernameStatus:{
    fontSize:12,
    marginBottom:12
  },

  accountTypeContainer:{
    display:"flex",
    gap:12,
    marginBottom:16
  },

  accountTypeButton:{
    flex:1,
    padding:12,
    borderRadius:8,
    border:"none",
    cursor:"pointer"
  },

  submit:{
    width:"100%",
    padding:14,
    borderRadius:8,
    border:"none",
    background:"#2563eb",
    color:"#fff",
    fontWeight:"bold",
    cursor:"pointer"
  },

  error:{
    color:"red",
    marginBottom:12
  },

  login:{
    textAlign:"center",
    marginTop:16
  },

  loginLink:{
    color:"#2563eb",
    cursor:"pointer",
    fontWeight:"bold"
  }

};
