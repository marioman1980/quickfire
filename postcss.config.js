module.exports = {
  plugins: [
    require('postcss-import-ext-glob'),
    require('postcss-import'),
    require('postcss-for'),
    require('autoprefixer'),
    require('postcss-custom-media'),
    // require('tailwindcss'),
    require('postcss-nested'),
    // Example of how to exclude plugins by env
    // process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,
  ],
};
