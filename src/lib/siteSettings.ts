import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NavItem = { label: string; path: string };
export type ProcessStep = { title: string; description: string; icon: string };

export interface SiteSettingsState {
  brandName: string;
  heroTagline: string;
  heroTitle: string;
  heroHighlight: string;
  ctaText: string;
  steps: ProcessStep[];
  footerDescription: string;
  footerYear: number;
  nav: NavItem[];

  update: (patch: Partial<SiteSettingsState>) => void;
  updateStep: (index: number, patch: Partial<ProcessStep>) => void;
  addStep: (step: ProcessStep) => void;
  removeStep: (index: number) => void;
  updateNav: (index: number, patch: Partial<NavItem>) => void;
  addNav: (item: NavItem) => void;
  removeNav: (index: number) => void;
  resetDefaults: () => void;
}

const defaults: Omit<SiteSettingsState, "update" | "updateStep" | "addStep" | "removeStep" | "updateNav" | "addNav" | "removeNav" | "resetDefaults"> = {
  brandName: "UniCreds",
  heroTagline: "FUNDING DREAMS. FUELLING CAREERS.",
  heroTitle: "Get Education Loan in",
  heroHighlight: "48 hours*",
  ctaText: "Check your Eligibility",
  steps: [
    { title: "Check Loan Eligibility", description: "Quickly verify your loan eligibility online by following quick, easy steps!", icon: "1" },
    { title: "Upload Documents", description: "Submit your required documents digitally through our secure platform.", icon: "2" },
    { title: "Get Approved", description: "Receive loan approval within 48 hours from our partner lenders.", icon: "3" },
    { title: "Receive Funds", description: "Get your education loan disbursed directly to your account.", icon: "4" },
  ],
  footerDescription: "Making education financing accessible and affordable for students worldwide.",
  footerYear: 2024,
  nav: [
    { label: "Education Loan", path: "/education-loan" },
    { label: "Student Loan", path: "/student-loan" },
    { label: "Personal Loan", path: "/personal-loan" },
    { label: "Business Loan", path: "/business-loan" },
    { label: "Contact Us", path: "/contact" },
  ],
};

export const useSiteSettings = create<SiteSettingsState>()(
  persist(
    (set, get) => ({
      ...defaults,
      update: (patch) => set({ ...get(), ...patch }),
      updateStep: (index, patch) => set(({ steps }) => {
        const copy = [...steps];
        copy[index] = { ...copy[index], ...patch };
        return { steps: copy } as Partial<SiteSettingsState> as SiteSettingsState;
      }),
      addStep: (step) => set(({ steps }) => ({ steps: [...steps, step] } as any)),
      removeStep: (index) => set(({ steps }) => ({ steps: steps.filter((_, i) => i !== index) } as any)),
      updateNav: (index, patch) => set(({ nav }) => {
        const copy = [...nav];
        copy[index] = { ...copy[index], ...patch };
        return { nav: copy } as any;
      }),
      addNav: (item) => set(({ nav }) => ({ nav: [...nav, item] } as any)),
      removeNav: (index) => set(({ nav }) => ({ nav: nav.filter((_, i) => i !== index) } as any)),
      resetDefaults: () => set({ ...defaults }),
    }),
    { name: "unicreds-site-settings" }
  )
);
