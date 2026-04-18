import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      {/* Dashboard Nav */}
      <nav className="fixed top-0 inset-x-0 h-16 glass z-50 border-b border-glass-border">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/dashboard" className="font-display font-bold text-xl tracking-tight">
            Camp<span className="text-primary">Flow</span>
          </Link>

          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 relative">
        {/* Background orbs */}
        <div className="orb w-[500px] h-[500px] bg-primary/20 -top-40 -left-60 pointer-events-none" />
        <div className="orb w-[400px] h-[400px] bg-secondary/10 top-40 -right-40 pointer-events-none" />
        
        <div className="relative z-10 w-full animate-fade-in-up">
          {children}
        </div>
      </main>
    </div>
  )
}
