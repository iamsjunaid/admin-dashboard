import { NextRequest, NextResponse } from "next/server";
import { listings } from "@/lib/data";

export async function GET() {
  return NextResponse.json(listings);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  const validStatuses = ["approved", "rejected"] as const;

  if (!id || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const listing = listings.find((l) => l.id === id);
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  listing.status = status;

  return NextResponse.json({ message: "Listing updated", listing });
}
