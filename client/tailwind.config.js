/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f59e0b",

          secondary: "#FFAD69",

          accent: "#fef9c3",

          neutral: "#646266",

          "base-100": "#ffff",

          info: "#2563eb",

          success: "#4ade80",

          warning: "#facc15",

          error: "#dc2626",
        },
      },
    ],
  },
};
