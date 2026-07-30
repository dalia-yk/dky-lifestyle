import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Nouveau service</h1>
      <ServiceForm />
    </div>
  );
}