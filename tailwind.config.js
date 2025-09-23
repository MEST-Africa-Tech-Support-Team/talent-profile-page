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
                'brown-reclin': ['Brown Reclin', 'sans-serif'],
            },
            // ... your other theme extensions
        },
    },
    plugins: [],
}