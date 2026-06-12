import { requireAdmin } from "@/lib/auth/middleware";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getUnreadCount } from "@/db/queries/admin";

export default async function AdminPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  const unreadCount = await getUnreadCount().catch(() => 0);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f5f2]">
      <AdminSidebar
        adminName={session.name}
        adminRole={session.role}
        unreadCount={unreadCount}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
