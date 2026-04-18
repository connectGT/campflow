import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'Parent'}
        </h1>
        <p className="text-text-muted">
          Manage your children&apos;s registrations and payments.
        </p>
      </div>

      <div className="glass-strong rounded-2xl p-8 border border-glass-border">
        <h2 className="text-xl font-semibold mb-4">Your Registrations</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center text-text-muted">
          <p className="mb-4">You haven&apos;t registered any children yet.</p>
          <a
            href="/register"
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  )
}
