import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  fetchSpendingByCategory,
  fetchMonthlyComparison,
} from "../api/reports";

const COLORS = [
  "#213448", "#547792", "#94B4C1", "#EAE0CF", "#c25e5e",
  "#218653", "#9a6a1e", "#8493a1", "#a84747", "#45647d",
];

const brl = (v) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Reports() {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [month, setMonth] = useState(() => {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}`;
  });
  const [loadingCat, setLoadingCat] = useState(true);
  const [loadingMon, setLoadingMon] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoadingCat(true);
    setError("");
    fetchSpendingByCategory(month)
      .then((d) => !cancelled && setCategoryData(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoadingCat(false));
    return () => { cancelled = true; };
  }, [month]);

  useEffect(() => {
    let cancelled = false;
    setLoadingMon(true);
    fetchMonthlyComparison(6)
      .then((d) => !cancelled && setMonthlyData(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoadingMon(false));
    return () => { cancelled = true; };
  }, []);

  const totalSpent = categoryData.reduce((s, d) => s + d.total, 0);

  return (
    <section className="dashboard-content income-content">
      <div className="income-welcome">
        <div>
          <span className="income-eyebrow">FINANCIAL REPORTS</span>
          <h2>Spending reports</h2>
          <p>See where your money goes and compare months.</p>
        </div>
        <span className="demo-label">REPORTS</span>
      </div>

      {error && (
        <div className="dashboard-panel" style={{ color: "#a84747" }}>
          {error}
        </div>
      )}

      <article className="dashboard-panel income-form-panel">
        <div className="income-panel-heading">
          <div>
            <h3>Spending by category</h3>
            <p>Where most of your money went this month.</p>
          </div>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #dce5eb", borderRadius: 10, fontSize: 13 }}
          />
        </div>
        {loadingCat ? (
          <p className="panel-empty-message">Loading…</p>
        ) : categoryData.length === 0 ? (
          <p className="panel-empty-message">No expenses recorded for this month.</p>
        ) : (
          <>
            <p style={{ margin: "0 0 12px", color: "#718096", fontSize: 13 }}>
              Total spent: <strong>{brl(totalSpent)}</strong>
            </p>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={categoryData} dataKey="total" nameKey="category" outerRadius={110} label={(e) => e.category}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => brl(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </article>

      <article className="dashboard-panel income-form-panel">
        <div className="income-panel-heading">
          <div>
            <h3>Monthly spending comparison</h3>
            <p>Your total expenses over the last 6 months.</p>
          </div>
        </div>
        {loadingMon ? (
          <p className="panel-empty-message">Loading…</p>
        ) : monthlyData.length === 0 ? (
          <p className="panel-empty-message">No data available yet.</p>
        ) : (
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5eaf0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => brl(v)} />
                <Tooltip formatter={(v) => brl(v)} />
                <Bar dataKey="total" fill="#547792" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </article>
    </section>
  );
}