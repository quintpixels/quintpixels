import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import {
  heroContent,
  navigationItems,
  services,
  portfolioProjects,
  products,
  teamMembers,
  testimonials,
} from "./schema/content";

const conn = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(conn, { schema });

async function seed() {
  console.log("🌱 Seeding database...\n");

    console.log("→ Hero content");
  await db.delete(heroContent);
  await db.insert(heroContent).values({
    headline: "WE ARE\nTHE PIXELS",
    subheadline:
      "A cinematic technology studio building products, systems, and experiences at the intersection of design and engineering.",
    cta_primary_text: "View Our Work",
    cta_primary_href: "/portfolio",
    cta_secondary_text: "Start a Project",
    cta_secondary_href: "/contact",
  });

    console.log("→ Navigation items");
  await db.delete(navigationItems);
  const navItems = [
    { href: "/", label: "Home", index: "00", order: 0 },
    { href: "/about", label: "About", index: "01", order: 1 },
    { href: "/services", label: "Services", index: "02", order: 2 },
    { href: "/portfolio", label: "Portfolio", index: "03", order: 3 },
    { href: "/products", label: "Products", index: "04", order: 4 },
    { href: "/contact", label: "Contact", index: "05", order: 5 },
  ];
  await db.insert(navigationItems).values(navItems);

    console.log("→ Services");
  await db.delete(services);
  const serviceData = [
    {
      num: "01",
      title: "Web Application Development",
      description:
        "Full-stack web applications engineered for scale, performance, and user delight. From SaaS platforms to internal tools, we ship with precision.",
      icon: "Monitor",
      tags: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"],
      order: 0,
    },
    {
      num: "02",
      title: "Mobile Application Development",
      description:
        "Native-quality iOS and Android applications built with React Native and Expo. Fluid animations, offline-first architecture, and App Store-ready polish.",
      icon: "AppWindow",
      tags: ["React Native", "Expo", "iOS", "Android", "Firebase"],
      order: 1,
    },
    {
      num: "03",
      title: "AI & Machine Learning Integration",
      description:
        "Intelligent systems that augment your product. From LLM integrations and RAG pipelines to custom model training and inference APIs.",
      icon: "Sparkles",
      tags: ["OpenAI", "LangChain", "Python", "Vector DBs", "FastAPI"],
      order: 2,
    },
    {
      num: "04",
      title: "Cloud Infrastructure & DevOps",
      description:
        "Scalable, resilient cloud infrastructure designed for zero-downtime deployments. We architect, automate, and monitor everything end-to-end.",
      icon: "Cpu",
      tags: ["AWS", "GCP", "Kubernetes", "Terraform", "CI/CD"],
      order: 3,
    },
    {
      num: "05",
      title: "UI/UX Design Systems",
      description:
        "Design that communicates intent before a word is read. We build cohesive design systems that accelerate product velocity and elevate brand perception.",
      icon: "Code2",
      tags: ["Figma", "Framer", "Motion Design", "Accessibility", "Tokens"],
      order: 4,
    },
    {
      num: "06",
      title: "Backend Systems & APIs",
      description:
        "High-throughput APIs, event-driven architectures, and data pipelines built to last. Microservices or monolith — we optimize for your operational reality.",
      icon: "Database",
      tags: ["GraphQL", "REST", "gRPC", "Kafka", "Redis"],
      order: 5,
    },
  ];
  await db.insert(services).values(serviceData);

    console.log("→ Portfolio projects");
  await db.delete(portfolioProjects);
  const portfolioData = [
    {
      index: "001",
      category: "SaaS Platform",
      title: "Nexus",
      slug: "nexus",
      sub: "Collaborative project intelligence for distributed teams",
      description:
        "A real-time project management platform built for async-first teams. Features AI-powered workload prediction, native video annotations, and a graph-based dependency engine.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "AI", "Real-time"],
      year: "2024",
      color: "#1a1a2e",
      featured: true,
      status: "published",
      order: 0,
    },
    {
      index: "002",
      category: "Mobile App",
      title: "Aurum",
      slug: "aurum",
      sub: "Personal finance OS for the new economy",
      description:
        "A mobile-first finance tracker with intelligent categorisation, predictive budgeting, and a beautiful data visualisation layer. 50K+ users in first month.",
      tags: ["React Native", "Expo", "Plaid API", "Charts"],
      year: "2024",
      color: "#1c1a14",
      featured: true,
      status: "published",
      order: 1,
    },
    {
      index: "003",
      category: "AI Platform",
      title: "Cognify",
      slug: "cognify",
      sub: "Enterprise knowledge graph with conversational AI",
      description:
        "An internal knowledge management platform using RAG pipelines to make institutional knowledge queryable in natural language. Reduced onboarding time by 60%.",
      tags: ["LLMs", "Vector Search", "Python", "Next.js", "RAG"],
      year: "2024",
      color: "#0d1a0d",
      featured: false,
      status: "published",
      order: 2,
    },
    {
      index: "004",
      category: "E-Commerce",
      title: "Verity",
      slug: "verity",
      sub: "Luxury retail platform with AR product preview",
      description:
        "A premium e-commerce experience for a luxury fashion house. AR try-on powered by WebXR, 3D product views, and sub-100ms checkout flow.",
      tags: ["Next.js", "WebXR", "Three.js", "Stripe", "Headless CMS"],
      year: "2023",
      color: "#1a1215",
      featured: false,
      status: "published",
      order: 3,
    },
    {
      index: "005",
      category: "Web Platform",
      title: "Strata",
      slug: "strata",
      sub: "Real estate data intelligence for institutional investors",
      description:
        "A B2B SaaS platform aggregating real estate market signals, risk scores, and deal flow for institutional investors managing $2B+ AUM.",
      tags: ["React", "D3.js", "FastAPI", "PostgreSQL", "ETL"],
      year: "2023",
      color: "#10161a",
      featured: false,
      status: "published",
      order: 4,
    },
    {
      index: "006",
      category: "Design System",
      title: "Forma",
      slug: "forma",
      sub: "Open-source design system used by 200+ product teams",
      description:
        "A comprehensive design system with 300+ components, dark/light theming, motion guidelines, and Figma/code parity. Now maintained as open-source.",
      tags: ["React", "Tailwind", "Storybook", "Figma", "Open Source"],
      year: "2023",
      color: "#0f0f1a",
      featured: false,
      status: "published",
      order: 5,
    },
    {
      index: "007",
      category: "Infrastructure",
      title: "Atlas",
      slug: "atlas",
      sub: "Zero-downtime deployment platform for regulated industries",
      description:
        "A Kubernetes-native deployment platform built for fintech and healthtech. Automated compliance auditing, blue-green deployments, and real-time observability.",
      tags: ["Kubernetes", "Go", "Terraform", "Prometheus", "eBPF"],
      year: "2022",
      color: "#0a1218",
      featured: false,
      status: "published",
      order: 6,
    },
  ];
  await db.insert(portfolioProjects).values(portfolioData);

    console.log("→ Products");
  await db.delete(products);
  const productData = [
    {
      productId: "P-001",
      name: "QuintFlow",
      type: "Project Management & Collaboration",
      description:
        "A streamlined workspace to create, assign, and track time-sensitive tasks, featuring built-in team chat for seamless communication.",
      icon: "Network",
      status: "Available",
      learnMoreUrl: "/products/quintflow",
      order: 0,
    },
    {
      productId: "P-002",
      name: "QuintTickets",
      type: "Event Management & Ticketing",
      description:
        "An end-to-end event platform for organizers to list and promote events, featuring seamless ticket booking, real-time availability, and role-based dashboards.",
      icon: "Layers",
      status: "Beta",
      learnMoreUrl: "/products/quinttickets",
      order: 1,
    },
    {
      productId: "P-003",
      name: "QuintEduDeck",
      type: "School Management System (ERP)",
      description:
        "A comprehensive school management platform featuring instant QR-based attendance tracking, academic management, and administrative tools for modern campuses.",
      icon: "Layers",
      status: "Available",
      learnMoreUrl: "/products/quintedudeck",
      order: 2,
    },
  ];
  await db.insert(products).values(productData);

    console.log("→ Team members");
  await db.delete(teamMembers);
  const teamData = [
    {
      index: "01",
      firstName: "Ritesh",
      lastName: "Sharma",
      role: "Founder · Creative Director",
      philosophy:
        "Every pixel is a decision. Design is not decoration — it is the architecture of understanding.",
      initials: "RS",
      system: "macOS / Figma / Framer",
      stack: ["React", "Figma", "GSAP", "Three.js", "Framer Motion"],
      accentHue: "220 40% 14%",
      order: 0,
    },
    {
      index: "02",
      firstName: "Jotish",
      lastName: "Sharma",
      role: "Co-Founder · Engineering Lead",
      philosophy:
        "Systems should feel inevitable. Good engineering is invisible — it only becomes visible when it's absent.",
      initials: "JS",
      system: "macOS / VS Code / Terminal",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Go", "AWS"],
      accentHue: "142 40% 12%",
      order: 1,
    },
    {
      index: "03",
      firstName: "Shankhalp",
      lastName: "Pradhan",
      role: "Full-Stack Engineer",
      philosophy:
        "Complexity is the enemy of reliability. I build systems that are as simple as possible, but no simpler.",
      initials: "SP",
      system: "Linux / NeoVim / Docker",
      stack: ["Node.js", "React", "Python", "Kubernetes", "Redis"],
      accentHue: "280 35% 14%",
      order: 2,
    },
    {
      index: "04",
      firstName: "Satyam",
      lastName: "Pradhan",
      role: "Mobile & AI Engineer",
      philosophy:
        "Intelligence without empathy is just automation. I build AI that understands context, not just commands.",
      initials: "SP",
      system: "macOS / Cursor / Expo",
      stack: ["React Native", "Python", "LangChain", "FastAPI", "OpenAI"],
      accentHue: "30 40% 12%",
      order: 3,
    },
  ];
  await db.insert(teamMembers).values(teamData);

    console.log("→ Testimonials");
  await db.delete(testimonials);
  const testimonialData = [
    {
      clientName: "Arjun Mehta",
      company: "Nexus Labs",
      role: "CEO & Co-Founder",
      testimonial:
        "Quint Pixels didn't just build our product — they reimagined how our users would experience it. The result was a 40% reduction in churn and a design that our customers consistently describe as 'unlike anything else in the space.'",
      featured: true,
      order: 0,
    },
    {
      clientName: "Priya Nair",
      company: "Aurum Finance",
      role: "Head of Product",
      testimonial:
        "The team's ability to balance technical complexity with visual clarity is rare. Our mobile app went from a Figma prototype to 50K downloads in 6 weeks. They operate at a different level.",
      featured: true,
      order: 1,
    },
    {
      clientName: "Daniel Osei",
      company: "Strata Capital",
      role: "CTO",
      testimonial:
        "We needed a platform that could handle institutional-grade data without feeling like enterprise software. Pixels delivered something that's both powerful and genuinely beautiful to use.",
      featured: false,
      order: 2,
    },
    {
      clientName: "Meera Krishnan",
      company: "Verity Retail",
      role: "Digital Director",
      testimonial:
        "Our conversion rate increased by 28% after the redesign. The AR product preview feature alone drove a measurable lift in average order value. The ROI is undeniable.",
      featured: false,
      order: 3,
    },
  ];
  await db.insert(testimonials).values(testimonialData);

  console.log("\n✅ Seed complete.");
  await conn.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
