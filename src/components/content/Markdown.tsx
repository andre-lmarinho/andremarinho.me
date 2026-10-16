import Markdown from "markdown-to-jsx/react";
import type { ComponentProps } from "react";
import Link from "@/components/IntentLink";
import { siteUrl } from "@/lib/seo";

function ContentLink({ href = "", ...props }: ComponentProps<"a">) {
  if (URL.parse(href, siteUrl)?.origin === siteUrl) {
    return <Link {...props} href={href} />;
  }
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" />;
}

export default function MarkdownContent({ children }: { children: string }) {
  return (
    <Markdown
      className="prose"
      options={{ forceWrapper: true, overrides: { a: ContentLink } }}
    >
      {children}
    </Markdown>
  );
}
