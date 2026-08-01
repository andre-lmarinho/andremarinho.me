type JsonLdProps = { data: Record<string, unknown> };

export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped and generated from trusted site data.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
