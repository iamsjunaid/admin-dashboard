import { NextRequest, NextResponse } from "next/server";
import { listings } from "@/lib/data";

export async function GET() {
  return NextResponse.json(listings);
}

export async function PATCH(req: NextRequest) {
  const { id, status, title, price } = await req.json();

  const listing = listings.find((l) => l.id === id);
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  // Allow status update
  if (status && ["approved", "rejected"].includes(status)) {
    listing.status = status;
  }

  // Allow title/price update
  if (title) listing.title = title;
  if (typeof price === "number") listing.price = price;

  return NextResponse.json({ message: "Listing updated", listing });
}
