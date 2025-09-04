// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: '#4A90E2', // Soft blue for buttons and highlights
        secondary: '#50C878', // Green for positive actions (e.g., success)
        accent: '#F5A623', // Warm yellow for attention (e.g., calls to action)
        background: '#F9F9F9', // Light gray background for a clean look
        text: '#333333', // Dark gray for main text
        muted: '#666666', // Lighter gray for secondary text
        error: '#E63946', // Red for errors
      },
      fontFamily: {
        sans: ['"Open Sans", sans-serif'], // Friendly and readable font
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      spacing: {
        '7': '1.75rem',
        '9': '2.25rem',
        '15': '3.75rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};