import { NextResponse } from "next/server";
import { listings } from "@/lib/data";

export async function GET() {
  return NextResponse.json(listings);
}
