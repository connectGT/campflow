import { NextResponse } from 'next/server'

// Health check endpoint — used by cron to keep Supabase free tier from pausing
export async function GET() {
  return NextResponse.json({ status: 'ok', ts: Date.now(), service: 'campflow' })
}
