import React from "react";
import "./index.css";

// Ícones das funcionalidades
function Icon({ type }) {
  const icons = {
    wallet: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 8h18M16 14h2M6 5V3h12" />
      </>
    ),
    receipt: (
      <>
        <path d="M5 3h14v18l-3-2-4 2-4-2-3 2z" />
        <path d="M8 8h8M8 12h5M8 16h3" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="M12 14v3l2 1" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 3 3 6-7" />
        <path d="M16 6h4v4" />
      </>
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="18" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
      </>
    ),
    future: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M7 14h10M7 17h7" />
      </>
    ),
  };

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[type]}
    </svg>
  );
}

// Componente para os pequenos títulos das seções
function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

function App() {
  const features = [
    {
      icon: "wallet",
      title: "Income management",
      description: "Organize salaries and other sources of income.",
    },
    {
      icon: "receipt",
      title: "Expense tracking",
      description: "Record and categorize your everyday spending.",
    },
    {
      icon: "calendar",
      title: "Installment management",
      description:
        "Track purchases split into installments across future months.",
    },
    {
      icon: "chart",
      title: "Budget monitoring",
      description:
        "Know how much you have spent and how much remains.",
    },
    {
      icon: "dashboard",
      title: "Financial dashboard",
      description: "See your financial situation at a glance.",
    },
    {
      icon: "future",
      title: "Future planning",
      description:
        "Prepare for upcoming payments and recurring expenses.",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <a className="brand" href="#home">
          Fin<span>Track</span>
        </a>

        <nav className="main-nav">
          <a href="#problem">Problem</a>
          <a href="#solution">Solution</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
        </nav>

        <a className="login-button" href="#login">
          <span>Login</span>
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero gradient-section" id="home">
          <div className="hero-copy">
            <h1>Your money, your control.</h1>

            <p>
              Organize your finances, track your expenses, and plan your
              <br className="desktop-break" />
              future with confidence.
            </p>
          </div>
        </section>

        {/* APP IMAGE PLACEHOLDER */}
        <section className="app-preview">
          <div className="image-placeholder">
            <span>APP Image</span>
            <small>
              Replace this placeholder with your app screenshot
            </small>
          </div>
        </section>

        {/* PROBLEM */}
        <section
          className="content-section gradient-section"
          id="problem"
        >
          <div className="section-inner">
            <SectionLabel>Problem</SectionLabel>

            <h2>
              Managing money shouldn't be complicated.
            </h2>

            <p className="section-description">
              Keeping track of income, recurring expenses, and credit
              card installments can be challenging. Without a clear
              overview, it's easy to lose control of your monthly budget.
            </p>
          </div>
        </section>

        {/* SOLUTION */}
        <section
          className="content-section light-section"
          id="solution"
        >
          <div className="section-inner">
            <SectionLabel>Solution</SectionLabel>

            <h2>
              A simpler way to manage your finances.
            </h2>

            <p className="section-description">
              FinTrack brings your financial information together in
              one place, helping you understand your spending,
              organize payments, and make smarter financial decisions.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          className="content-section gradient-section how-section"
          id="how-it-works"
        >
          <div className="section-inner">
            <SectionLabel>How it works</SectionLabel>

            <h2>
              Take control in three simple steps.
            </h2>

            <div className="steps-grid">
              <article className="step">
                <span className="step-number">01</span>

                <div>
                  <h3>Add your transactions</h3>

                  <p>
                    Record your income and expenses, including
                    recurring payments and installments.
                  </p>
                </div>
              </article>

              <article className="step">
                <span className="step-number">02</span>

                <div>
                  <h3>Set your monthly budget</h3>

                  <p>
                    Define your spending limit and monitor how
                    much of your budget you've used.
                  </p>
                </div>
              </article>

              <article className="step">
                <span className="step-number">03</span>

                <div>
                  <h3>Track your financial future</h3>

                  <p>
                    View scheduled installments and recurring
                    expenses to prepare for the months ahead.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          className="features-section light-section"
          id="features"
        >
          <div className="section-inner">
            <SectionLabel>Features</SectionLabel>

            <h2>
              Everything you need in one place.
            </h2>

            <div className="features-grid">
              {features.map((feature) => (
                <article
                  className="feature"
                  key={feature.title}
                >
                  <div className="feature-heading">
                    <Icon type={feature.icon} />

                    <h3>{feature.title}</h3>
                  </div>

                  <p>{feature.description}</p>
                </article>
              ))}
            </div>

            {/* CALL TO ACTION */}
            <div className="cta-card" id="login">
              <h2>
                Start taking control of your finances today.
              </h2>

              <p>
                Build better financial habits with a clearer
                view of your money.
              </p>

              <a className="cta-button" href="#home">
                Create your account
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <a className="footer-brand" href="#home">
          FinTrack
        </a>

        <p>
          © {new Date().getFullYear()} FinTrack. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;