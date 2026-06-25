import { NextResponse } from "next/server";

// Lightweight in-memory enquiry log (no DB dependency required).
// For production, swap to Prisma/db persistence.
const enquiries: Array<Record<string, unknown>> = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const requirement = String(body?.requirement ?? "").trim();
    const quantity = Number(body?.quantity ?? 0);
    const email = body?.email ? String(body.email).trim() : null;
    const location = body?.location ? String(body.location).trim() : null;
    const message = body?.message ? String(body.message).trim() : null;

    if (!name || !phone || !requirement || !quantity) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    const record = {
      name,
      phone,
      email,
      requirement,
      quantity,
      location,
      message,
      createdAt: new Date().toISOString(),
    };
    enquiries.push(record);

    return NextResponse.json({
      ok: true,
      message: "Enquiry received. Our team will contact you shortly.",
      enquiry: { name, phone, requirement, quantity, location },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "BRIZA 24/7 Bulk Enquiry API",
    methods: ["POST"],
  });
}
