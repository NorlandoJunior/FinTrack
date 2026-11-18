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
  const [editingIncomeId, setEditingIncomeId] = useState(null);

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = JSON.parse(
        localStorage.getItem("fintrack-expenses")
      );

      return Array.isArray(savedExpenses) ? savedExpenses : [];
    } catch {
      return [];
    }
  });

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = Number(localStorage.getItem("fintrack-monthly-budget"));
    return Number.isFinite(savedBudget) && savedBudget > 0 ? savedBudget : 0;
  });
  const [budgetForm, setBudgetForm] = useState(() => {
    const savedBudget = Number(localStorage.getItem("fintrack-monthly-budget"));
    return Number.isFinite(savedBudget) && savedBudget > 0
      ? String(savedBudget)
      : "";
  });
  const [scheduledPayments, setScheduledPayments] = useState(() => {
    try {
      const savedPayments = JSON.parse(
        localStorage.getItem("fintrack-scheduled-payments")
      );

      return Array.isArray(savedPayments) ? savedPayments : [];
    } catch {
      return [];
    }
  });

  const [installmentPurchases, setInstallmentPurchases] = useState(() => {
    try {
      const savedPurchases = JSON.parse(
        localStorage.getItem("fintrack-installments")
      );
      return Array.isArray(savedPurchases) ? savedPurchases : [];
    } catch {
      return [];
    }
  });

  // Save income records
  React.useEffect(() => {
    localStorage.setItem("fintrack-incomes", JSON.stringify(incomes));
  }, [incomes]);

  React.useEffect(() => {
    localStorage.setItem("fintrack-expenses", JSON.stringify(expenses));
  }, [expenses]);

  React.useEffect(() => {
    localStorage.setItem("fintrack-monthly-budget", String(monthlyBudget));
  }, [monthlyBudget]);

  React.useEffect(() => {
    localStorage.setItem(
      "fintrack-scheduled-payments",
      JSON.stringify(scheduledPayments)
    );
  }, [scheduledPayments]);

  React.useEffect(() => {
    localStorage.setItem(
      "fintrack-installments",
      JSON.stringify(installmentPurchases)
    );
  }, [installmentPurchases]);

  // Calculate total income
  const totalIncome = incomes.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;
  const today = `${currentMonth}-${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}`;
  const currentMonthIncomes = incomes.filter((income) =>
    income.date.startsWith(currentMonth)
  );
  const currentMonthExpenses = expenses.filter((expense) =>
    expense.date.startsWith(currentMonth)
  );
  const monthlyIncomeTotal = currentMonthIncomes.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
  const monthlyExpenseTotal = currentMonthExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );
  const remainingBudget = monthlyBudget - monthlyExpenseTotal;
  const budgetProgress = monthlyBudget
    ? Math.min((monthlyExpenseTotal / monthlyBudget) * 100, 100)
    : 0;
  const upcomingPayments = scheduledPayments
    .filter((payment) => payment.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const recentTransactions = [
    ...incomes.map((income) => ({ ...income, type: "income" })),
    ...expenses.map((expense) => ({ ...expense, type: "expense" })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  function handleSaveBudget(event) {
    event.preventDefault();
    setMonthlyBudget(Number(budgetForm));
  }

  function resetIncomeForm() {
    setIncomeForm({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setEditingIncomeId(null);
  }

  function handleAddIncome(event) {
    event.preventDefault();

    if (editingIncomeId) {
      setIncomes((previousIncomes) =>
        previousIncomes.map((income) =>
          income.id === editingIncomeId
            ? { ...income, ...incomeForm }
            : income
        )
      );
    } else {
      setIncomes((previousIncomes) => [
        ...previousIncomes,
        { id: crypto.randomUUID(), ...incomeForm },
      ]);
    }

    resetIncomeForm();
  }

  function handleEditIncome(income) {
    setIncomeForm({
      amount: income.amount,
      description: income.description,
      category: income.category,
      date: income.date,
    });
    setEditingIncomeId(income.id);
    document.getElementById("income-description")?.focus();
  }

  function handleDeleteIncome(incomeId) {
    if (!window.confirm("Delete this income? This action cannot be undone.")) {
      return;
    }

    setIncomes((previousIncomes) =>
      previousIncomes.filter((income) => income.id !== incomeId)
    );

    if (editingIncomeId === incomeId) {
      resetIncomeForm();
    }
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
    { id: "upcoming", label: "Upcoming Payments", icon: "calendar" },
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

              <span className="demo-label">THIS MONTH</span>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="financial-cards">

              <article className="financial-card balance-card">
                <span>Available Balance</span>
                <strong>
                  {(monthlyIncomeTotal - monthlyExpenseTotal).toLocaleString(
                    "pt-BR",
                    { style: "currency", currency: "BRL" }
                  )}
                </strong>
                <small>Income minus expenses this month</small>
              </article>

              <article className="financial-card">
                <span>Total Income</span>
                <strong>
                  {monthlyIncomeTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <small>This month</small>
              </article>

              <article className="financial-card">
                <span>Total Expenses</span>
                <strong>
                  {monthlyExpenseTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
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
                  <strong>
                    {monthlyExpenseTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <span>
                    {monthlyBudget
                      ? `of ${monthlyBudget.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}`
                      : "spent this month"}
                  </span>
                </div>

                {monthlyBudget > 0 && (
                  <div
                    className={`budget-progress ${
                      remainingBudget < 0 ? "over-budget" : ""
                    }`}
                    role="progressbar"
                    aria-label="Monthly budget used"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={Math.round(budgetProgress)}
                  >
                    <div style={{ width: `${budgetProgress}%` }} />
                  </div>
                )}

                <div className="budget-footer">
                  <span>
                    {monthlyBudget
                      ? `${((monthlyExpenseTotal / monthlyBudget) * 100).toFixed(
                          1
                        )}% used`
                      : "No monthly limit set"}
                  </span>
                  <strong
                    className={remainingBudget < 0 ? "over-budget-text" : ""}
                  >
                    {monthlyBudget
                      ? `${remainingBudget.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })} ${remainingBudget < 0 ? "over budget" : "remaining"}`
                      : "Set a budget limit"}
                  </strong>
                </div>
                <button
                  type="button"
                  className="panel-link-button"
                  onClick={() => setActiveTab("budget")}
                >
                  Manage monthly budget
                </button>
              </article>

              <article className="dashboard-panel payments-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Upcoming Payments</h3>
                    <p>Your next financial commitments</p>
                  </div>

                  <Icon type="calendar" />
                </div>

                {upcomingPayments.length > 0 ? (
                  upcomingPayments.slice(0, 4).map((payment) => (
                    <div className="payment-item" key={payment.id}>
                      <div>
                        <strong>{payment.description}</strong>
                        <span>
                          {new Date(
                            `${payment.date}T12:00:00`
                          ).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <strong>
                        {Number(payment.amount).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                    </div>
                  ))
                ) : (
                  <p className="panel-empty-message">
                    No upcoming payments scheduled.
                  </p>
                )}
                <button
                  type="button"
                  className="panel-link-button"
                  onClick={() => setActiveTab("upcoming")}
                >
                  Manage upcoming payments
                </button>
              </article>

              <article className="dashboard-panel transactions-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Transactions</h3>
                    <p>Your latest financial activity</p>
                  </div>

                  <Icon type="receipt" />
                </div>

                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <div className="transaction-item" key={transaction.id}>
                      <span>
                        {transaction.description} ·{" "}
                        {new Date(
                          `${transaction.date}T12:00:00`
                        ).toLocaleDateString("pt-BR")}
                      </span>
                      <strong
                        className={
                          transaction.type === "income"
                            ? "income-value"
                            : "expense-value"
                        }
                      >
                        {transaction.type === "income" ? "+" : "−"}{" "}
                        {Number(transaction.amount).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                    </div>
                  ))
                ) : (
                  <p className="panel-empty-message">
                    Your recent transactions will appear here.
                  </p>
                )}
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
                  <h3>{editingIncomeId ? "Edit Income" : "Add New Income"}</h3>
                  <p>
                    {editingIncomeId
                      ? "Update the details of this income."
                      : "Enter the details of the income you received."}
                  </p>
                </div>

                <span className="income-plus">
                  {editingIncomeId ? "✎" : "+"}
                </span>
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

                <div className="income-form-actions expense-form-actions">
                  {editingIncomeId && (
                    <button
                      type="button"
                      className="cancel-expense-button"
                      onClick={resetIncomeForm}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="add-income-button"
                  >
                    {editingIncomeId ? "Save Changes" : "+ Add Income"}
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

                        <div className="expense-record-actions income-record-actions">
                          <button
                            type="button"
                            onClick={() => handleEditIncome(income)}
                            aria-label={`Edit ${income.description}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteIncome(income.id)}
                            aria-label={`Delete ${income.description}`}
                          >
                            Delete
                          </button>
                        </div>

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

        ) : activeTab === "expenses" ? (

          <ExpenseManagement
            expenses={expenses}
            setExpenses={setExpenses}
          />

        ) : activeTab === "installments" ? (

          <InstallmentManagement
            purchases={installmentPurchases}
            setPurchases={setInstallmentPurchases}
            today={today}
          />

        ) : activeTab === "budget" ? (

          <BudgetManagement
            budgetForm={budgetForm}
            setBudgetForm={setBudgetForm}
            monthlyBudget={monthlyBudget}
            monthlyExpenseTotal={monthlyExpenseTotal}
            remainingBudget={remainingBudget}
            budgetProgress={budgetProgress}
            onSaveBudget={handleSaveBudget}
          />

        ) : activeTab === "upcoming" ? (

          <UpcomingPaymentsManagement
            payments={scheduledPayments}
            setPayments={setScheduledPayments}
            today={today}
          />

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

function BudgetManagement({
  budgetForm,
  setBudgetForm,
  monthlyBudget,
  monthlyExpenseTotal,
  remainingBudget,
  budgetProgress,
  onSaveBudget,
}) {
  return (
    <section className="dashboard-content income-content">
      <div className="income-welcome">
        <div>
          <span className="income-eyebrow">FINANCIAL PLANNING</span>
          <h2>Monthly budget</h2>
          <p>Set a spending limit and keep track of what remains.</p>
        </div>
        <span className="demo-label">BUDGET MANAGEMENT</span>
      </div>

      <article className="income-summary-card budget-summary-card">
        <div className="income-summary-icon">
          <Icon type="chart" />
        </div>
        <div>
          <span>Spent this month</span>
          <strong>
            {monthlyExpenseTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
          <small>
            {monthlyBudget > 0
              ? `of ${monthlyBudget.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })} monthly limit`
              : "Set a limit to start tracking your budget"}
          </small>
        </div>
      </article>

      {monthlyBudget > 0 && (
        <article className="dashboard-panel budget-detail-panel">
          <div className="panel-heading">
            <div>
              <h3>Budget progress</h3>
              <p>Based on your expenses recorded this month.</p>
            </div>
            <Icon type="chart" />
          </div>
          <div
            className={`budget-progress ${
              remainingBudget < 0 ? "over-budget" : ""
            }`}
            role="progressbar"
            aria-label="Monthly budget used"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(budgetProgress)}
          >
            <div style={{ width: `${budgetProgress}%` }} />
          </div>
          <div className="budget-footer">
            <span>
              {((monthlyExpenseTotal / monthlyBudget) * 100).toFixed(1)}% used
            </span>
            <strong
              className={remainingBudget < 0 ? "over-budget-text" : ""}
            >
              {remainingBudget.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
              {remainingBudget < 0 ? "over budget" : "remaining"}
            </strong>
          </div>
        </article>
      )}

      <article className="dashboard-panel income-form-panel">
        <div className="income-panel-heading">
          <div>
            <h3>{monthlyBudget > 0 ? "Update monthly limit" : "Set monthly limit"}</h3>
            <p>This limit is used to measure your spending each month.</p>
          </div>
          <span className="income-plus">+</span>
        </div>
        <form className="income-form budget-form" onSubmit={onSaveBudget}>
          <div className="income-field">
            <label htmlFor="monthly-budget">Monthly spending limit (R$)</label>
            <input
              id="monthly-budget"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="e.g. 4000.00"
              value={budgetForm}
              onChange={(event) => setBudgetForm(event.target.value)}
              required
            />
          </div>
          <div className="income-form-actions">
            <button type="submit" className="add-income-button">
              Save monthly limit
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}


function InstallmentManagement({ purchases, setPurchases, today }) {
  const createEmptyForm = () => ({
    description: "",
    totalAmount: "",
    installmentsCount: "2",
    firstPaymentDate: today,
    paymentMethod: "Credit card",
  });
  const [purchaseForm, setPurchaseForm] = useState(createEmptyForm);
  const [editingPurchaseId, setEditingPurchaseId] = useState(null);

  const formatCurrency = (value) =>
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  // Add each month without allowing dates such as January 31 to skip a month.
  function addMonths(dateString, monthsToAdd) {
    const [year, month, day] = dateString.split("-").map(Number);
    const targetMonth = month - 1 + monthsToAdd;
    const targetYear = year + Math.floor(targetMonth / 12);
    const normalizedMonth = ((targetMonth % 12) + 12) % 12;
    const lastDay = new Date(targetYear, normalizedMonth + 1, 0).getDate();
    const safeDay = Math.min(day, lastDay);
    return `${targetYear}-${String(normalizedMonth + 1).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`;
  }

  function buildInstallments(purchase) {
    const count = Number(purchase.installmentsCount);
    const totalCents = Math.round(Number(purchase.totalAmount) * 100);
    const baseCents = Math.floor(totalCents / count);
    const remainder = totalCents - baseCents * count;

    return Array.from({ length: count }, (_, index) => ({
      number: index + 1,
      amount: (baseCents + (index < remainder ? 1 : 0)) / 100,
      date: addMonths(purchase.firstPaymentDate, index),
      paid: (purchase.paidInstallments || []).includes(index + 1),
    }));
  }

  const allInstallments = purchases.flatMap((purchase) =>
    buildInstallments(purchase).map((installment) => ({
      ...installment,
      purchaseId: purchase.id,
      description: purchase.description,
      paymentMethod: purchase.paymentMethod,
      installmentsCount: Number(purchase.installmentsCount),
    }))
  ).sort((a, b) => a.date.localeCompare(b.date));

  const pendingInstallments = allInstallments.filter((item) => !item.paid);
  const pendingAmount = pendingInstallments.reduce(
    (total, item) => total + item.amount,
    0
  );
  const nextInstallment = pendingInstallments.find((item) => item.date >= today);

  function resetForm() {
    setPurchaseForm(createEmptyForm());
    setEditingPurchaseId(null);
  }

  function handleSavePurchase(event) {
    event.preventDefault();
    const count = Number(purchaseForm.installmentsCount);
    const total = Number(purchaseForm.totalAmount);
    if (!Number.isInteger(count) || count < 2 || count > 48 || total <= 0) return;

    if (editingPurchaseId) {
      setPurchases((previous) => previous.map((purchase) =>
        purchase.id === editingPurchaseId
          ? { ...purchase, ...purchaseForm, paidInstallments: purchase.paidInstallments || [] }
          : purchase
      ));
    } else {
      setPurchases((previous) => [
        ...previous,
        { id: crypto.randomUUID(), ...purchaseForm, paidInstallments: [] },
      ]);
    }
    resetForm();
  }

  function handleEditPurchase(purchase) {
    setPurchaseForm({
      description: purchase.description,
      totalAmount: String(purchase.totalAmount),
      installmentsCount: String(purchase.installmentsCount),
      firstPaymentDate: purchase.firstPaymentDate,
      paymentMethod: purchase.paymentMethod,
    });
    setEditingPurchaseId(purchase.id);
    document.getElementById("installment-description")?.focus();
  }

  function handleDeletePurchase(purchaseId) {
    if (!window.confirm("Delete this installment purchase and all its scheduled payments?")) return;
    setPurchases((previous) => previous.filter((purchase) => purchase.id !== purchaseId));
    if (editingPurchaseId === purchaseId) resetForm();
  }

  function toggleInstallmentPaid(purchaseId, installmentNumber) {
    setPurchases((previous) => previous.map((purchase) => {
      if (purchase.id !== purchaseId) return purchase;
      const paid = new Set(purchase.paidInstallments || []);
      if (paid.has(installmentNumber)) paid.delete(installmentNumber);
      else paid.add(installmentNumber);
      return { ...purchase, paidInstallments: [...paid] };
    }));
  }

  return (
    <section className="dashboard-content income-content installment-content">
      <div className="income-welcome">
        <div>
          <span className="income-eyebrow">FINANCIAL PLANNING</span>
          <h2>Manage your installments</h2>
          <p>Register purchases and keep track of payments across future months.</p>
        </div>
        <span className="demo-label">INSTALLMENT MANAGEMENT</span>
      </div>

      <div className="installment-summary-grid">
        <article className="installment-summary-card installment-summary-primary">
          <div className="installment-summary-icon"><Icon type="installments" /></div>
          <div><span>Pending amount</span><strong>{formatCurrency(pendingAmount)}</strong><small>{pendingInstallments.length} payments remaining</small></div>
        </article>
        <article className="installment-summary-card">
          <div className="installment-summary-icon"><Icon type="receipt" /></div>
          <div><span>Registered purchases</span><strong>{purchases.length}</strong><small>Installment purchases</small></div>
        </article>
        <article className="installment-summary-card">
          <div className="installment-summary-icon"><Icon type="calendar" /></div>
          <div><span>Next payment</span><strong>{nextInstallment ? formatCurrency(nextInstallment.amount) : formatCurrency(0)}</strong><small>{nextInstallment ? new Date(`${nextInstallment.date}T12:00:00`).toLocaleDateString("pt-BR") : "No pending payments"}</small></div>
        </article>
      </div>

      <article className="dashboard-panel income-form-panel">
        <div className="income-panel-heading">
          <div>
            <h3>{editingPurchaseId ? "Edit Purchase" : "Register an Installment Purchase"}</h3>
            <p>Enter the purchase details to automatically calculate each payment.</p>
          </div>
          <span className="installment-plus">{editingPurchaseId ? "✎" : "+"}</span>
        </div>
        <form className="income-form" onSubmit={handleSavePurchase}>
          <div className="income-field installment-field-wide">
            <label htmlFor="installment-description">Purchase description</label>
            <input id="installment-description" type="text" placeholder="e.g. Laptop, smartphone, furniture" value={purchaseForm.description} onChange={(event) => setPurchaseForm({ ...purchaseForm, description: event.target.value })} required />
          </div>
          <div className="income-field">
            <label htmlFor="installment-total">Total purchase amount (R$)</label>
            <input id="installment-total" type="number" min="0.01" step="0.01" placeholder="0.00" value={purchaseForm.totalAmount} onChange={(event) => setPurchaseForm({ ...purchaseForm, totalAmount: event.target.value })} required />
          </div>
          <div className="income-field">
            <label htmlFor="installment-count">Number of installments</label>
            <select id="installment-count" value={purchaseForm.installmentsCount} onChange={(event) => setPurchaseForm({ ...purchaseForm, installmentsCount: event.target.value })}>
              {Array.from({ length: 47 }, (_, index) => index + 2).map((count) => <option key={count} value={count}>{count} installments</option>)}
            </select>
          </div>
          <div className="income-field">
            <label htmlFor="installment-first-date">First payment date</label>
            <input id="installment-first-date" type="date" value={purchaseForm.firstPaymentDate} onChange={(event) => setPurchaseForm({ ...purchaseForm, firstPaymentDate: event.target.value })} required />
          </div>
          <div className="income-field">
            <label htmlFor="installment-method">Payment method</label>
            <select id="installment-method" value={purchaseForm.paymentMethod} onChange={(event) => setPurchaseForm({ ...purchaseForm, paymentMethod: event.target.value })} required>
              <option value="Credit card">Credit card</option><option value="Store financing">Store financing</option><option value="Other">Other</option>
            </select>
          </div>
          {purchaseForm.totalAmount && Number(purchaseForm.totalAmount) > 0 && (
            <div className="installment-calculation">
              <span>Estimated installment amount</span>
              <strong>{formatCurrency(Math.round(Number(purchaseForm.totalAmount) * 100 / Number(purchaseForm.installmentsCount)) / 100)}</strong>
              <small>{purchaseForm.installmentsCount} payments · Total {formatCurrency(purchaseForm.totalAmount)}</small>
            </div>
          )}
          <div className="income-form-actions expense-form-actions">
            {editingPurchaseId && <button type="button" className="cancel-expense-button" onClick={resetForm}>Cancel</button>}
            <button type="submit" className="add-installment-button">{editingPurchaseId ? "Save Changes" : "+ Add Purchase"}</button>
          </div>
        </form>
      </article>

      <article className="dashboard-panel income-records-panel">
        <div className="income-panel-heading">
          <div><h3>Scheduled Installments</h3><p>Review upcoming payments and mark installments as paid.</p></div>
          <Icon type="calendar" />
        </div>
        {allInstallments.length ? (
          <div className="installment-schedule-list">
            {allInstallments.map((item) => {
              const status = item.paid ? "Paid" : item.date < today ? "Overdue" : item.date === today ? "Due today" : "Upcoming";
              return (
                <div className={`installment-schedule-item ${item.paid ? "is-paid" : ""}`} key={`${item.purchaseId}-${item.number}`}>
                  <div className="installment-record-icon"><Icon type="installments" /></div>
                  <div className="income-record-info">
                    <strong>{item.description}</strong>
                    <span>Installment {item.number} of {item.installmentsCount} · {item.paymentMethod} · {new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="installment-record-details">
                    <strong>{formatCurrency(item.amount)}</strong>
                    <span className={`installment-status ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>
                  </div>
                  <button type="button" className="installment-paid-button" onClick={() => toggleInstallmentPaid(item.purchaseId, item.number)}>{item.paid ? "Undo" : "Mark paid"}</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="income-empty-state"><Icon type="installments" /><h4>No installment purchases yet</h4><p>Your registered purchases and scheduled payments will appear here.</p></div>
        )}
      </article>

      {purchases.length > 0 && (
        <article className="dashboard-panel income-records-panel">
          <div className="income-panel-heading"><div><h3>Your Purchases</h3><p>Edit or remove a purchase and its payment schedule.</p></div><Icon type="receipt" /></div>
          <div className="installment-purchase-list">
            {purchases.map((purchase) => {
              const schedule = buildInstallments(purchase);
              const paidCount = schedule.filter((item) => item.paid).length;
              return <div className="installment-purchase-item" key={purchase.id}>
                <div className="income-record-info"><strong>{purchase.description}</strong><span>{purchase.paymentMethod} · {purchase.installmentsCount} installments · {paidCount} paid</span></div>
                <strong className="installment-purchase-total">{formatCurrency(purchase.totalAmount)}</strong>
                <div className="expense-record-actions"><button type="button" onClick={() => handleEditPurchase(purchase)}>Edit</button><button type="button" onClick={() => handleDeletePurchase(purchase.id)}>Delete</button></div>
              </div>;
            })}
          </div>
        </article>
      )}
    </section>
  );
}

function UpcomingPaymentsManagement({ payments, setPayments, today }) {
  const createEmptyForm = () => ({
    description: "",
    amount: "",
    date: today,
    paymentMethod: "",
  });
  const [paymentForm, setPaymentForm] = useState(createEmptyForm);
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const sortedPayments = [...payments].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  function resetForm() {
    setPaymentForm(createEmptyForm());
    setEditingPaymentId(null);
  }

  function handleSavePayment(event) {
    event.preventDefault();

    if (editingPaymentId) {
      setPayments((previousPayments) =>
        previousPayments.map((payment) =>
          payment.id === editingPaymentId
            ? { ...payment, ...paymentForm }
            : payment
        )
      );
    } else {
      setPayments((previousPayments) => [
        ...previousPayments,
        { id: crypto.randomUUID(), ...paymentForm },
      ]);
    }

    resetForm();
  }

  function handleEditPayment(payment) {
    setPaymentForm({
      description: payment.description,
      amount: payment.amount,
      date: payment.date,
      paymentMethod: payment.paymentMethod,
    });
    setEditingPaymentId(payment.id);
    document.getElementById("scheduled-payment-description")?.focus();
  }

  function handleDeletePayment(paymentId) {
    if (!window.confirm("Delete this scheduled payment? This action cannot be undone.")) {
      return;
    }

    setPayments((previousPayments) =>
      previousPayments.filter((payment) => payment.id !== paymentId)
    );

    if (editingPaymentId === paymentId) {
      resetForm();
    }
  }

  return (
    <section className="dashboard-content income-content">
      <div className="income-welcome">
        <div>
          <span className="income-eyebrow">FINANCIAL PLANNING</span>
          <h2>Upcoming payments</h2>
          <p>Schedule future payments so you can prepare ahead.</p>
        </div>
        <span className="demo-label">PAYMENT SCHEDULE</span>
      </div>

      <article className="dashboard-panel income-form-panel">
        <div className="income-panel-heading">
          <div>
            <h3>{editingPaymentId ? "Edit Payment" : "Schedule a Payment"}</h3>
            <p>
              {editingPaymentId
                ? "Update the scheduled payment details."
                : "Add a future payment to your schedule."}
            </p>
          </div>
          <span className="payment-plus">{editingPaymentId ? "✎" : "+"}</span>
        </div>

        <form
          className="income-form"
          onSubmit={handleSavePayment}
        >
          <div className="income-field">
            <label htmlFor="scheduled-payment-description">Description</label>
            <input
              id="scheduled-payment-description"
              type="text"
              placeholder="e.g. Electricity bill"
              value={paymentForm.description}
              onChange={(event) =>
                setPaymentForm({
                  ...paymentForm,
                  description: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="income-field">
            <label htmlFor="scheduled-payment-amount">Amount (R$)</label>
            <input
              id="scheduled-payment-amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={paymentForm.amount}
              onChange={(event) =>
                setPaymentForm({ ...paymentForm, amount: event.target.value })
              }
              required
            />
          </div>
          <div className="income-field">
            <label htmlFor="scheduled-payment-date">Payment date</label>
            <input
              id="scheduled-payment-date"
              type="date"
              value={paymentForm.date}
              onChange={(event) =>
                setPaymentForm({ ...paymentForm, date: event.target.value })
              }
              required
            />
          </div>
          <div className="income-field">
            <label htmlFor="scheduled-payment-method">Payment method</label>
            <select
              id="scheduled-payment-method"
              value={paymentForm.paymentMethod}
              onChange={(event) =>
                setPaymentForm({
                  ...paymentForm,
                  paymentMethod: event.target.value,
                })
              }
              required
            >
              <option value="">Select a payment method</option>
              <option value="Credit card">Credit card</option>
              <option value="Debit card">Debit card</option>
              <option value="Cash">Cash</option>
              <option value="Pix">Pix</option>
              <option value="Bank transfer">Bank transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="income-form-actions expense-form-actions">
            {editingPaymentId && (
              <button
                type="button"
                className="cancel-expense-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="add-payment-button">
              {editingPaymentId ? "Save Changes" : "+ Schedule Payment"}
            </button>
          </div>
        </form>
      </article>

      <article className="dashboard-panel income-records-panel">
        <div className="income-panel-heading">
          <div>
            <h3>Scheduled Payments</h3>
            <p>Your upcoming and overdue planned payments.</p>
          </div>
          <Icon type="calendar" />
        </div>

        {sortedPayments.length > 0 ? (
          <div className="income-record-list">
            {sortedPayments.map((payment) => {
              const status =
                payment.date < today
                  ? "Overdue"
                  : payment.date === today
                    ? "Due today"
                    : "Upcoming";

              return (
                <div className="payment-record" key={payment.id}>
                  <div className="payment-record-icon">
                    <Icon type="calendar" />
                  </div>
                  <div className="income-record-info">
                    <strong>{payment.description}</strong>
                    <span>
                      {payment.paymentMethod} ·{" "}
                      {new Date(`${payment.date}T12:00:00`).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                  <div className="payment-record-status">
                    <span className={`payment-status ${status.toLowerCase().replace(" ", "-")}`}>
                      {status}
                    </span>
                    <strong className="payment-record-amount">
                      {Number(payment.amount).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </div>
                  <div className="expense-record-actions">
                    <button
                      type="button"
                      onClick={() => handleEditPayment(payment)}
                      aria-label={`Edit ${payment.description}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePayment(payment.id)}
                      aria-label={`Delete ${payment.description}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="income-empty-state">
            <Icon type="calendar" />
            <h4>No payments scheduled yet</h4>
            <p>Scheduled payments will appear here.</p>
          </div>
        )}
      </article>
    </section>
  );
}

function ExpenseManagement({ expenses, setExpenses }) {
  const createEmptyForm = () => ({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    paymentMethod: "",
  });
  const [expenseForm, setExpenseForm] = useState(createEmptyForm);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  function resetForm() {
    setExpenseForm(createEmptyForm());
    setEditingExpenseId(null);
  }

  function handleSaveExpense(event) {
    event.preventDefault();

    if (editingExpenseId) {
      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === editingExpenseId
            ? { ...expense, ...expenseForm }
            : expense
        )
      );
    } else {
      setExpenses((previousExpenses) => [
        ...previousExpenses,
        { id: crypto.randomUUID(), ...expenseForm },
      ]);
    }

    resetForm();
  }

  function handleEditExpense(expense) {
    setExpenseForm({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: expense.date,
      paymentMethod: expense.paymentMethod,
    });
    setEditingExpenseId(expense.id);
    document.getElementById("expense-description")?.focus();
  }

  function handleDeleteExpense(expenseId) {
    if (!window.confirm("Delete this expense? This action cannot be undone.")) {
      return;
    }

    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== expenseId)
    );

    if (editingExpenseId === expenseId) {
      resetForm();
    }
  }

  return (
    <section className="dashboard-content expense-content">
      <div className="expense-welcome">
        <div>
          <span className="income-eyebrow">FINANCIAL MANAGEMENT</span>
          <h2>Manage your expenses</h2>
          <p>Record and organize your everyday spending.</p>
        </div>
        <span className="demo-label">EXPENSE TRACKING</span>
      </div>

      <article className="expense-summary-card">
        <div className="expense-summary-icon">
          <Icon type="receipt" />
        </div>
        <div>
          <span>Total Expenses</span>
          <strong>
            {totalExpenses.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
          <small>{expenses.length} expense records</small>
        </div>
      </article>

      <article className="dashboard-panel expense-form-panel">
        <div className="income-panel-heading">
          <div>
            <h3>{editingExpenseId ? "Edit Expense" : "Add New Expense"}</h3>
            <p>
              {editingExpenseId
                ? "Update the details of this expense."
                : "Enter the details of the expense you made."}
            </p>
          </div>
          <span className="expense-plus">{editingExpenseId ? "✎" : "+"}</span>
        </div>

        <form className="income-form" onSubmit={handleSaveExpense}>
          <div className="income-field">
            <label htmlFor="expense-description">Description</label>
            <input
              id="expense-description"
              type="text"
              placeholder="e.g. Grocery shopping"
              value={expenseForm.description}
              onChange={(event) =>
                setExpenseForm({
                  ...expenseForm,
                  description: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="income-field">
            <label htmlFor="expense-amount">Amount (R$)</label>
            <input
              id="expense-amount"
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={expenseForm.amount}
              onChange={(event) =>
                setExpenseForm({ ...expenseForm, amount: event.target.value })
              }
              required
            />
          </div>

          <div className="income-field">
            <label htmlFor="expense-category">Category</label>
            <select
              id="expense-category"
              value={expenseForm.category}
              onChange={(event) =>
                setExpenseForm({
                  ...expenseForm,
                  category: event.target.value,
                })
              }
              required
            >
              <option value="">Select a category</option>
              <option value="Housing">Housing</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="income-field">
            <label htmlFor="expense-date">Date</label>
            <input
              id="expense-date"
              type="date"
              value={expenseForm.date}
              onChange={(event) =>
                setExpenseForm({ ...expenseForm, date: event.target.value })
              }
              required
            />
          </div>

          <div className="income-field">
            <label htmlFor="expense-payment-method">Payment Method</label>
            <select
              id="expense-payment-method"
              value={expenseForm.paymentMethod}
              onChange={(event) =>
                setExpenseForm({
                  ...expenseForm,
                  paymentMethod: event.target.value,
                })
              }
              required
            >
              <option value="">Select a payment method</option>
              <option value="Credit card">Credit card</option>
              <option value="Debit card">Debit card</option>
              <option value="Cash">Cash</option>
              <option value="Pix">Pix</option>
              <option value="Bank transfer">Bank transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="income-form-actions expense-form-actions">
            {editingExpenseId && (
              <button
                type="button"
                className="cancel-expense-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="add-expense-button">
              {editingExpenseId ? "Save Changes" : "+ Add Expense"}
            </button>
          </div>
        </form>
      </article>

      <article className="dashboard-panel expense-records-panel">
        <div className="income-panel-heading">
          <div>
            <h3>Expense Records</h3>
            <p>All your registered expense transactions.</p>
          </div>
          <Icon type="receipt" />
        </div>

        {expenses.length > 0 ? (
          <div className="income-record-list">
            {[...expenses]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((expense) => (
                <div className="expense-record" key={expense.id}>
                  <div className="expense-record-icon">
                    <Icon type="receipt" />
                  </div>
                  <div className="income-record-info">
                    <strong>{expense.description}</strong>
                    <span>
                      {expense.category} · {expense.paymentMethod} ·{" "}
                      {new Date(`${expense.date}T12:00:00`).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                  <strong className="expense-record-amount">
                    −{" "}
                    {Number(expense.amount).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <div className="expense-record-actions">
                    <button
                      type="button"
                      onClick={() => handleEditExpense(expense)}
                      aria-label={`Edit ${expense.description}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteExpense(expense.id)}
                      aria-label={`Delete ${expense.description}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="income-empty-state">
            <Icon type="receipt" />
            <h4>No expense records yet</h4>
            <p>Your registered expense transactions will appear here.</p>
          </div>
        )}
      </article>
    </section>
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