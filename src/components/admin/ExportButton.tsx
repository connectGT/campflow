"use client";

import { Download } from "lucide-react";

interface ExportButtonProps {
  data: any[];
  filename: string;
}

export function ExportButton({ data, filename }: ExportButtonProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = [
      "Child Name", "Age", "School", 
      "Parent Name", "Email", "Phone", "Emergency Contact", 
      "Sports", "Transport Point", 
      "Date Paid", "Status", "UTR Number", "Order ID"
    ];
    const rows = data.map((reg) => [
      reg.child?.name,
      reg.child?.age,
      reg.child?.school || "N/A",
      reg.parent?.full_name,
      reg.parent?.email,
      reg.parent?.phone,
      `${reg.emergency_contact_name || "N/A"} (${reg.emergency_contact_phone || ""})`,
      reg.sports?.join("; "),
      reg.transport_pickup || "Self Drop",
      reg.created_at,
      reg.payment_status,
      reg.utr_number || "N/A",
      reg.id,
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
