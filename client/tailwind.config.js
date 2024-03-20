const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#f3f4f6",
        cyan: "#2aa198",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
      },
    },
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

          warning: "#FDAF7B",

          error: "#dc2626",
        },
      },
    ],
  },
});
