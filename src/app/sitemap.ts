import type { MetadataRoute } from "next";
import { identity } from "@/content/profile";
import { workItems } from "@/content/work";
import { getPublishedPosts } from "@/lib/writing";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const url = (path: string) => `${identity.domain}${path}`;

  return [
    // No trailing slash, to match the canonical URL Next emits for the root.
    { url: identity.domain },
    ...workItems.map((item) => ({ url: url(`/work/${item.slug}`) })),
    // The writing index is listed only once it has something on it.
    ...(posts.length > 0 ? [{ url: url("/writing") }] : []),
    ...posts.map((post) => ({ url: url(`/writing/${post.slug}`), lastModified: post.date })),
  ];
}
