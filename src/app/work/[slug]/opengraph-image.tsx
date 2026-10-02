import { workItems } from "@/content/work";
import { renderOgImage } from "@/lib/og";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workItems.find((w) => w.slug === slug);
  return renderOgImage(item?.title ?? "Case study");
}
