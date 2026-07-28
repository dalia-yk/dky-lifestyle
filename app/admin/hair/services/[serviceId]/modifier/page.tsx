import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { prisma } from "../../../../../../lib/prisma";

interface EditServicePageProps {
  params: Promise<{ serviceId: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { serviceId } = await params;
  const service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Modifier {service.name}</h1>
      <ServiceForm serviceId={service.id} initialValues={service} />
    </div>
  );
}