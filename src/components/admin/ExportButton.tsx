"use client";

import { Download } from "lucide-react";
import { useState } from "react";

export function ExportButton() {
  const [downloading, setDownloading] = useState(false);

  const exportData = () => {
    setDownloading(true);
    // Use window.open to trigger the native browser download from the API endpoint
    window.open('/api/export-camp-data', '_blank');
    
    // Reset state after a short delay so the button becomes clickable again
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <button
      onClick={exportData}
      disabled={downloading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors text-sm font-medium ${
        downloading 
          ? "bg-primary/20 text-primary border-primary/50 cursor-wait" 
          : "bg-surface hover:bg-glass-border text-text-primary border-glass-border"
      }`}
    >
      {downloading ? (
        <>
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" /> Export All Data (ZIP)
        </>
      )}
    </button>
  );
}
