import { NextRequest, NextResponse } from "next/server";
import { isDateAvailable, getAvailableTimeSlots } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const dateParam = request.nextUrl.searchParams.get("date");
  const durationParam = request.nextUrl.searchParams.get("duration");

  if (!dateParam || !durationParam) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const date = new Date(dateParam);
  const durationMinutes = Number(durationParam);

  const dateAvailable = await isDateAvailable(new Date(date));

  if (!dateAvailable) {
    return NextResponse.json({ dateAvailable: false, slots: [] });
  }

  const slots = await getAvailableTimeSlots(new Date(date), durationMinutes);

  return NextResponse.json({ dateAvailable: true, slots });
}