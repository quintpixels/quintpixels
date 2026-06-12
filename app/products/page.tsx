import { Navigation } from "@/components/Navigation";
import { connection } from "next/server";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackHomeLink } from "@/components/BackHomeLink";
import { getActiveProducts } from "@/db/queries/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Quint Pixels",
  description:
    "Internal products and tools built for the modern engineering team.",
};

export default async function ProductsPage() {
  await connection();

  const dbProducts = await getActiveProducts().catch(() => []);
  const products =
    dbProducts.length > 0
      ? dbProducts.map((p, i) => ({
          id: `P${String(i + 1).padStart(2, "0")}`,
          name: p.name,
          type: p.type ?? "",
          desc: p.description,
          icon: p.icon ?? undefined,
          status: p.status ?? "Available",
          learnMoreUrl: p.learnMoreUrl ?? undefined,
        }))
      : undefined;

  return (
    <main className="relative">
      <Navigation />
      <BackHomeLink />
      <div className="pt-28 pb-16 px-6 md:px-10 lg:px-16 bg-(--pix-surface)">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
            Products
          </span>
          <div className="h-px w-12 bg-(--pix-border)" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-(--pix-gray-light)">
            Tools We Shipped
          </span>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-pixel text-display-lg text-(--pix-black) leading-none">
            OUR
            <br />
            PRODUCTS
          </h1>
        </div>
      </div>
      <ProductsSection products={products} />
      <ContactSection />
    </main>
  );
}
