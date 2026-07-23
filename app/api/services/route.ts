import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get("collection");

  const services = await prisma.service.findMany({
    where: collection ? { collection } : undefined,
    select: {
      id: true,
      name: true,
      priceFrom: true,
      priceWithoutExtensions: true,
      duration: true,
      collection: true,
      extensionFee: true,
      extensionsMode: true,
      requiresLength: true,
      requiresSize: true,
      category: true,
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(services);
}