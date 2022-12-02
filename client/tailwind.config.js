/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./components/**/*.{js,ts,jsx,tsx,scss}",
        "./app/**/*.{js,ts,jsx,tsx,scss}"
    ],
    theme: {
        colors: {
            light: {background: `#FDFDFD`, text: `#1778F2`},
            dark: {background: `#323232`, text: `#F0F0F0`},
            red: `#EC0A26`,
            blue: `#1778F2`,
            inactive: `#BEC4C9`,
        }
    },
    plugins: [],
}