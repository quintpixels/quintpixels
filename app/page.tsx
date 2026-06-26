import { Navigation } from "@/components/Navigation";
import { connection } from "next/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StorytellingSection } from "@/components/sections/StorytellingSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  getHeroContent,
  getActiveServices,
  getPublishedProjects,
  getActiveProducts,
  getActiveTeamMembers,
} from "@/db/queries/content";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("home", {
    title: "Quint Pixels — Creative Technology Studio",
    description:
      "A cinematic technology studio building products, systems, and experiences at the intersection of design and engineering.",
  });
}

export default async function Home() {
  await connection();

  const [hero, dbServices, dbProjects, dbProducts, dbMembers] =
    await Promise.all([
      getHeroContent().catch(() => null),
      getActiveServices().catch(() => []),
      getPublishedProjects().catch(() => []),
      getActiveProducts().catch(() => []),
      getActiveTeamMembers().catch(() => []),
    ]);

  const normalizeTags = (tags: unknown): string[] => {
    if (Array.isArray(tags)) return tags as string[];
    if (typeof tags === "string") return tags.split(",").map((t) => t.trim()).filter(Boolean);
    return [];
  };

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

  const projects =
    dbProjects.length > 0
      ? dbProjects.map((p, i) => ({
          index: String(i + 1).padStart(2, "0"),
          category: p.category ?? "",
          title: p.title,
          sub: p.sub ?? p.description ?? "",
          tags: normalizeTags(p.tags),
          year: p.year ?? new Date().getFullYear().toString(),
          color: p.color ?? "#f0ede9",
          liveUrl: p.liveUrl ?? undefined,
        }))
      : undefined;

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

  const members =
    dbMembers.length > 0
      ? dbMembers.map((m, i) => ({
          index: String(i + 1).padStart(2, "0"),
          firstName: m.firstName,
          lastName: m.lastName,
          role: m.role,
          philosophy: m.philosophy ?? "",
          initials: m.initials,
          system: m.system ?? "",
          stack: normalizeTags(m.stack),
          accentHue: m.accentHue ?? "220 40% 14%",
        }))
      : undefined;

  return (
    <main className="relative">
      <Navigation />
      <HeroSection
        headline={hero?.headline ?? undefined}
        subheadline={hero?.subheadline ?? undefined}
        ctaPrimaryText={hero?.cta_primary_text ?? undefined}
        ctaPrimaryHref={hero?.cta_primary_href ?? undefined}
        ctaSecondaryText={hero?.cta_secondary_text ?? undefined}
        ctaSecondaryHref={hero?.cta_secondary_href ?? undefined}
      />
      <ServicesSection services={services} />
      <StorytellingSection />
      <PortfolioSection projects={projects} />
      <ProductsSection products={products} />
      <TeamSection members={members} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
