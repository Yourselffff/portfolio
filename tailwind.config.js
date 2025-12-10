/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            cursor: {
                none: 'none',
            },
            fontFamily: {
                header: ['"Space Grotesk"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
