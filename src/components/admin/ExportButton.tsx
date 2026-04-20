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
      "Registration ID",
      "Registration Date",
      "Child Name",
      "Child Age",
      "Child Grade",
      "Parent Name",
      "Parent Email",
      "Parent Phone",
      "Emergency Contact Name",
      "Emergency Contact Phone",
      "Transport Pickup",
      "Slot 1 (7-8 AM)",
      "Slot 2 (8-9 AM)",
      "Slot 3 (9-10 AM)",
      "Total Amount",
      "Payment Status",
      "UTR Number",
      "Payment Proof URL",
      "Rejection Reason",
    ];

    const rows = data.map((reg) => [
      reg.id,
      new Date(reg.created_at).toLocaleString(),
      reg.child?.name || "N/A",
      reg.child?.age || "N/A",
      reg.child?.grade || "N/A",
      reg.parent?.full_name || "N/A",
      reg.parent?.email || "N/A",
      reg.parent?.phone || "N/A",
      reg.emergency_contact_name || "N/A",
      reg.emergency_contact_phone || "N/A",
      reg.transport_pickup || "Self Drop",
      reg.slot_1_sport || "N/A",
      reg.slot_2_sport || "N/A",
      reg.slot_3_sport || "N/A",
      reg.amount || 12000,
      reg.payment_status || "N/A",
      reg.utr_number || "N/A",
      reg.proof_image_url || "N/A",
      reg.rejection_reason || "N/A",
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
