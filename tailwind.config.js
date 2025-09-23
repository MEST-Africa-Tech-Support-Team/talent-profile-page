// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'brown': ['Brown', 'sans-serif'],
                // Optional: Separate families if you want to use Reclin separately
                'brown-reclin': ['Brown', 'sans-serif'], // Or keep as Brown if they're similar
            },
            fontWeight: {
                // Extend fontWeight scale if needed
                'thin': 100,
                'light': 300,
                'normal': 400,
                'bold': 700,
            }
        },
    },
    plugins: [],
}