import React, { useState } from "react";
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
     installments: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M7 15h3M15 15h2" />
      </>
    ),
    repeat: (
      <>
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11V9a3 3 0 0 1 3-3h15" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v2a3 3 0 0 1-3 3H3" />
      </>
    ),
    reports: (
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9M13 17V5M8 17v-3" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
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


function Dashboard() {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // =========================================
  // INCOME MANAGEMENT - STATES
  // =========================================

  const [incomes, setIncomes] = useState(() => {
    try {
      const savedIncomes = JSON.parse(
        localStorage.getItem("fintrack-incomes")
      );

      return Array.isArray(savedIncomes) ? savedIncomes : [];
    } catch {
      return [];
    }
  });

  const [incomeForm, setIncomeForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // Save income records
  React.useEffect(() => {
    localStorage.setItem("fintrack-incomes", JSON.stringify(incomes));
  }, [incomes]);

  // Calculate total income
  const totalIncome = incomes.reduce(
    (total, income) => total + Number(income.amount),
    0
  );

  // Add income
  function handleAddIncome(event) {
    event.preventDefault();

    const newIncome = {
      id: crypto.randomUUID(),
      ...incomeForm,
    };

    setIncomes((previousIncomes) => [
      ...previousIncomes,
      newIncome,
    ]);

    setIncomeForm({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
    });
  }

  // =========================================
  // NAVIGATION
  // =========================================

  const navigation = [
    { id: "dashboard", label: "Financial Dashboard", icon: "dashboard" },
    { id: "income", label: "Income Management", icon: "wallet" },
    { id: "expenses", label: "Expense Tracking", icon: "receipt" },
    { id: "installments", label: "Installment Management", icon: "installments" },
    { id: "budget", label: "Monthly Budget Management", icon: "chart" },
    { id: "recurring", label: "Recurring Expenses", icon: "repeat" },
    { id: "reports", label: "Financial Reports", icon: "reports" },
  ];

  const currentPage = navigation.find(
    (item) => item.id === activeTab
  );

  return (
    <div
      className={`dashboard-layout ${
        expanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="sidebar-top">
          <a href="/" className="dashboard-brand">
            {expanded ? "FinTrack" : "F"}
          </a>

          <button
            className="sidebar-toggle"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            title={expanded ? "Collapse menu" : "Expand menu"}
          >
            <Icon type="menu" />
          </button>
        </div>

        <nav className="dashboard-navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`sidebar-link ${
                activeTab === item.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
              title={!expanded ? item.label : undefined}
              aria-current={activeTab === item.id ? "page" : undefined}
            >
              <Icon type={item.icon} />

              {expanded && (
                <span>{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {expanded && <span>Personal Finance</span>}
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        <header className="dashboard-topbar">
          <div>
            <span className="dashboard-eyebrow">
              FINTRACK / OVERVIEW
            </span>
            <h1>{currentPage.label}</h1>
          </div>

          <div className="dashboard-user">
            <div className="user-avatar">N</div>
            {expanded && <span>My Account</span>}
          </div>
        </header>

        {/* =====================================
            FINANCIAL DASHBOARD
        ===================================== */}

        {activeTab === "dashboard" ? (

          <section className="dashboard-content">

            <div className="welcome-section">
              <div>
                <h2>Welcome back!</h2>
                <p>
                  Here is an overview of your financial situation.
                </p>
              </div>

              <span className="demo-label">DEMO DATA</span>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="financial-cards">

              <article className="financial-card balance-card">
                <span>Available Balance</span>
                <strong>R$ 4.250,00</strong>
                <small>Income minus expenses</small>
              </article>

              <article className="financial-card">
                <span>Total Income</span>
                <strong>R$ 6.500,00</strong>
                <small>This month</small>
              </article>

              <article className="financial-card">
                <span>Total Expenses</span>
                <strong>R$ 2.250,00</strong>
                <small>This month</small>
              </article>

            </div>

            {/* LOWER CONTENT */}
            <div className="dashboard-grid">

              <article className="dashboard-panel spending-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Monthly Budget</h3>
                    <p>Your spending progress</p>
                  </div>

                  <Icon type="chart" />
                </div>

                <div className="budget-values">
                  <strong>R$ 2.250,00</strong>
                  <span>of R$ 4.000,00</span>
                </div>

                <div className="budget-progress">
                  <div style={{ width: "56.25%" }} />
                </div>

                <div className="budget-footer">
                  <span>56.25% used</span>
                  <strong>R$ 1.750,00 remaining</strong>
                </div>
              </article>

              <article className="dashboard-panel payments-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Upcoming Payments</h3>
                    <p>Your next financial commitments</p>
                  </div>

                  <Icon type="calendar" />
                </div>

                <div className="payment-item">
                  <div>
                    <strong>Credit card installment</strong>
                    <span>November 10</span>
                  </div>
                  <strong>R$ 250,00</strong>
                </div>

                <div className="payment-item">
                  <div>
                    <strong>Internet bill</strong>
                    <span>November 15</span>
                  </div>
                  <strong>R$ 120,00</strong>
                </div>

                <div className="payment-item">
                  <div>
                    <strong>Subscription</strong>
                    <span>November 20</span>
                  </div>
                  <strong>R$ 49,90</strong>
                </div>
              </article>

              <article className="dashboard-panel transactions-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Transactions</h3>
                    <p>Your latest financial activity</p>
                  </div>

                  <Icon type="receipt" />
                </div>

                <div className="transaction-item">
                  <span>Salary</span>
                  <strong className="income-value">
                    + R$ 3.500,00
                  </strong>
                </div>

                <div className="transaction-item">
                  <span>Groceries</span>
                  <strong className="expense-value">
                    - R$ 450,00
                  </strong>
                </div>

                <div className="transaction-item">
                  <span>Transportation</span>
                  <strong className="expense-value">
                    - R$ 180,00
                  </strong>
                </div>
              </article>

            </div>
          </section>

        ) : activeTab === "income" ? (

          /* =====================================
             INCOME MANAGEMENT
          ===================================== */

          <section className="dashboard-content income-content">

            {/* INCOME HEADER */}
            <div className="income-welcome">
              <div>
                <span className="income-eyebrow">
                  FINANCIAL MANAGEMENT
                </span>
                <h2>Manage your income</h2>
                <p>
                  Track and organize the money you receive.
                </p>
              </div>

              <span className="demo-label">
                INCOME MANAGEMENT
              </span>
            </div>

            {/* TOTAL INCOME */}
            <article className="income-summary-card">
              <div className="income-summary-icon">
                <Icon type="wallet" />
              </div>

              <div>
                <span>Total Income</span>

                <strong>
                  {totalIncome.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>

                <small>
                  {incomes.length} income records
                </small>
              </div>
            </article>

            {/* ADD INCOME FORM */}
            <article className="dashboard-panel income-form-panel">

              <div className="income-panel-heading">
                <div>
                  <h3>Add New Income</h3>
                  <p>
                    Enter the details of the income you received.
                  </p>
                </div>

                <span className="income-plus">+</span>
              </div>

              <form
                className="income-form"
                onSubmit={handleAddIncome}
              >

                <div className="income-field">
                  <label htmlFor="income-description">
                    Description
                  </label>

                  <input
                    id="income-description"
                    type="text"
                    placeholder="e.g. Monthly salary"
                    value={incomeForm.description}
                    onChange={(event) =>
                      setIncomeForm({
                        ...incomeForm,
                        description: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="income-field">
                  <label htmlFor="income-amount">
                    Amount (R$)
                  </label>

                  <input
                    id="income-amount"
                    type="number"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    value={incomeForm.amount}
                    onChange={(event) =>
                      setIncomeForm({
                        ...incomeForm,
                        amount: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="income-field">
                  <label htmlFor="income-category">
                    Category
                  </label>

                  <select
                    id="income-category"
                    value={incomeForm.category}
                    onChange={(event) =>
                      setIncomeForm({
                        ...incomeForm,
                        category: event.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Business">Business</option>
                    <option value="Investments">Investments</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="income-field">
                  <label htmlFor="income-date">
                    Date
                  </label>

                  <input
                    id="income-date"
                    type="date"
                    value={incomeForm.date}
                    onChange={(event) =>
                      setIncomeForm({
                        ...incomeForm,
                        date: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="income-form-actions">
                  <button
                    type="submit"
                    className="add-income-button"
                  >
                    + Add Income
                  </button>
                </div>

              </form>
            </article>

            {/* INCOME RECORDS */}
            <article className="dashboard-panel income-records-panel">

              <div className="income-panel-heading">
                <div>
                  <h3>Income Records</h3>
                  <p>
                    All your registered income transactions.
                  </p>
                </div>

                <Icon type="receipt" />
              </div>

              {incomes.length > 0 ? (

                <div className="income-record-list">

                  {[...incomes]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((income) => (

                      <div
                        className="income-record"
                        key={income.id}
                      >

                        <div className="income-record-icon">
                          <Icon type="wallet" />
                        </div>

                        <div className="income-record-info">
                          <strong>
                            {income.description}
                          </strong>

                          <span>
                            {income.category} ·{" "}
                            {new Date(
                              `${income.date}T12:00:00`
                            ).toLocaleDateString("pt-BR")}
                          </span>
                        </div>

                        <strong className="income-record-amount">
                          +{" "}
                          {Number(income.amount).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </strong>

                      </div>
                    ))}

                </div>

              ) : (

                <div className="income-empty-state">
                  <Icon type="wallet" />
                  <h4>No income records yet</h4>
                  <p>
                    Your registered income transactions will appear here.
                  </p>
                </div>

              )}

            </article>

          </section>

        ) : (

          /* =====================================
             OTHER SECTIONS - UNDER DEVELOPMENT
          ===================================== */

          <section className="dashboard-content">
            <div className="dashboard-panel coming-soon">

              <div className="coming-soon-icon">
                <Icon type={currentPage.icon} />
              </div>

              <h2>{currentPage.label}</h2>

              <p>
                This section is part of the FinTrack project.
                Its functionality will be implemented in upcoming development stages.
              </p>

              <span className="demo-label">
                UNDER DEVELOPMENT
              </span>

            </div>
          </section>

        )}

      </main>
    </div>
  );
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

  // Display the dashboard on the /dashboard route
  if (window.location.pathname === "/dashboard") {
    return <Dashboard />;
  }

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

        <a className="login-button" href="/dashboard">
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

              <a className="cta-button" href="/dashboard">
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