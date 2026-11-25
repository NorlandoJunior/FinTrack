
import { useState } from "react";
import { supabase } from "./lib/supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert("Google login failed: " + error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-brand">
          <a href="/" className="auth-logo">
            FinTrack.
          </a>

          <div className="auth-brand-content">
            <span className="auth-eyebrow">
              PERSONAL FINANCE MANAGEMENT
            </span>

            <h1>
              Welcome <span>back.</span>
            </h1>

            <p>
              Take control of your finances and keep moving
              toward your financial goals. Your financial
              journey continues here.
            </p>
          </div>

          <span className="auth-copyright">
            © 2026 FinTrack. All rights reserved.
          </span>
        </section>

        <section className="auth-form-section">
          <div className="auth-form-wrapper">
            <h2>Sign in</h2>

            <p className="auth-description">
              Enter your account details to access your
              financial dashboard.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <button
              type="button"
              className="auth-submit"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </button>

            <p className="auth-switch">
              Don't have an account?{" "}
              <a href="/signup">Create an account</a>
            </p>

            <p className="auth-switch">
              <a href="/">Back to home</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
