import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { format } from "date-fns";
import { Users, CreditCard, Calendar, ArrowLeft, Activity, ImageIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { ExportButton } from "@/components/admin/ExportButton";
import { ApproveRejectButtons } from "@/components/admin/ApproveRejectButtons";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { createClient } from "@/lib/supabase/server";
import { SPORTS, CAMP } from "@/data/camp";

function getExpectedToken() {
  const user = process.env.ADMIN_USERNAME || "";
  const pass = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_JWT_SECRET || "change-this-in-production";
  return createHmac("sha256", secret).update(user + ":" + pass).digest("hex");
}

export default async function AdminDashboardPage() {
  // Cookie-based auth — must have valid admin_token cookie from /dheera-control login
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;
  const expectedToken = getExpectedToken();

  if (!adminToken || adminToken !== expectedToken) {
    redirect("/dheera-control");
  }

  const supabase = await createClient();

  // Fetch All Registrations (all statuses so admin can see full history)
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select(`
      *,
      child:children(name, age, grade),
      parent:profiles(full_name, email, phone)
    `)
    .in("payment_status", ["paid", "pending_approval", "rejected"])
    .order("created_at", { ascending: false });

  // Fetch Real-time capacities
  const { data: capacities } = await supabase
    .from("realtime_sport_capacity")
    .select("*");

  const capacityMap = new Map();
  if (capacities) {
    capacities.forEach((cap: any) => {
      capacityMap.set(cap.sport_id, parseInt(cap.total_seats_taken || 0));
    });
  }

  const paid = registrations?.filter((r: any) => r.payment_status === "paid") || [];
  const pending = registrations?.filter((r: any) => r.payment_status === "pending_approval") || [];

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Admin <span className="gradient-text">Command Center</span></h1>
          <p className="text-text-muted">Approve pending payments and manage camp logistics.</p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton data={registrations || []} filename="campflow_registrations" />
          <AdminLogoutButton />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="glass p-6 rounded-2xl border-l-4 border-primary">
          <div className="flex items-center gap-4 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-text-muted font-medium">Total Signups</h3>
          </div>
          <p className="text-3xl font-bold">{registrations?.length || 0}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-secondary">
          <div className="flex items-center gap-4 mb-2">
            <CreditCard className="w-5 h-5 text-secondary" />
            <h3 className="text-text-muted font-medium">Confirmed Revenue</h3>
          </div>
          <p className="text-3xl font-bold">₹{(paid.length * CAMP.FEE).toLocaleString()}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-green-500">
          <div className="flex items-center gap-4 mb-2">
            <Activity className="w-5 h-5 text-green-500" />
            <h3 className="text-text-muted font-medium">Approved</h3>
          </div>
          <p className="text-3xl font-bold">{paid.length}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-yellow-500">
          <div className="flex items-center gap-4 mb-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <h3 className="text-text-muted font-medium">Pending Review</h3>
          </div>
          <p className="text-3xl font-bold">{pending.length}</p>
        </div>
      </div>

      {/* Live Capacities Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Live Seat Availability</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPORTS.map(sport => {
            const taken = capacityMap.get(sport.id) || 0;
            const remaining = sport.seats_total - taken;
            const percentTaken = Math.min(((taken / sport.seats_total) * 100), 100);
            return (
              <div key={sport.id} className="glass p-4 rounded-xl border border-glass-border">
                <div className="flex items-center gap-2 mb-2">
                  <span>{sport.emoji}</span>
                  <p className="font-semibold text-sm truncate">{sport.name}</p>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-2xl font-bold" style={{ color: remaining <= 5 ? '#ef4444' : 'inherit' }}>
                    {remaining}
                  </p>
                  <p className="text-xs text-text-muted pb-1">/ {sport.seats_total}</p>
                </div>
                <div className="w-full bg-surface rounded-full h-1.5 hidden md:block">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ width: `${percentTaken}%`, backgroundColor: remaining <= 5 ? '#ef4444' : sport.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registration Table */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-glass-border">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold">Registration Log</h2>
          <p className="text-sm text-text-muted mt-1">Cross-check UTR with your bank statement, then approve or reject each entry.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface/50 text-[10px] uppercase tracking-wider text-text-muted font-mono">
                <th className="px-4 py-4">Child</th>
                <th className="px-4 py-4">Parent / Emergency</th>
                <th className="px-4 py-4">Time Slots</th>
                <th className="px-4 py-4">Transport</th>
                <th className="px-4 py-4">UTR & Proof</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {registrations?.map((reg: any) => (
                <tr key={reg.id} className={`hover:bg-surface/30 transition-colors ${reg.payment_status === "pending_approval" ? "bg-yellow-500/5" : ""}`}>
                  <td className="px-4 py-4">
                    <p className="font-bold">{reg.child?.name}</p>
                    <p className="text-xs text-text-muted">{reg.child?.age} yrs</p>
                    <p className="text-xs text-text-muted">{reg.child?.grade || "—"}</p>
                    <p className="text-[10px] text-text-muted mt-1">{format(new Date(reg.created_at), "MMM d, HH:mm")}</p>
                  </td>
                  <td className="px-4 py-4 text-xs">
                    <p className="font-semibold">{reg.parent?.full_name}</p>
                    <p className="text-text-muted">{reg.parent?.email}</p>
                    <p className="text-text-muted">+91 {reg.parent?.phone}</p>
                    <p className="text-text-muted mt-1">Emg: {reg.emergency_contact_name}</p>
                    <p className="text-text-muted">+91 {reg.emergency_contact_phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      {[
                        { label: "7-8AM", val: reg.slot_1_sport },
                        { label: "8-9AM", val: reg.slot_2_sport },
                        { label: "9-10AM", val: reg.slot_3_sport },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[10px] text-text-muted w-14 shrink-0">{s.label}</span>
                          <span className="text-xs font-medium capitalize bg-background border border-glass-border px-2 py-0.5 rounded-md">{s.val || "—"}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-text-muted">
                    {reg.transport_pickup || "Self Drop"}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs font-mono font-bold text-white mb-2">{reg.utr_number || "NO-UTR"}</p>
                    {reg.proof_image_url ? (
                      <a href={reg.proof_image_url} target="_blank" rel="noreferrer">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-glass-border hover:border-primary transition-colors relative group">
                          <img src={reg.proof_image_url} alt="Payment proof" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      <span className="text-[10px] text-text-muted italic">No proof</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full border ${
                      reg.payment_status === "paid" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {reg.payment_status === "paid" ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {reg.payment_status === "pending_approval" ? (
                      <ApproveRejectButtons registrationId={reg.id} />
                    ) : (
                      <span className="text-[10px] text-text-muted italic">Confirmed</span>
                    )}
                  </td>
                </tr>
              ))}
              {(!registrations || registrations.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-muted italic">
                    No registrations found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



