import { NextRequest, NextResponse } from 'next/server';
import { listings, auditLogs } from '@/lib/data';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
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

    auditLogs.push({
      id: `${auditLogs.length + 1}`,
      admin: decodeURIComponent(adminEmail),
      action: status.toUpperCase(),
      listingId: listing.id,
      timestamp: new Date().toISOString(),
    });

    console.log(`auditLogs`, auditLogs);
    

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
