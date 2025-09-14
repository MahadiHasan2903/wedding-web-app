import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Language = "en" | "fr" | "es";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  clearLanguage: () => void;
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      clearLanguage: () => set({ language: "en" }),
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLanguageStore;
