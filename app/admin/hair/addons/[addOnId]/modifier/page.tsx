import { notFound } from "next/navigation";
import { AddOnForm } from "@/components/admin/addon-form";
import { prisma } from "../../../../../../lib/prisma";

interface EditAddOnPageProps {
  params: Promise<{ addOnId: string }>;
}

export default async function EditAddOnPage({ params }: EditAddOnPageProps) {
  const { addOnId } = await params;
  const addOn = await prisma.addOn.findUnique({ where: { id: addOnId } });

  if (!addOn) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Modifier {addOn.name}</h1>
      <AddOnForm addOnId={addOn.id} initialName={addOn.name} initialPrice={addOn.price} />
      <AddOnForm addOnId={addOn.id} initialName={addOn.name} initialPrice={addOn.price} initialDuration={addOn.durationMinutes} />
    </div>
  );
}