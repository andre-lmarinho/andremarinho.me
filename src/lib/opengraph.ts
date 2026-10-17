import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "@vercel/og";

const size = { width: 1200, height: 630 };
const fontDir = join(process.cwd(), "src/assets/fonts");

export async function createOpenGraphImage({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}) {
  const [archivo, archivoSemiBold, jetBrainsMono] = await Promise.all([
    readFile(join(fontDir, "Archivo-Regular.ttf")),
    readFile(join(fontDir, "Archivo-SemiBold.ttf")),
    readFile(join(fontDir, "JetBrainsMono-Regular.ttf")),
  ]);

  const card = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#070a11",
        fontFamily: "Archivo",
        padding: 72,
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 24 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: "#e2e8f0",
                    fontWeight: 600,
                    // Keep long titles clear of the description below them.
                    fontSize: title.length > 44 ? 68 : 84,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  },
                  children: title,
                },
              },
              description
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        color: "#94a3b8",
                        fontSize: 30,
                        lineHeight: 1.4,
                        maxWidth: 900,
                      },
                      children: description,
                    },
                  }
                : null,
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 22 },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    display: "flex",
                    height: 1,
                    backgroundColor: "#1e293b",
                    marginTop: 44,
                  },
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontFamily: "JetBrains Mono",
                    fontSize: 22,
                    color: "#22c55e",
                  },
                  children: `andremarinho.me${path}`,
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(
    card as ConstructorParameters<typeof ImageResponse>[0],
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, style: "normal", weight: 400 },
        {
          name: "Archivo",
          data: archivoSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "JetBrains Mono",
          data: jetBrainsMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
