const siteUrl = 'https://andremarinho.me';
const siteName = 'Andre Marinho';
const defaultTitle = 'Andre Marinho - Front-End Developer';
const titleTemplate = 'Andre Marinho - %s';
const defaultDescription =
  'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.';
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined;

export { defaultDescription, defaultTitle, googleVerification, siteName, siteUrl, titleTemplate };
