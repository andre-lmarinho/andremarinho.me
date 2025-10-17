import { PageTitle } from '@/components/Heading';
import { NavigationLink } from '@/components/NavigationLink';

export default function NotFound() {
  return (
    <>
      <section id="404">
        <PageTitle>Are you lost?</PageTitle>
        <p className="mt-6 text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
          The page you are looking for doesn&apos;t exist.
        </p>
        <h2 className="inline-block pb-6 text-lg">Here are some helpful links instead:</h2>
        <NavigationLink variant="notFound" />
        <p className="mt-6 text-lg font-extrabold">Error code: 404</p>
      </section>
    </>
  );
}
