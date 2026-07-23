"use client";

import { useMemo, useState } from "react";
import {
  BookingWizardData,
  initialWizardData,
} from "@/types/booking-wizard";
import { StepServiceSelection } from "./step-service-selection";
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
  duration: string;
  collection: string;
  extensionFee: number;
  extensionsMode: "REQUIRED" | "OPTIONAL" | "NOT_ALLOWED";
  requiresLength: boolean;
  requiresSize: boolean;
  priceWithoutExtensions: number | null;
}

interface BookingWizardProps {
  services: ServiceOption[];
  preselectedServiceId?: string;
  mode?: "create" | "edit";
  bookingId?: string;
  initialData?: BookingWizardData;
}

type StepKey =
  | "service"
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
  preselectedServiceId,
  mode = "create",
  bookingId,
  initialData,
}: BookingWizardProps) {
  const preselected = services.find((s) => s.id === preselectedServiceId);

  const [data, setData] = useState<BookingWizardData>(
    initialData ?? {
      ...initialWizardData,
      serviceId: preselected?.id ?? null,
      collection:
        (preselected?.collection as BookingWizardData["collection"]) ?? null,
    }
  );

  const selectedService = services.find((s) => s.id === data.serviceId);

  // Calcule la liste des étapes pertinentes pour CE service précis, à cet instant
  const visibleSteps = useMemo<StepKey[]>(() => {
    const stepsList: StepKey[] = ["service"];

    if (selectedService) {
      if (selectedService.extensionsMode === "OPTIONAL") {
        stepsList.push("extensionsChoice");
      }
      if (
        selectedService.extensionsMode !== "NOT_ALLOWED" &&
        data.hairOption !== "none"
      ) {
        stepsList.push("hairOption");
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
  }, [selectedService, data.hairOption]);

  const [currentIndex, setCurrentIndex] = useState(preselected ? 1 : 0);

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
          {selectedService && (
            <span className="font-sans text-brand-champagne text-xs">
              {selectedService.name}
            </span>
          )}
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
        <StepAddOns data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
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
        <StepSummary data={data} services={services} onBack={goBack} mode={mode} bookingId={bookingId} />
      )}
    </div>
  );
}