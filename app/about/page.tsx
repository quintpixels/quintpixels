import { Navigation } from "@/components/Navigation";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackHomeLink } from "@/components/BackHomeLink";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("about", {
    title: "About — Quint Pixels",
    description:
      "A creative technology studio obsessed with the intersection of engineering and expressive design.",
  });
}

export default function AboutPage() {
  return (
    <main className="relative">
      <Navigation />
      <BackHomeLink />
      <div className="pt-28 pb-16 px-6 md:px-10 lg:px-16 bg-(--pix-white)">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
            About
          </span>
          <div className="h-px w-12 bg-(--pix-border)" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-(--pix-gray-light)">
            Creative Technology Studio
          </span>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-pixel text-display-lg text-(--pix-black) leading-none">
            THE STUDIO
          </h1>
        </div>
      </div>
      <AboutSection />
      <ContactSection />
    </main>
  );
}
