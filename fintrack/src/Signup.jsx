
import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-brand">
          <a href="/" className="auth-logo">
            FinTrack
          </a>

          <div className="auth-brand-content">
            <span className="auth-eyebrow">PERSONAL FINANCE MANAGEMENT</span>

            <h1>
              Take control of your
              <span> financial future.</span>
            </h1>

            <p>
              Organize your finances, track your expenses, and make
              smarter financial decisions with FinTrack.
            </p>
          </div>

          <span className="auth-copyright">
            © 2026 FinTrack. All rights reserved.
          </span>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <span className="auth-eyebrow">GET STARTED</span>

            <h2>Create your account</h2>

            <p className="auth-description">
              Join FinTrack and start managing your money better.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <button type="submit" className="auth-submit">
                Create account
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
