const config = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f172a", // Slate-900
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#4f46e5", // Indigo-600
        },
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        lg: "0.75rem", // Rounded Corners أكتر بتدي طابع مودرن
      },
    },
  },
}