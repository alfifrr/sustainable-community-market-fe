/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [
  //     {
  //       custom: {
  //         "base-100": "oklch(98% 0.001 106.423)",
  //         "base-200": "oklch(97% 0.001 106.424)",
  //         "base-300": "oklch(92% 0.003 48.717)",
  //         "base-content": "oklch(21% 0.006 56.043)",
  //         primary: "oklch(58% 0.158 241.966)",
  //         "primary-content": "oklch(97% 0.013 236.62)",
  //         secondary: "oklch(60% 0.118 184.704)",
  //         "secondary-content": "oklch(98% 0.014 180.72)",
  //         accent: "oklch(59% 0.145 163.225)",
  //         "accent-content": "oklch(97% 0.021 166.113)",
  //         neutral: "oklch(14% 0.004 49.25)",
  //         "neutral-content": "oklch(98% 0.001 106.423)",
  //         info: "oklch(68% 0.169 237.323)",
  //         "info-content": "oklch(97% 0.013 236.62)",
  //         success: "oklch(76% 0.233 130.85)",
  //         "success-content": "oklch(98% 0.031 120.757)",
  //         warning: "oklch(79% 0.184 86.047)",
  //         "warning-content": "oklch(98% 0.026 102.212)",
  //         error: "oklch(64% 0.246 16.439)",
  //         "error-content": "oklch(96% 0.015 12.422)",
  //       },
  //     },
  //   ],
  //   base: true,
  //   styled: true,
  //   utils: true,
  //   rtl: false,
  //   prefix: "",
  //   logs: true,
  //   themeRoot: ":root",
  // },
};
