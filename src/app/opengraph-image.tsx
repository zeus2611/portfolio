import { identity } from "@/content/profile";
import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Nischay, software engineer working on AI products and developer tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(identity.name);
}
