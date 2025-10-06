export type ContactMessage = {
  id: string;
  timestamp: number;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  source: "contact_page" | "sticky_prompt";
};

export type EligibilityResult = {
  id: string;
  timestamp: number;
  form: any;
  result: any;
};

export type EmiCalculation = {
  id: string;
  timestamp: number;
  principal: number;
  annualRate: number; // in %
  tenureMonths: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
};

const KEYS = {
  contact: "contact_messages",
  eligibility: "eligibility_results",
  emi: "emi_calculations",
} as const;

type KeyType = typeof KEYS[keyof typeof KEYS];

function readList<T>(key: KeyType): T[] {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeList<T>(key: KeyType, list: T[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function addContactMessage(data: Omit<ContactMessage, "id" | "timestamp">) {
  const list = readList<ContactMessage>(KEYS.contact);
  const entry: ContactMessage = { id: makeId("msg"), timestamp: Date.now(), ...data };
  list.unshift(entry);
  writeList(KEYS.contact, list);
  return entry;
}

export function addEligibilityResult(data: Omit<EligibilityResult, "id" | "timestamp">) {
  const list = readList<EligibilityResult>(KEYS.eligibility);
  const entry: EligibilityResult = { id: makeId("elig"), timestamp: Date.now(), ...data };
  list.unshift(entry);
  writeList(KEYS.eligibility, list);
  return entry;
}

export function addEmiCalculation(data: Omit<EmiCalculation, "id" | "timestamp">) {
  const list = readList<EmiCalculation>(KEYS.emi);
  const entry: EmiCalculation = { id: makeId("emi"), timestamp: Date.now(), ...data };
  list.unshift(entry);
  writeList(KEYS.emi, list);
  return entry;
}

export function getAllContactMessages() {
  return readList<ContactMessage>(KEYS.contact);
}
export function getAllEligibilityResults() {
  return readList<EligibilityResult>(KEYS.eligibility);
}
export function getAllEmiCalculations() {
  return readList<EmiCalculation>(KEYS.emi);
}
