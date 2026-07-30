import { prisma } from "../../../../lib/prisma";
import HairCareClient from "./hair-care-client";

export default async function HairCarePage() {
  const items = await prisma.service.findMany({
    where: { category: { in: ["HAIR_CARE", "PREPARATION"] } },
    orderBy: { name: "asc" },
  });

  return <HairCareClient items={items} />;
}