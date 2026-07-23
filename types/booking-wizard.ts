export interface BookingWizardData {
  collection: "braids" | "twist" | "locs" | null;
  serviceId: string | null;
  size: "petite" | "medium" | "large" | null;
  length: "shoulder" | "mid-back" | "waist" | null;
  hairOption: "client-provides" | "dky-provides" | "none" | null;
  hairColor: string | null;
  addOnIds: string[];
  packageId: string | null;
  locationType: "SALON" | "HOME";
  address: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

export const initialWizardData: BookingWizardData = {
  collection: null,
  serviceId: null,
  size: null,
  length: null,
  hairOption: null,
  hairColor: null,
  addOnIds: [],
  packageId: null,
  locationType: "SALON",
  address: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
};