"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createPackage, updatePackage } from "@/app/admin/hair/packages/actions";

interface AddOnOption {
  id: string;
  name: string;
}

interface ServiceOption {
  id: string;
  name: string;
}

interface PackageFormValues {
  name: string;
  tagline: string;
  featured: boolean;
  price: number;
  includesPremiumHair: boolean;
  includedAddOnIds: string[];
  compatibleServiceIds: string[];
}

export function PackageForm({
  packageId,
  initialValues,
  allAddOns,
  allServices,
}: {
  packageId?: string;
  initialValues?: PackageFormValues;
  allAddOns: AddOnOption[];
  allServices: ServiceOption[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<PackageFormValues>(
    initialValues ?? {
      name: "",
      tagline: "",
      featured: false,
      price: 0,
      includesPremiumHair: false,
      includedAddOnIds: [],
      compatibleServiceIds: [],
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(fields: Partial<PackageFormValues>) {
    setValues((prev) => ({ ...prev, ...fields }));
  }

  function toggleAddOn(id: string) {
    const isSelected = values.includedAddOnIds.includes(id);
    update({
      includedAddOnIds: isSelected
        ? values.includedAddOnIds.filter((a) => a !== id)
        : [...values.includedAddOnIds, id],
    });
  }

  function toggleService(id: string) {
    const isSelected = values.compatibleServiceIds.includes(id);
    update({
      compatibleServiceIds: isSelected
        ? values.compatibleServiceIds.filter((s) => s !== id)
        : [...values.compatibleServiceIds, id],
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    if (packageId) {
      await updatePackage(packageId, values);
    } else {
      await createPackage(values);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors";
  const labelClass = "font-sans text-brand-ivory/70 text-sm mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div>
        <label className={labelClass}>Nom</label>
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) => update({ name: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tagline</label>
        <input
          type="text"
          required
          value={values.tagline}
          onChange={(e) => update({ tagline: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Prix fixe ($)</label>
        <input
          type="number"
          required
          value={values.price}
          onChange={(e) => update({ price: Number(e.target.value) })}
          className={inputClass}
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 font-sans text-brand-ivory/70 text-sm">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => update({ featured: e.target.checked })}
          />
          Mettre en avant (badge &quot;Populaire&quot;)
        </label>
        <label className="flex items-center gap-2 font-sans text-brand-ivory/70 text-sm">
          <input
            type="checkbox"
            checked={values.includesPremiumHair}
            onChange={(e) => update({ includesPremiumHair: e.target.checked })}
          />
          Inclut les mèches premium DKY
        </label>
      </div>

      <div>
        <label className={labelClass}>Add-ons inclus</label>
        <div className="flex flex-col gap-2 bg-white/5 border border-brand-ivory/20 rounded-lg p-4 max-h-48 overflow-y-auto">
          {allAddOns.map((addOn) => (
            <label key={addOn.id} className="flex items-center gap-2 font-sans text-brand-ivory/80 text-sm">
              <input
                type="checkbox"
                checked={values.includedAddOnIds.includes(addOn.id)}
                onChange={() => toggleAddOn(addOn.id)}
              />
              {addOn.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Services compatibles</label>
        <div className="flex flex-col gap-2 bg-white/5 border border-brand-ivory/20 rounded-lg p-4 max-h-48 overflow-y-auto">
          {allServices.map((service) => (
            <label key={service.id} className="flex items-center gap-2 font-sans text-brand-ivory/80 text-sm">
              <input
                type="checkbox"
                checked={values.compatibleServiceIds.includes(service.id)}
                onChange={() => toggleService(service.id)}
              />
              {service.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          type="button"
          onClick={() => router.push("/admin/hair/packages")}
          variant="outline"
          className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-60"
        >
          {isSubmitting ? "Enregistrement..." : packageId ? "Enregistrer" : "Créer le forfait"}
        </Button>
      </div>
    </form>
  );
}