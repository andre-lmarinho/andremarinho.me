import fs from 'node:fs';
import path from 'node:path';

describe('Dark mode configuration', () => {
  it('uses the dark mode toggle selector in global styles', () => {
    const cssPath = path.join(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('html:has(#dark-mode-toggle:checked)');
  });

  it('configures Tailwind to rely on the toggle selector for dark mode', () => {
    const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.mjs');
    const configContent = fs.readFileSync(tailwindConfigPath, 'utf-8');

    expect(configContent).toContain(
      "darkMode: ['selector', 'html:has(#dark-mode-toggle:checked)']"
    );
  });
});
