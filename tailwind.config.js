// tailwind.config.js

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', // Specify the paths to all files that contain Tailwind CSS classes
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'], // Define the 'Open Sans' font family with a fallback to generic sans-serif
      },
      gridTemplateColumns: {
        '1/5': '1fr 5fr', // Define a custom grid template with one fraction unit for the first column and five fraction units for the second column
      },
    },
  },
  plugins: [require("@tailwindcss/forms")], // Leave this array empty if you're not using any Tailwind CSS plugins
};
