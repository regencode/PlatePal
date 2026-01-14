/** @type {import('tailwindcss').Config} */

module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                surface: "var(--surface)",
                primary: "var(--primary)",
                primaryForeground: "var(--primary-foreground)",
                text: "var(--text)"
            },
            fontFamily: {
                "sans": ["InterRegular"],
                "inter": ["InterRegular"],
                "inter-semibold": ["InterSemiBold"],
                "inter-bold": ["InterBold"],
                "inconsolata-medium": ["InconsolataMedium"],
                "inconsolata-regular": ["InconsolataRegular"],
                "inconsolata-semibold": ["InconsolataSemiBold"],
                "condensed-inconsolata-medium": ["CondensedInconsolataMedium"],
                "condensed-inconsolata-regular": ["CondensedInconsolataRegular"],
                "condensed-inconsolata-semibold": ["CondensedInconsolataSemiBold"],
                "condensed-inconsolata-bold": ["CondensedInconsolataBold"],
            },
        },
    },
    plugins: [],
}
