import { NextResponse } from "next/server";
import { getDemoFarmer } from "@/lib/services/farmers";
import { internalServerError } from "@/lib/utils/handle-error";

export async function GET() {
  try {
    const farmer = await getDemoFarmer();

    return NextResponse.json({ success: true, data: farmer }, { status: 200 });
  } catch {
    return internalServerError();
  }
}
