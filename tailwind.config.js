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
  //       light: {
  //         "color-base-100": "oklch(98% 0.001 106.423)",
  //         "color-base-200": "oklch(97% 0.001 106.424)",
  //         "color-base-300": "oklch(92% 0.003 48.717)",
  //         "color-base-content": "oklch(21% 0.006 56.043)",
  //         "color-primary": "oklch(58% 0.158 241.966)",
  //         "color-primary-content": "oklch(97% 0.013 236.62)",
  //         "color-secondary": "oklch(60% 0.118 184.704)",
  //         "color-secondary-content": "oklch(98% 0.014 180.72)",
  //         "color-accent": "oklch(59% 0.145 163.225)",
  //         "color-accent-content": "oklch(97% 0.021 166.113)",
  //         "color-neutral": "oklch(14% 0.004 49.25)",
  //         "color-neutral-content": "oklch(98% 0.001 106.423)",
  //         "color-info": "oklch(68% 0.169 237.323)",
  //         "color-info-content": "oklch(97% 0.013 236.62)",
  //         "color-success": "oklch(76% 0.233 130.85)",
  //         "color-success-content": "oklch(98% 0.031 120.757)",
  //         "color-warning": "oklch(79% 0.184 86.047)",
  //         "color-warning-content": "oklch(98% 0.026 102.212)",
  //         "color-error": "oklch(64% 0.246 16.439)",
  //         "color-error-content": "oklch(96% 0.015 12.422)",
  //       },
  //     },
  //   ],
  //   base: true,
  //   styled: true,
  //   utils: true,
  //   prefix: "",
  //   logs: true,
  //   themeRoot: ":root",
  // },
};
