"use client";

import { useMemo, useState } from "react";
import {
  BookingWizardData,
  initialWizardData,
} from "@/types/booking-wizard";
import { StepServiceSelection } from "./step-service-selection";
import { StepPackage } from "./step-package";
import { StepExtensionsChoice } from "./step-extensions-choice";
import { StepHairOption } from "./step-hair-option";
import { StepHairColor } from "./step-hair-color";
import { StepSize } from "./step-size";
import { StepLength } from "./step-length";
import { StepAddOns } from "./step-addons";
import { StepLocation } from "./step-location";
import { StepDateTime } from "./step-datetime";
import { StepPersonalInfo } from "./step-personal-info";
import { StepSummary } from "./step-summary";

interface ServiceOption {
  id: string;
  name: string;
  priceFrom: number;
  priceWithoutExtensions: number | null;
  duration: string;
  collection: string;
  extensionFee: number;
  extensionsMode: "REQUIRED" | "OPTIONAL" | "NOT_ALLOWED";
  requiresLength: boolean;
  requiresSize: boolean;
  category: "COLLECTION" | "HAIR_CARE" | "PREPARATION";
}

interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

interface PackageOption {
  id: string;
  name: string;
  tagline: string;
  featured: boolean;
  price: number;
  includesPremiumHair: boolean;
  includedAddOns: { id: string; name: string }[];
  compatibleServices: { id: string }[];
}

interface BookingWizardProps {
  services: ServiceOption[];
  addOns: AddOnOption[];
  packages: PackageOption[];
  preselectedServiceId?: string;
  preselectedPackageId?: string;
  mode?: "create" | "edit";
  bookingId?: string;
  initialData?: BookingWizardData;
}

type StepKey =
  | "service"
  | "package"
  | "extensionsChoice"
  | "hairOption"
  | "hairColor"
  | "size"
  | "length"
  | "addons"
  | "location"
  | "datetime"
  | "personalInfo"
  | "summary";

export function BookingWizard({
  services,
  addOns,
  packages,
  preselectedServiceId,
  preselectedPackageId,
  mode = "create",
  bookingId,
  initialData,
}: BookingWizardProps) {
  const preselectedService = services.find((s) => s.id === preselectedServiceId);
  const preselectedPackage = packages.find((p) => p.id === preselectedPackageId);

  const [data, setData] = useState<BookingWizardData>(
    initialData ?? {
      ...initialWizardData,
      serviceId: preselectedService?.id ?? null,
      collection:
        (preselectedService?.collection as BookingWizardData["collection"]) ?? null,
      packageId: preselectedPackage?.id ?? null,
      hairOption: preselectedPackage?.includesPremiumHair ? "dky-provides" : null,
    }
  );

  const selectedService = services.find((s) => s.id === data.serviceId);
  const selectedPackage = packages.find((p) => p.id === data.packageId);

  const compatiblePackages = useMemo(() => {
    if (!selectedService) return [];
    return packages.filter((pkg) =>
      pkg.compatibleServices.some((s) => s.id === selectedService.id)
    );
  }, [packages, selectedService]);

  const lockedAddOnIds = useMemo(() => {
    return selectedPackage ? selectedPackage.includedAddOns.map((a) => a.id) : [];
  }, [selectedPackage]);

  const visibleSteps = useMemo<StepKey[]>(() => {
    const stepsList: StepKey[] = ["service"];

    if (selectedService) {
      if (compatiblePackages.length > 0 && !preselectedPackage) {
        stepsList.push("package");
      }

      const skipHairQuestions = selectedPackage?.includesPremiumHair ?? false;

      if (!skipHairQuestions) {
        if (selectedService.extensionsMode === "OPTIONAL") {
          stepsList.push("extensionsChoice");
        }
        if (
          selectedService.extensionsMode !== "NOT_ALLOWED" &&
          data.hairOption !== "none"
        ) {
          stepsList.push("hairOption");
        }
      }

      if (data.hairOption === "dky-provides") {
        stepsList.push("hairColor");
      }
      if (selectedService.requiresSize) {
        stepsList.push("size");
      }
      if (selectedService.requiresLength) {
        stepsList.push("length");
      }
    }

    stepsList.push("addons", "location", "datetime", "personalInfo", "summary");
    return stepsList;
  }, [selectedService, selectedPackage, compatiblePackages, data.hairOption, preselectedPackage]);

  const [currentIndex, setCurrentIndex] = useState(preselectedService ? 1 : 0);

  function updateData(fields: Partial<BookingWizardData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function goNext() {
    setCurrentIndex((i) => Math.min(i + 1, visibleSteps.length - 1));
  }

  function goBack() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  const currentKey = visibleSteps[currentIndex];

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between mb-2">
          <span className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest">
            Étape {currentIndex + 1} / {visibleSteps.length}
          </span>
          <div className="flex gap-2 items-center">
            {selectedPackage && (
              <span className="font-sans text-brand-champagne text-xs">
                {selectedPackage.name}
              </span>
            )}
            {selectedService && (
              <span className="font-sans text-brand-ivory/60 text-xs">
                {selectedService.name}
              </span>
            )}
          </div>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-champagne transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / visibleSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {currentKey === "service" && (
        <StepServiceSelection services={services} data={data} updateData={updateData} onNext={goNext} />
      )}
      {currentKey === "package" && (
        <StepPackage data={data} updateData={updateData} onNext={goNext} onBack={goBack} packages={compatiblePackages} />
      )}
      {currentKey === "extensionsChoice" && (
        <StepExtensionsChoice data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "hairOption" && (
        <StepHairOption data={data} updateData={updateData} onNext={goNext} onBack={goBack} extensionFee={selectedService?.extensionFee ?? 0} />
      )}
      {currentKey === "hairColor" && (
        <StepHairColor data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "size" && (
        <StepSize data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "length" && (
        <StepLength data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "addons" && (
        <StepAddOns data={data} updateData={updateData} onNext={goNext} onBack={goBack} addOns={addOns} lockedAddOnIds={lockedAddOnIds} />
      )}
      {currentKey === "location" && (
        <StepLocation data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "datetime" && (
        <StepDateTime data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "personalInfo" && (
        <StepPersonalInfo data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentKey === "summary" && (
        <StepSummary data={data} services={services} addOns={addOns} packages={packages} onBack={goBack} mode={mode} bookingId={bookingId} />
      )}
    </div>
  );
}