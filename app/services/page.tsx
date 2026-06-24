import { Navigation } from "@/components/Navigation";
import { connection } from "next/server";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackHomeLink } from "@/components/BackHomeLink";
import { getActiveServices } from "@/db/queries/content";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("services", {
    title: "Services — Quint Pixels",
    description:
      "Full-service creative technology — from web apps to AI integrations.",
  });
}

export default async function ServicesPage() {
  await connection();

  const dbServices = await getActiveServices().catch(() => []);
  const normalizeTags = (t: unknown): string[] =>
    Array.isArray(t) ? (t as string[]) : typeof t === "string" ? (t as string).split(",").map((s) => s.trim()).filter(Boolean) : [];
  const services =
    dbServices.length > 0
      ? dbServices.map((s, i) => ({
          num: String(i + 1).padStart(2, "0"),
          title: s.title,
          desc: s.description,
          icon: s.icon ?? undefined,
          tags: normalizeTags(s.tags),
        }))
      : undefined;

  return (
    <main className="relative">
      <Navigation />
      <BackHomeLink />
      <div className="pt-28 pb-16 px-6 md:px-10 lg:px-16 bg-(--pix-white)">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
            Services
          </span>
          <div className="h-px w-12 bg-(--pix-border)" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-(--pix-gray-light)">
            Full-Service Studio
          </span>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-pixel text-display-lg text-(--pix-black) leading-none">
            WHAT WE DO
          </h1>
        </div>
      </div>
      <ServicesSection services={services} />
      <ContactSection />
    </main>
  );
}
