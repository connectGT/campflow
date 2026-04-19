"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Phone, RefreshCw, ArrowLeft, Search, Clock, Bot, User } from "lucide-react";

interface Conversation {
  phone: string;
  localPhone: string;
  name: string | null;
  state: string;
  lastMessage: string;
  lastDirection: string;
  lastAt: string;
  messageCount: number;
}

interface Message {
  id: string;
  phone: string;
  direction: "inbound" | "outbound";
  message: string;
  intent: string | null;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const STATE_LABEL: Record<string, string> = {
  menu: "Browsing menu",
  registration: "Asked about registration",
  sports: "Asked about sports",
  fees: "Asked about fees",
  pickup: "Asked about pickup",
  camp_dates: "Asked about camp dates",
  status: "Checked status",
  talk_to_team: "🔴 Needs help",
  unknown: "Last message unknown",
  start: "New user",
};

export function WhatsAppConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingThread, setLoadingThread] = useState(false);
  const [search, setSearch] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const threadRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/whatsapp-history");
      const data = await res.json();
      setConversations(data.conversations || []);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  };

  const fetchThread = async (phone: string) => {
    setLoadingThread(true);
    try {
      const res = await fetch(`/api/admin/whatsapp-history?phone=${phone}`);
      const data = await res.json();
      setMessages(data.messages || []);
      setTimeout(() => threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" }), 100);
    } finally {
      setLoadingThread(false);
    }
  };

  useEffect(() => { fetchConversations(); }, []);

  const filtered = conversations.filter(c =>
    c.localPhone.includes(search) || (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const needsHelp = conversations.filter(c => c.state === "talk_to_team");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-bold">WhatsApp Conversations</h2>
          <span className="text-xs bg-surface border border-glass-border px-2 py-1 rounded-full text-text-muted">
            {conversations.length} total
          </span>
          {needsHelp.length > 0 && (
            <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded-full font-semibold animate-pulse">
              {needsHelp.length} need help!
            </span>
          )}
        </div>
        <button onClick={fetchConversations}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary px-3 py-1.5 bg-surface border border-glass-border rounded-lg transition-colors">
          <RefreshCw className="w-3 h-3" /> Refresh
          <span className="text-[10px] opacity-60 ml-1">({timeAgo(lastRefresh.toISOString())})</span>
        </button>
      </div>

      <div className="grid md:grid-cols-5 gap-4" style={{ height: "600px" }}>

        {/* ── Conversation List ── */}
        <div className="md:col-span-2 glass rounded-2xl overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-glass-border">
            <div className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2">
              <Search className="w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by number or name..."
                className="bg-transparent text-sm flex-1 focus:outline-none text-text-primary placeholder:text-text-muted"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full text-text-muted text-sm">
                Loading...
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-text-muted gap-2">
                <MessageCircle className="w-8 h-8 opacity-30" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs opacity-60">Messages will appear here once customers message you</p>
              </div>
            ) : (
              filtered.map(conv => (
                <button
                  key={conv.phone}
                  onClick={() => { setSelected(conv); fetchThread(conv.phone); }}
                  className={`w-full text-left p-3 border-b border-glass-border/50 transition-colors hover:bg-surface/50 ${selected?.phone === conv.phone ? "bg-primary/10 border-l-2 border-l-primary" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${conv.state === "talk_to_team" ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"}`}>
                      {conv.name ? conv.name[0].toUpperCase() : conv.localPhone.slice(-2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-text-primary truncate">
                          {conv.name || `+91 ${conv.localPhone}`}
                        </span>
                        <span className="text-[10px] text-text-muted flex-shrink-0">{timeAgo(conv.lastAt)}</span>
                      </div>
                      {conv.name && <p className="text-[10px] text-text-muted mb-0.5">+91 {conv.localPhone}</p>}
                      <p className={`text-xs truncate ${conv.state === "talk_to_team" ? "text-red-400 font-medium" : "text-text-muted"}`}>
                        {conv.lastDirection === "outbound" ? "🤖 " : "👤 "}
                        {conv.lastMessage.substring(0, 50)}{conv.lastMessage.length > 50 ? "..." : ""}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${conv.state === "talk_to_team" ? "bg-red-500/20 text-red-400" : "bg-surface text-text-muted"}`}>
                          {STATE_LABEL[conv.state] || conv.state}
                        </span>
                        <span className="text-[9px] text-text-muted">{conv.messageCount} msgs</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── Chat Thread ── */}
        <div className="md:col-span-3 glass rounded-2xl overflow-hidden flex flex-col">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted gap-3">
              <MessageCircle className="w-12 h-12 opacity-20" />
              <p className="text-sm font-medium">Select a conversation</p>
              <p className="text-xs opacity-60">Click any chat on the left to view the full thread</p>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-3 p-4 border-b border-glass-border bg-surface/30">
                <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${selected.state === "talk_to_team" ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"}`}>
                  {selected.name ? selected.name[0].toUpperCase() : selected.localPhone.slice(-2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{selected.name || `+91 ${selected.localPhone}`}</p>
                  <p className="text-xs text-text-muted">+91 {selected.localPhone} · {STATE_LABEL[selected.state] || selected.state}</p>
                </div>
                <a
                  href={`https://wa.me/91${selected.localPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <Phone className="w-3 h-3" /> Reply on WhatsApp
                </a>
              </div>

              {/* Messages */}
              <div ref={threadRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {loadingThread ? (
                  <div className="flex items-center justify-center h-full text-text-muted text-sm">Loading thread...</div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-text-muted text-sm">No messages yet</div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.direction === "outbound" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.direction === "outbound" ? "bg-primary/20" : "bg-surface border border-glass-border"}`}>
                        {msg.direction === "outbound"
                          ? <Bot className="w-3 h-3 text-primary" />
                          : <User className="w-3 h-3 text-text-muted" />
                        }
                      </div>
                      {/* Bubble */}
                      <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                        msg.direction === "outbound"
                          ? "bg-primary/15 border border-primary/20 text-text-primary rounded-br-sm"
                          : "bg-surface border border-glass-border text-text-primary rounded-bl-sm"
                      }`}>
                        {msg.message}
                        <div className={`flex items-center gap-1 mt-1 ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                          <Clock className="w-2.5 h-2.5 text-text-muted/50" />
                          <span className="text-[10px] text-text-muted/50">
                            {new Date(msg.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })}
                          </span>
                          {msg.direction === "outbound" && <Bot className="w-2.5 h-2.5 text-primary/50" />}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer note */}
              <div className="px-4 py-2 border-t border-glass-border bg-surface/20 text-center">
                <p className="text-[10px] text-text-muted">
                  🤖 Bot auto-replies to customers. To reply manually →{" "}
                  <a href={`https://wa.me/91${selected.localPhone}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Open WhatsApp
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
