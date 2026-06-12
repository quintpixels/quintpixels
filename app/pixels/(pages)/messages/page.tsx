import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  getContactSubmissions,
  getArchivedContactSubmissions,
} from "@/db/queries/admin";
import { MessagesInbox } from "./MessagesInbox";

export default async function MessagesPage() {
  const [messages, archived] = await Promise.all([
    getContactSubmissions().catch(() => []),
    getArchivedContactSubmissions().catch(() => []),
  ]);
  return (
    <>
      <AdminHeader
        title="MESSAGES"
        subtitle="Contact and connect form responses"
      />
      <MessagesInbox messages={messages} archived={archived} />
    </>
  );
}
