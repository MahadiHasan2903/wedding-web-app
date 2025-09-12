import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocationState {
  ip: string;
  country: string;
  countryCode: string;
  setLocation: (
    location: Partial<
      Omit<LocationState, "setLocation" | "clearLocation" | "getLocation">
    >
  ) => void;
  getLocation: () => { ip: string; country: string; countryCode: string };
  clearLocation: () => void;
}

const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      ip: "",
      country: "",
      countryCode: "",

      setLocation: (location) =>
        set((state) => ({
          ...state,
          ...location,
        })),

      getLocation: () => {
        const { ip, country, countryCode } = get();
        return { ip, country, countryCode };
      },

      clearLocation: () =>
        set(() => ({
          ip: "",
          country: "",
          countryCode: "",
        })),
    }),
    {
      name: "user-location-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLocationStore;
