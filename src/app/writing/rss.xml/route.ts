import { identity } from "@/content/profile";
import { getPublishedPosts } from "@/lib/writing";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Published only, even in dev: the feed should show what production will.
  const posts = await getPublishedPosts();
  const site = identity.domain;

  const items = posts
    .map((post) => {
      const url = `${site}/writing/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(identity.name)} — Writing</title>
    <link>${site}/writing</link>
    <description>Engineering write-ups by ${escapeXml(identity.name)}.</description>
    <language>en</language>
    <atom:link href="${site}/writing/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
