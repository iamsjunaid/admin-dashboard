import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'password123') {
    (await cookies()).set('auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return NextResponse.json({ message: 'Login successful' });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
