import { NextResponse } from "next/server";
import { listParcels } from "@/lib/services/parcels";
import { internalServerError } from "@/lib/utils/handle-error";

export async function GET() {
  try {
    const parcels = await listParcels();

    return NextResponse.json({ success: true, data: parcels }, { status: 200 });
  } catch {
    return internalServerError();
  }
}
