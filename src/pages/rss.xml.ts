import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { postsMetadata } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
import { siteName, siteUrl } from "@/lib/site";

async function renderFeedContent(body: string, canonicalUrl: string) {
  const processor = await createSatteriMarkdownProcessor({
    syntaxHighlight: false,
    features: { smartPunctuation: false },
    hastPlugins: [
      {
        name: "absolute-feed-urls",
        element: {
          filter: ["a", "img"],
          visit(node, context) {
            for (const property of node.tagName === "a" ? ["href"] : ["src"]) {
              const value = node.properties[property];
              if (typeof value === "string") {
                context.setProperty(
                  node,
                  property,
                  new URL(value, canonicalUrl).href,
                );
              }
            }
          },
        },
      },
    ],
  });

  return (await processor.render(body)).code;
}

export async function GET({ site }: APIContext) {
  const posts = await getPosts();
  const items = await Promise.all(
    posts.map(async (post) => {
      const link = `${siteUrl}/posts/${post.slug}`;

      return {
        title: post.title,
        description: post.description,
        link,
        pubDate: new Date(`${post.date}T00:00:00Z`),
        categories: post.tags,
        content: await renderFeedContent(post.body, link),
      };
    }),
  );

  return rss({
    title: `${siteName} - Posts`,
    description: postsMetadata.description,
    site: site ?? new URL(siteUrl),
    trailingSlash: false,
    customData: "<language>en-us</language>",
    items,
  });
}
