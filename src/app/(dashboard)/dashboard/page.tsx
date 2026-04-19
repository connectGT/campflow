import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CheckCircle2, Clock, XCircle, User, Calendar, Bus, Trophy } from 'lucide-react'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  if (status === 'paid') return (
    <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">
      <CheckCircle2 className="w-3 h-3" /> Confirmed
    </span>
  )
  if (status === 'pending_approval') return (
    <span className="flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-1 rounded-full">
      <Clock className="w-3 h-3" /> Pending Review
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-1 rounded-full">
      <XCircle className="w-3 h-3" /> Unpaid
    </span>
  )
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all registrations for this logged-in user
  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      id, payment_status, utr_number, amount, created_at,
      transport_pickup, slot_1_sport, slot_2_sport, slot_3_sport,
      child:children(name, age, grade)
    `)
    .eq('parent_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back, <span className="gradient-text">{user?.user_metadata?.full_name || 'Parent'}</span>
        </h1>
        <p className="text-text-muted">
          Manage your children&apos;s registrations and payments.
        </p>
      </div>

      <div className="glass-strong rounded-2xl p-8 border border-glass-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Registrations</h2>
          <Link href="/register" className="text-sm font-semibold text-primary hover:underline">
            + Add Another Child
          </Link>
        </div>

        {!registrations || registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-text-muted">
            <p className="mb-4">You haven&apos;t registered any children yet.</p>
            <Link
              href="/register"
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
            >
              Register Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((reg: any) => (
              <div key={reg.id} className="bg-surface/50 border border-glass-border rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{reg.child?.name}</p>
                      <p className="text-sm text-text-muted">{reg.child?.age} yrs &bull; {reg.child?.grade}</p>
                    </div>
                  </div>
                  <StatusBadge status={reg.payment_status} />
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { time: '7:00 – 8:00 AM', sport: reg.slot_1_sport },
                    { time: '8:00 – 9:00 AM', sport: reg.slot_2_sport },
                    { time: '9:00 – 10:00 AM', sport: reg.slot_3_sport },
                  ].map((slot, i) => (
                    <div key={i} className="bg-background rounded-xl px-4 py-3 border border-glass-border flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <p className="text-[10px] text-text-muted">{slot.time}</p>
                        <p className="text-sm font-bold capitalize">{slot.sport || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-text-muted border-t border-glass-border pt-4">
                  <span className="flex items-center gap-1">
                    <Bus className="w-3 h-3" /> {reg.transport_pickup || 'Self Drop'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(reg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {reg.utr_number && (
                    <span className="font-mono">UTR: {reg.utr_number}</span>
                  )}
                  <span className="ml-auto font-bold text-white">₹{(reg.amount || 12000).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
