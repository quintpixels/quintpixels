import { getPageSeo } from "@/db/queries/content";
import type { Metadata } from "next";

export async function constructMetadata(
  pageKey: string,
  fallback: { title: string; description: string },
): Promise<Metadata> {
  const seo = await getPageSeo(pageKey).catch(() => null);

  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  const keywordsStr = seo?.keywords || "";
  const keywords = keywordsStr
    ? keywordsStr
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  const ogImage = seo?.ogImage || "/white-bgblack-logo.jpg";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
