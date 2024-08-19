/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#152036', // Donkerblauw voor hoofdtekst en knoppen
        secondary: '#304878', // Blauw voor achtergrond en randen
        accent: '#465267', // Grijsblauw voor hover-effecten
        lightGray: '#f0f0f0', // Lichtgrijs voor achtergrond
        white: '#ffffff', // Wit voor tekst en achtergrond
        black: '#000000', // Zwart voor tekst en schaduwen
        transparent: 'transparent', // Transparantie
        hoverDarkRed: '#550000', // Diep donkerrood voor hover effecten
        hoverBlue: '#3b82f6', // Blauw voor hover-effecten
        lightBlue: '#b3d1ff', // Lichtblauw voor disabled elementen
        midGray: '#e8e8e8', // Middengrijs voor achtergrond
      },
    },
  },
  plugins: [],
};
