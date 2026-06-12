import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllTeamMembers } from "@/db/queries/content";
import { TeamCMS } from "./TeamCMS";

export default async function TeamPage() {
  const members = await getAllTeamMembers().catch(() => []);
  return (
    <>
      <AdminHeader title="TEAM" subtitle="Manage team members" />
      <TeamCMS members={members} />
    </>
  );
}
