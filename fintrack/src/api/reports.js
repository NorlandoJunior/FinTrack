// src/api/reports.js
import { supabase } from "../lib/supabase";

// Spending by category for one month (YYYY-MM)
export async function fetchSpendingByCategory(month) {
  const [year, m] = month.split("-").map(Number);
  const lastDay = new Date(year, m, 0).getDate();
  const start = `${month}-01`;
  const end = `${month}-${String(lastDay).padStart(2, "0")}`;

  const { data, error } = await supabase
    .from("expenses")
    .select("amount, category")
    .gte("date", start)
    .lte("date", end);

  if (error) throw new Error(error.message);

  const totals = {};
  for (const row of data) {
    const cat = row.category || "Other";
    totals[cat] = (totals[cat] || 0) + Number(row.amount);
  }

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

// Monthly totals for the last N months
export async function fetchMonthlyComparison(months = 6) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  const startStr = `${start.getFullYear()}-${String(
    start.getMonth() + 1
  ).padStart(2, "0")}-01`;

  const { data, error } = await supabase
    .from("expenses")
    .select("amount, date")
    .gte("date", startStr);

  if (error) throw new Error(error.message);

  const totals = {};
  for (const row of data) {
    const key = row.date.slice(0, 7);
    totals[key] = (totals[key] || 0) + Number(row.amount);
  }

  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    result.push({ month: key, total: totals[key] || 0 });
  }
  return result;
}