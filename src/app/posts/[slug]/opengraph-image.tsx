import { ImageResponse } from "next/og";
import OpengraphImage, {
  contentType,
  getFonts,
  size,
} from "@/components/OpengraphImage";
import { getPost, getPosts } from "@/lib/posts";

export { size, contentType };

// Next only accepts a static alt here, so it names the card rather than the
// post; the post title is already carried by og:title.
export const alt = "Writing by André Marinho";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return new ImageResponse(<OpengraphImage title="Writing" />, {
      ...size,
      fonts: await getFonts(),
    });
  }

  return new ImageResponse(
    <OpengraphImage title={post.title} description={post.description} />,
    { ...size, fonts: await getFonts() },
  );
}
