"use client";

import { useState } from "react";
import { Users, MessageCircle } from "lucide-react";
import { WhatsAppConversations } from "./WhatsAppConversations";

interface Props {
  registrationsContent: React.ReactNode;
  capacityContent: React.ReactNode;
  offlineFormContent: React.ReactNode;
}

export function AdminTabbedContent({ registrationsContent, capacityContent, offlineFormContent }: Props) {
  const [activeTab, setActiveTab] = useState<"registrations" | "whatsapp">("registrations");

  return (
    <>
      {/* Tab switcher */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("registrations")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            activeTab === "registrations"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-surface border border-glass-border text-text-muted hover:border-primary/50 hover:text-text-primary"
          }`}
        >
          <Users className="w-4 h-4" /> Registrations
        </button>
        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            activeTab === "whatsapp"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-surface border border-glass-border text-text-muted hover:border-green-500/50 hover:text-green-400"
          }`}
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp Chats
        </button>
      </div>

      {/* WhatsApp tab */}
      {activeTab === "whatsapp" && (
        <div className="mb-10">
          <WhatsAppConversations />
        </div>
      )}

      {/* Registrations tab */}
      {activeTab === "registrations" && (
        <>
          {capacityContent}
          {offlineFormContent}
          {registrationsContent}
        </>
      )}
    </>
  );
}
