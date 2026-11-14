import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080D18",
        panel: "#101827",
        accent: "#3B82F6",
        sky: "#38BDF8",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
};

export default config;
