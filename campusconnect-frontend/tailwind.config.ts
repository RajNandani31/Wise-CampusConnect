import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f3f1e8",
        "cream-light": "#f5f3eb",
      },
    },
  },
  plugins: [],
};

export default config;
