import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { services } from "@/data/service";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        name: service.name,
        tagline: service.tagline,
        description: service.description,
        duration: service.duration,
        priceForm: service.priceFrom,
        withExtension: service.withExtensions,
        collection: service.collection,
      },
    });
    console.log(`✓ ${service.name} ajouté`);
  }
}

main()
  .then(() => {
    console.log("Seed terminé avec succès !");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });