"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createService, updateService } from "@/app/admin/hair/services/actions";
import { ImageUploader } from "./image-uploader";

interface ServiceFormValues {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  priceFrom: number;
  priceWithoutExtensions: number | null;
  extensionFee: number;
  extensionsMode: "REQUIRED" | "OPTIONAL" | "NOT_ALLOWED";
  requiresLength: boolean;
  requiresSize: boolean;
  category: "COLLECTION" | "HAIR_CARE" | "PREPARATION";
  collection: string;
  imageUrl: string | null;
}

const defaultValues: ServiceFormValues = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  duration: "",
  priceFrom: 0,
  priceWithoutExtensions: null,
  extensionFee: 0,
  extensionsMode: "OPTIONAL",
  requiresLength: true,
  requiresSize: true,
  category: "COLLECTION",
  collection: "",
  imageUrl: null,
};

export function ServiceForm({
  serviceId,
  initialValues,
}: {
  serviceId?: string;
  initialValues?: ServiceFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>(initialValues ?? defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(fields: Partial<ServiceFormValues>) {
    setValues((prev) => ({ ...prev, ...fields }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    if (serviceId) {
      await updateService(serviceId, values);
    } else {
      await createService(values);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors";
  const labelClass = "font-sans text-brand-ivory/70 text-sm mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div>
        <label className={labelClass}>Photo</label>
        <ImageUploader
          value={values.imageUrl}
          onChange={(url) => update({ imageUrl: url || null })}
          folder="dky-lifestyle/services"
        />
      </div>

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
        <label className={labelClass}>Slug (URL)</label>
        <input
          type="text"
          required
          value={values.slug}
          onChange={(e) => update({ slug: e.target.value })}
          placeholder="ex: knotless-braids"
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
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={3}
          value={values.description}
          onChange={(e) => update({ description: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Durée</label>
          <input
            type="text"
            required
            value={values.duration}
            onChange={(e) => update({ duration: e.target.value })}
            placeholder="ex: 4 à 6 heures"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Catégorie</label>
          <select
            value={values.category}
            onChange={(e) => update({ category: e.target.value as ServiceFormValues["category"] })}
            className={inputClass}
          >
            <option value="COLLECTION">Collections</option>
            <option value="HAIR_CARE">Soins Capillaires</option>
            <option value="PREPARATION">Préparation</option>
          </select>
        </div>
      </div>

      {values.category === "COLLECTION" && (
        <div>
          <label className={labelClass}>Collection (type de technique)</label>
          <select
            value={values.collection}
            onChange={(e) => update({ collection: e.target.value })}
            className={inputClass}
          >
            <option value="braids">Braids</option>
            <option value="twist">Twist</option>
            <option value="locs">Locs</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Prix (avec mèches)</label>
          <input
            type="number"
            required
            value={values.priceFrom}
            onChange={(e) => update({ priceFrom: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Prix sans mèches (optionnel)</label>
          <input
            type="number"
            value={values.priceWithoutExtensions ?? ""}
            onChange={(e) =>
              update({
                priceWithoutExtensions: e.target.value ? Number(e.target.value) : null,
              })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Mèches — mode</label>
        <select
          value={values.extensionsMode}
          onChange={(e) => update({ extensionsMode: e.target.value as ServiceFormValues["extensionsMode"] })}
          className={inputClass}
        >
          <option value="REQUIRED">Obligatoires</option>
          <option value="OPTIONAL">Optionnelles</option>
          <option value="NOT_ALLOWED">Non applicables</option>
        </select>
      </div>

      {values.extensionsMode !== "NOT_ALLOWED" && (
        <div>
          <label className={labelClass}>Supplément si DKY fournit les mèches ($)</label>
          <input
            type="number"
            value={values.extensionFee}
            onChange={(e) => update({ extensionFee: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
      )}

      <div className="flex gap-6">
        <label className="flex items-center gap-2 font-sans text-brand-ivory/70 text-sm">
          <input
            type="checkbox"
            checked={values.requiresSize}
            onChange={(e) => update({ requiresSize: e.target.checked })}
          />
          Demander la taille
        </label>
        <label className="flex items-center gap-2 font-sans text-brand-ivory/70 text-sm">
          <input
            type="checkbox"
            checked={values.requiresLength}
            onChange={(e) => update({ requiresLength: e.target.checked })}
          />
          Demander la longueur
        </label>
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          type="button"
          onClick={() => router.push("/admin/hair/services")}
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
          {isSubmitting ? "Enregistrement..." : serviceId ? "Enregistrer" : "Créer le service"}
        </Button>
      </div>
    </form>
  );
}