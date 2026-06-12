import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllProjects } from "@/db/queries/content";
import { PortfolioCMS } from "./PortfolioCMS";

export default async function PortfolioPage() {
  const projects = await getAllProjects().catch(() => []);
  return (
    <>
      <AdminHeader title="PORTFOLIO" subtitle="Manage portfolio projects" />
      <PortfolioCMS projects={projects} />
    </>
  );
}
