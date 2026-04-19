import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Users, CreditCard, Calendar, ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import { ExportButton } from "@/components/admin/ExportButton";
import { SPORTS, CAMP } from "@/data/camp";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic Admin Protection
  const isAdmin = user?.email === "gurutray@gmail.com" || user?.email?.endsWith("@campflow.in") || user?.email === "muktabhinav@gmail.com";

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Fetch Paid and Pending Approval Registrations
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select(`
      *,
      child:children(name, age),
      parent:profiles(full_name, email, phone)
    `)
    .in("payment_status", ["paid", "pending_approval"])
    .order("created_at", { ascending: false });

  // Fetch Real-time capacities (includes locked carts!)
  const { data: capacities } = await supabase
    .from("realtime_sport_capacity")
    .select("*");

  // Map capacities for easy lookup
  const capacityMap = new Map();
  if (capacities) {
    capacities.forEach((cap: any) => {
      capacityMap.set(cap.sport_id, parseInt(cap.total_seats_taken || 0));
    });
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Admin <span className="gradient-text">Command Center</span></h1>
          <p className="text-text-muted">Manage all paid registrations and live camp logistics.</p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton data={registrations || []} filename="campflow_registrations" />
          <Link href="/dashboard" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
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
            <h3 className="text-text-muted font-medium">Total Revenue</h3>
          </div>
          <p className="text-3xl font-bold">₹{((registrations?.length || 0) * CAMP.FEE).toLocaleString()}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-green-500">
          <div className="flex items-center gap-4 mb-2">
            <Activity className="w-5 h-5 text-green-500" />
            <h3 className="text-text-muted font-medium">Approved</h3>
          </div>
          <p className="text-3xl font-bold">{registrations?.filter((r: any) => r.payment_status === "paid").length || 0}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-yellow-500">
          <div className="flex items-center gap-4 mb-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <h3 className="text-text-muted font-medium">Pending Review</h3>
          </div>
          <p className="text-3xl font-bold">{registrations?.filter((r: any) => r.payment_status === "pending_approval").length || 0}</p>
        </div>
      </div>

      {/* Live Capacities Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Live Seat Availability <span className="text-xs font-normal text-text-muted ml-2">(Includes 10-min active carts)</span></h2>
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

      {/* Table Section */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-glass-border">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold">Registration Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface/50 text-[10px] uppercase tracking-wider text-text-muted font-mono">
                <th className="px-6 py-4">Child Details</th>
                <th className="px-6 py-4">Parent Info</th>
                <th className="px-6 py-4">Sports</th>
                <th className="px-6 py-4 text-center">Logistics</th>
                <th className="px-6 py-4 text-center">Payment Details</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {registrations?.map((reg: any) => (
                <tr key={reg.id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold">{reg.child?.name}</p>
                    <p className="text-xs text-text-muted">{reg.child?.age} yrs │ {reg.child?.school || "No School"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{reg.parent?.full_name}</p>
                    <p className="text-xs text-text-muted">
                      {reg.parent?.phone} <br/>
                      Emerg: {reg.emergency_contact_phone}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {reg.sports?.map((sport: string) => (
                        <span key={sport} className="px-1.5 py-0.5 rounded-md bg-stone-800 border border-stone-700 capitalize text-[10px]">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-center text-text-muted">
                    {reg.transport_pickup || "Self Drop"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-[10px] font-mono mb-1">{reg.utr_number || "NO-UTR"}</div>
                    {reg.proof_image_url && (
                      <a 
                        href={reg.proof_image_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[10px] text-primary hover:underline font-bold"
                      >
                        VIEW PROOF ➔
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full border ${
                      reg.payment_status === "paid" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {reg.payment_status === "paid" ? "Approved" : "Review"}
                    </span>
                    <p className="text-[10px] text-text-muted mt-1">{format(new Date(reg.created_at), "MMM d, HH:mm")}</p>
                  </td>
                </tr>
              ))}
              {(!registrations || registrations.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted italic">
                    No paid registrations found yet. Let's get some sales!
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
