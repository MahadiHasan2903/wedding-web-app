import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xsm: "360px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#002F6C",
        secondary: "#FF736C",
        gray: "#E3E3E3",
        light: "#F4F4F4",
        red: "#C8102E",
        lightRed: "#FFE1E6",
        green: "#118C61",
        lightGreen: "#D0FFEF",
        textPrimary: "#D9D9D9",
        vipLight: "#F7E7CE",
        vipMedium: "#F5D199",
        vipHeavy: "#FF9F05",
      },
      backgroundImage: {
        landingHero: "url('/images/landing-page/epic-hero-background.png')",
        weddingCoupleScene:
          "url('/images/landing-page/wedding-couple-background.png')",
      },
    },
  },
  plugins: [],
};

export default config;
