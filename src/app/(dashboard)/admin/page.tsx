import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Users, CreditCard, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ExportButton } from "@/components/admin/ExportButton";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic Admin Protection (hardcoded for now, should use roles in metadata)
  // In a real app, check user.app_metadata.role or a profiles table join
  const isAdmin = user?.email === "gurutray@gmail.com" || user?.email?.endsWith("@campflow.in");

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

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Admin <span className="gradient-text">Command Center</span></h1>
          <p className="text-text-muted">Manage all paid registrations and camp logistics.</p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton data={registrations || []} filename="campflow_registrations" />
          <Link href="/dashboard" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass p-6 rounded-2xl border-l-4 border-primary">
          <div className="flex items-center gap-4 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-text-muted font-medium">Total Registrations</h3>
          </div>
          <p className="text-3xl font-bold">{registrations?.length || 0}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-secondary">
          <div className="flex items-center gap-4 mb-2">
            <CreditCard className="w-5 h-5 text-secondary" />
            <h3 className="text-text-muted font-medium">Revenue (Total)</h3>
          </div>
          <p className="text-3xl font-bold">₹{((registrations?.length || 0) * 12000).toLocaleString()}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-l-4 border-yellow-500">
          <div className="flex items-center gap-4 mb-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <h3 className="text-text-muted font-medium">Coming Soon</h3>
          </div>
          <p className="text-3xl font-bold">Batch 1</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-glass-border">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold">Recent Signups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface/50 text-xs uppercase tracking-wider text-text-muted">
                <th className="px-6 py-4 font-semibold">Child Details</th>
                <th className="px-6 py-4 font-semibold">Parent Info</th>
                <th className="px-6 py-4 font-semibold">Sports</th>
                <th className="px-6 py-4 font-semibold text-center">Payment Details</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {registrations?.map((reg: any) => (
                <tr key={reg.id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold">{reg.child?.name}</p>
                    <p className="text-xs text-text-muted">{reg.child?.age} yrs</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{reg.parent?.full_name}</p>
                    <p className="text-xs text-text-muted">{reg.parent?.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {reg.sports?.map((sport: string) => (
                        <span key={sport} className="px-1.5 py-0.5 rounded-md bg-stone-800 border border-stone-700 capitalize">
                          {sport}
                        </span>
                      ))}
                    </div>
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
                      {reg.payment_status === "paid" ? "Paid" : "Review"}
                    </span>
                    <p className="text-[10px] text-text-muted mt-1">{format(new Date(reg.created_at), "MMM d, HH:mm")}</p>
                  </td>
                </tr>
              ))}
              {(!registrations || registrations.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted italic">
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
