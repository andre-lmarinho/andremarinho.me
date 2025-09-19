const fs = require('fs');
const path = require('path');

const presetDir = path.join(process.cwd(), 'node_modules', '@tailwindcss', 'postcss');
const hasTailwindPreset =
  fs.existsSync(path.join(presetDir, 'package.json')) || fs.existsSync(`${presetDir}.js`);

module.exports = hasTailwindPreset
  ? {
      plugins: {
        tailwindcss: require('@tailwindcss/postcss'),
      },
    }
  : {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
