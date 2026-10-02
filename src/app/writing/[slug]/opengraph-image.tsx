import { getPost, getPosts } from "@/lib/writing";
import { renderOgImage } from "@/lib/og";

export const alt = "Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const params = (await getPosts()).map((post) => ({ slug: post.slug }));
  // Mirrors the placeholder in page.tsx: `output: "export"` needs one path.
  return params.length > 0 ? params : [{ slug: "no-posts-yet" }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage(post?.title ?? "Writing");
}
