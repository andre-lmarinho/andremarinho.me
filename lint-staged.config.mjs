const lintStagedConfig = {
  '**/*.{js,ts,jsx,tsx}': [
    'prettier --write',
    'eslint --fix --max-warnings=0',
  ],
  '**/*.{mjs,cjs}': ['prettier --write'],
  '**/*.{json,md,css,scss}': ['prettier --write'],
};

export default lintStagedConfig;
