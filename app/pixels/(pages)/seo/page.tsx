import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllSeoMetadata } from "@/db/queries/content";
import { updateSeoMetadata } from "@/lib/actions/settings";
import { SeoEditor } from "./SeoEditor";

export default async function SeoPage() {
  const seoData = await getAllSeoMetadata().catch(() => []);

  const pages = [
    "home",
    "about",
    "services",
    "portfolio",
    "products",
    "contact",
  ];

  const seoMap = Object.fromEntries(seoData.map((s) => [s.page, s]));

  return (
    <>
      <AdminHeader
        title="SEO METADATA"
        subtitle="Per-page title, description, and OG tags"
      />
      <SeoEditor
        pages={pages}
        seoMap={seoMap}
        updateSeoMetadata={
          updateSeoMetadata as unknown as (
            page: string,
            data: {
              title?: string;
              description?: string;
              keywords?: string;
              ogImage?: string;
            },
          ) => Promise<void>
        }
      />
    </>
  );
}
