import { NextRequest, NextResponse } from 'next/server';
import { listings } from '@/lib/data';
import { AuditLog } from '@/lib/data';
import { promises as fs } from 'fs';
import path from 'path';

const AUDIT_LOGS_PATH = path.join(process.cwd(), 'audit-logs.json');

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const listing = listings.find((l) => l.id === id);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    listing.status = status;

    const cookieHeader = request.headers.get('cookie');
    const adminEmail = cookieHeader
      ?.split('; ')
      .find((c) => c.startsWith('admin_email='))
      ?.split('=')[1] ?? 'unknown';

    let logs: AuditLog[] = [];
    try {
      const data = await fs.readFile(AUDIT_LOGS_PATH, 'utf-8');
      logs = JSON.parse(data);
    } catch (err) {
      if (!(typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === 'ENOENT')) {
        throw err;
      }
    }
    const newLog: AuditLog = {
      id: `${logs.length + 1}`,
      admin: decodeURIComponent(adminEmail),
      action: status.toUpperCase(),
      listingId: listing.id,
      timestamp: new Date().toISOString(),
    };
    logs.push(newLog);
    await fs.writeFile(AUDIT_LOGS_PATH, JSON.stringify(logs, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
