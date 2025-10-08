import { ProductJsonLd as NextSeoProductJsonLd } from 'next-seo';
import { siteUrl, studioName } from '@/config/metadata';
import { studioPricingPlans } from '@/app/studio/components/Pricing';

const ProductJsonLd = () => (
  <>
    {studioPricingPlans.map(({ tier, description, price: { value, currency } }) => (
      <NextSeoProductJsonLd
        key={tier}
        productName={`${studioName} ${tier} plan`}
        description={description}
        offers={{
          price: value,
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
          url: `${siteUrl}/studio#pricing`,
          seller: {
            name: studioName,
          },
        }}
        useAppDir
      />
    ))}
  </>
);

export { ProductJsonLd };
