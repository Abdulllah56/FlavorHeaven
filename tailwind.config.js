/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/*.html',        // HTML files directly in public folder
    './public/**/*.html',     // HTML files in public subfolders  
    './public/js/**/*.js',    // JS files in public/js folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}