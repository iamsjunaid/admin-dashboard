import { NextResponse } from 'next/server';
import { AuditLog } from '@/lib/data';
import { promises as fs } from 'fs';
import path from 'path';

const AUDIT_LOGS_PATH = path.join(process.cwd(), 'audit-logs.json');

export async function GET() {
  try {
    const data = await fs.readFile(AUDIT_LOGS_PATH, 'utf-8');
    const logs: AuditLog[] = JSON.parse(data);
    return NextResponse.json(logs);
  } catch (err: unknown) {
    // If file doesn't exist, return empty array
    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === 'ENOENT') {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: 'Failed to read audit logs' }, { status: 500 });
  }
}
