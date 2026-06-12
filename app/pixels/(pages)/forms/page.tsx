import { AdminHeader } from "@/components/admin/AdminHeader";
import { getProjectSubmissions } from "@/db/queries/admin";
import { FormsInbox } from "./FormsInbox";

export default async function FormsPage() {
  const submissions = await getProjectSubmissions().catch(() => []);
  return (
    <>
      <AdminHeader
        title="PROJECT FORMS"
        subtitle="Project requirement submissions"
      />
      <FormsInbox submissions={submissions} />
    </>
  );
}
