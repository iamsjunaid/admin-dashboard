import { NextResponse } from 'next/server';
import { auditLogs } from '@/lib/data';

export function GET() {
  return NextResponse.json(auditLogs);
}
