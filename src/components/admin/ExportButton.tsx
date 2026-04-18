"use client";

import { Download } from "lucide-react";

interface ExportButtonProps {
  data: any[];
  filename: string;
}

export function ExportButton({ data, filename }: ExportButtonProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = ["Child Name", "Age", "Parent Name", "Email", "Sports", "Date Paid", "Order ID"];
    const rows = data.map((reg) => [
      reg.child?.name,
      reg.child?.age,
      reg.parent?.full_name,
      reg.parent?.email,
      reg.sports?.join("; "),
      reg.created_at,
      reg.razorpay_order_id,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 bg-surface hover:bg-glass-border text-text-primary px-4 py-2 rounded-xl border border-glass-border transition-colors text-sm font-medium"
    >
      <Download className="w-4 h-4" /> Export CSV
    </button>
  );
}
