/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'hsl(210, 100%, 60%)',
                    dark: 'hsl(210, 100%, 50%)',
                    light: 'hsl(210, 100%, 90%)',
                },
                secondary: {
                    DEFAULT: 'hsl(160, 80%, 40%)',
                },
            },
        },
    },
    plugins: [],
}
