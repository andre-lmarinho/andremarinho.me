const lintStagedConfig = {
  '**/*.{js,ts,jsx,tsx,cjs,mjs,json,css,scss,md,mdx}': [
    'biome check --write --files-ignore-unknown=true',
  ],
};

export default lintStagedConfig;
