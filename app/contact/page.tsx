import { Navigation } from "@/components/Navigation";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackHomeLink } from "@/components/BackHomeLink";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("contact", {
    title: "Contact — Quint Pixels",
    description: "Start a conversation. Tell us about your next project.",
  });
}

export default function ContactPage() {
  return (
    <main className="relative">
      <Navigation />
      <BackHomeLink />
      <ContactSection />
    </main>
  );
}
