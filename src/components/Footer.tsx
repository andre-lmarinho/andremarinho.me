import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 transition-colors duration-500"
    >
      <div className="container mx-auto px-6 text-center">
        © {year} André Marinho
      </div>
    </footer>
  );
}
