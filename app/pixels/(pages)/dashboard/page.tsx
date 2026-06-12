import { requireAdmin } from "@/lib/auth/middleware";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { getAllServices } from "@/db/queries/content";
import { getAllProjects } from "@/db/queries/content";
import { getAllProducts } from "@/db/queries/content";
import { getAllTeamMembers } from "@/db/queries/content";
import {
  getContactSubmissions,
  getProjectSubmissions,
} from "@/db/queries/admin";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default async function DashboardPage() {
  const session = await requireAdmin();

  const [services, projects, products, team, contacts, projectForms] =
    await Promise.all([
      getAllServices().catch(() => []),
      getAllProjects().catch(() => []),
      getAllProducts().catch(() => []),
      getAllTeamMembers().catch(() => []),
      getContactSubmissions().catch(() => []),
      getProjectSubmissions().catch(() => []),
    ]);

  const unreadContacts = contacts.filter((c) => !c.read).length;

  const quickLinks = [
    {
      href: "/pixels/hero",
      label: "EDIT HERO",
      desc: "Update headline & CTAs",
    },
    {
      href: "/pixels/services",
      label: "MANAGE SERVICES",
      desc: `${services.length} services`,
    },
    {
      href: "/pixels/portfolio",
      label: "PORTFOLIO",
      desc: `${projects.length} projects`,
    },
    {
      href: "/pixels/messages",
      label: "MESSAGES",
      desc: `${unreadContacts} unread`,
    },
  ];

  return (
    <>
      <AdminHeader
        title="DASHBOARD"
        subtitle={`Welcome back, ${session.name}`}
      />
      <div className="p-6 space-y-8">
        
        <div>
          <div className="font-pixel text-[8px] tracking-[0.3em] text-[#0b0b0a]/40 uppercase mb-4">
            OVERVIEW
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard
              label="SERVICES"
              value={services.length}
              sub="Active modules"
            />
            <StatsCard
              label="PORTFOLIO"
              value={projects.length}
              sub="Published projects"
            />
            <StatsCard
              label="PRODUCTS"
              value={products.length}
              sub="Active products"
            />
            <StatsCard
              label="TEAM"
              value={team.length}
              sub="Team members"
              accent
            />
          </div>
        </div>

        
        <div>
          <div className="font-pixel text-[8px] tracking-[0.3em] text-[#0b0b0a]/40 uppercase mb-4">
            INBOX SUMMARY
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatsCard
              label="CONTACT MESSAGES"
              value={contacts.length}
              sub={`${unreadContacts} unread`}
            />
            <StatsCard
              label="PROJECT BRIEFS"
              value={projectForms.length}
              sub={`${projectForms.filter((p) => !p.read).length} unread`}
            />
          </div>
        </div>

        
        <div>
          <div className="font-pixel text-[8px] tracking-[0.3em] text-[#0b0b0a]/40 uppercase mb-4">
            QUICK ACTIONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between px-4 py-4 bg-black/3 border border-black/6 rounded-sm hover:bg-black/5 hover:border-black/10 transition-all"
              >
                <div>
                  <div className="font-pixel text-[10px] tracking-widest text-[#0b0b0a]/70 uppercase group-hover:text-[#0b0b0a] transition-colors">
                    {link.label}
                  </div>
                  <div className="font-mono text-[9px] text-[#0b0b0a]/45 mt-0.5">
                    {link.desc}
                  </div>
                </div>
                <ArrowRight
                  size={13}
                  className="text-[#0b0b0a]/25 group-hover:text-[#0b0b0a]/60 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>

        
        <div className="flex items-center gap-3 pt-4 border-t border-black/6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0b0b0a]/30 animate-pulse" />
          <span className="font-mono text-[9px] text-[#0b0b0a]/40 uppercase tracking-widest">
            CMS SYSTEM OPERATIONAL
          </span>
          <span className="font-mono text-[9px] text-[#0b0b0a]/25 ml-auto uppercase">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full px-4 py-3 border border-white/8 rounded-sm bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all"
        >
          <span className="font-pixel text-[8px] tracking-[0.25em] text-white/40 uppercase group-hover:text-white/70 transition-colors">
            VISIT SITE
          </span>
          <ExternalLink
            size={12}
            className="text-white/20 group-hover:text-white/50 transition-colors"
          />
        </Link>
      </div>
    </>
  );
}
