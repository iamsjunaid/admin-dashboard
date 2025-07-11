import { listings } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(listings);
}

export async function PATCH(request: Request) {
  const { id, title, price } = await request.json();

  const listingIndex = listings.findIndex((listing) => listing.id === id);
  if (listingIndex === -1) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  listings[listingIndex] = {
    ...listings[listingIndex],
    title,
    price,
  };

  return NextResponse.json(listings[listingIndex]);
}
