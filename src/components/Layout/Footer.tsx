import { socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="my-8">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8 flex flex-col items-center gap-y-5 py-7 md:flex-row md:justify-between md:gap-x-8">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} André Marinho
        </p>

        <ul className="flex items-center gap-x-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-muted transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
