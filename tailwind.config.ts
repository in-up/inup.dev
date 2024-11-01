import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--slate-12)",
        secondary: "var(--slate-11)",
        alternative: "var(--slate-1)",
        brand: "var(--indigo-11)",
      },
      backgroundColor: {
        primary: "var(--slate-1)",
        secondary: "var(--slate-4)",
        secondaryA: "var(--slate-a4)",
        tertiary: "var(--slate-3)",
        blur: "var(--blurBackground)",
        header: "var(--headerBackground)",
        alternative: "var(--slate-12)",
        brand: "var(--indigo-11)",
      },
      borderColor: {
        primary: "var(--slate-6)",
      },
      ringOffsetColor: {
        primary: "var(--slate-12)",
      },
      keyframes: {
        in: {
          "0%": { transform: "translateY(18px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        in: "in .6s both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
