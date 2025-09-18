export interface ThemeToggleOptions {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function themeToggle({ darkMode, setDarkMode }: ThemeToggleOptions) {
  setDarkMode(!darkMode);
}
