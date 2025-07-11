import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "admin@example.com" && password === "password123") {
    const cookieStore = await cookies();

    // Set authentication cookie
    cookieStore.set("auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    // Set admin email cookie
    cookieStore.set("admin_email", email, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
