import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { services } from "@/data/service";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Coiffures existantes (Collections)
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
        priceFrom: service.priceFrom,
        collection: service.collection,
        category: "COLLECTION",
        availableFor: service.availableFor.map((a) => a.toUpperCase()) as ("FEMMES" | "HOMMES" | "ENFANTS")[],
      },
    });
    console.log(`✓ ${service.name} ajouté`);
  }

  // 2. Add-ons (deviennent de vrais enregistrements)
  const addOnsData = [
    { name: "Lavage", price: 35 },
    { name: "Hydratation", price: 45 },
    { name: "Traitement protéiné", price: 55 },
    { name: "Massage du cuir chevelu", price: 25 },
    { name: "Séchage", price: 30 },
    { name: "Dépose", price: 40 },
    { name: "Démêlage", price: 25 },
    { name: "Préparation avant coiffure", price: 20 },
  ];

  for (const addOn of addOnsData) {
    await prisma.addOn.upsert({
      where: { name: addOn.name },
      update: { price: addOn.price },
      create: addOn,
    });
    console.log(`✓ Add-on ${addOn.name} ajouté`);
  }

  // 3. Services Hair Care (réservables seuls)
  const hairCareServices = [
    { slug: "lavage-service", name: "Signature Wash", tagline: "La base essentielle d'une chevelure saine", duration: "30 à 45 minutes", priceFrom: 35 },
    { slug: "hydratation-service", name: "Deep Hydration", tagline: "Un soin intense pour des cheveux souples", duration: "45 minutes", priceFrom: 45 },
    { slug: "traitement-proteine-service", name: "Strength Therapy", tagline: "Renforce et répare la fibre capillaire", duration: "45 à 60 minutes", priceFrom: 55 },
    { slug: "massage-service", name: "Scalp Care", tagline: "Détente et stimulation du cuir chevelu", duration: "20 minutes", priceFrom: 25 },
    { slug: "sechage-service", name: "Blow Dry", tagline: "Un séchage professionnel", duration: "30 minutes", priceFrom: 30 },
  ];

  for (const item of hairCareServices) {
    await prisma.service.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        ...item,
        description: item.tagline,
        collection: "hair-care",
        category: "HAIR_CARE",
        extensionsMode: "NOT_ALLOWED",
        requiresLength: false,
        requiresSize: false,
      },
    });
    console.log(`✓ Soin ${item.name} ajouté`);
  }

  // 4. Services Préparation (réservables seuls)
  const preparationServices = [
    { slug: "depose-service", name: "Dépose", tagline: "Retrait soigneux de ta coiffure précédente", duration: "1 à 2 heures", priceFrom: 40 },
    { slug: "demelage-service", name: "Démêlage", tagline: "Un démêlage en douceur, mèche par mèche", duration: "30 à 60 minutes", priceFrom: 25 },
    { slug: "preparation-service", name: "Préparation avant coiffure", tagline: "Nettoyage et sectionnement des cheveux", duration: "30 minutes", priceFrom: 20 },
  ];

  for (const item of preparationServices) {
    await prisma.service.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        ...item,
        description: item.tagline,
        collection: "preparation",
        category: "PREPARATION",
        extensionsMode: "NOT_ALLOWED",
        requiresLength: false,
        requiresSize: false,
      },
    });
    console.log(`✓ Préparation ${item.name} ajouté`);
  }

  // 5. Forfaits (avec add-ons inclus, compatibles avec Collections uniquement)
  const collectionServices = await prisma.service.findMany({
    where: { category: "COLLECTION" },
  });

  const lavage = await prisma.addOn.findUnique({ where: { name: "Lavage" } });
  const hydratation = await prisma.addOn.findUnique({ where: { name: "Hydratation" } });
  const traitement = await prisma.addOn.findUnique({ where: { name: "Traitement protéiné" } });
  const massage = await prisma.addOn.findUnique({ where: { name: "Massage du cuir chevelu" } });
  const sechage = await prisma.addOn.findUnique({ where: { name: "Séchage" } });
  const depose = await prisma.addOn.findUnique({ where: { name: "Dépose" } });
  const demelage = await prisma.addOn.findUnique({ where: { name: "Démêlage" } });

  const packagesData = [
    { name: "Essential", tagline: "L'essentiel, sans fioritures", includedAddOnIds: [], featured: false, price: 0, includesPremiumHair: false },
    { name: "Care", tagline: "Ta coiffure, préparée avec soin", includedAddOnIds: [lavage?.id, traitement?.id], featured: false, price: 60, includesPremiumHair: false },
    { name: "Signature", tagline: "L'expérience complète DKY Hair", includedAddOnIds: [depose?.id, lavage?.id, traitement?.id, demelage?.id, sechage?.id], featured: true, price: 120, includesPremiumHair: false },
    { name: "Prestige", tagline: "Le luxe absolu, tout inclus", includedAddOnIds: [depose?.id, lavage?.id, traitement?.id, demelage?.id, sechage?.id, hydratation?.id, massage?.id], featured: false, price: 200, includesPremiumHair: true },
  ];

  for (const pkg of packagesData) {
    const validAddOnIds = pkg.includedAddOnIds.filter((id): id is string => !!id);
    const existing = await prisma.package.findFirst({ where: { name: pkg.name } });

    if (existing) {
      await prisma.package.update({
        where: { id: existing.id },
        data: {
          tagline: pkg.tagline,
          featured: pkg.featured,
          price: pkg.price,
          includesPremiumHair: pkg.includesPremiumHair,
          includedAddOns: { set: validAddOnIds.map((id) => ({ id })) },
          compatibleServices: { set: collectionServices.map((s) => ({ id: s.id })) },
        },
      });
    } else {
      await prisma.package.create({
        data: {
          name: pkg.name,
          tagline: pkg.tagline,
          featured: pkg.featured,
          price: pkg.price,
          includesPremiumHair: pkg.includesPremiumHair,
          includedAddOns: { connect: validAddOnIds.map((id) => ({ id })) },
          compatibleServices: { connect: collectionServices.map((s) => ({ id: s.id })) },
        },
      });
    }
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