import { PageTitle } from '@/components/Heading';
import Section from '@/components/Section';
import MenuLinks from '@/components/layout/NavigationMenu/MenuLinks';

export default function NotFound() {
  return (
    <>
      <Section id="404">
        <PageTitle>Are you lost?</PageTitle>
        <p className="mt-6 text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
          The page you are looking for doesn&apos;t exist.
        </p>
        <h2 className="inline-block pb-6 text-lg">Here are some helpful links instead:</h2>
        <MenuLinks variant="notFound" />
        <p className="mt-6 text-lg font-extrabold">Error code: 404</p>
      </Section>
    </>
  );
}
