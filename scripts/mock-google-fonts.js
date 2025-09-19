module.exports = {
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap': `
    /* Mocked Google Fonts CSS for offline builds */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/mock/inter-latin.woff2) format('woff2');
      unicode-range: U+0000-00FF;
    }
  `,
};
