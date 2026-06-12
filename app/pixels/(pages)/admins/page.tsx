import { AdminHeader } from "@/components/admin/AdminHeader";
import { InviteAdminModal } from "@/components/admin/InviteAdminModal";
import { getAllAdmins } from "@/db/queries/admin";
import { requireRole } from "@/lib/auth/middleware";
import { Shield } from "lucide-react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function AdminsPage() {
  await requireRole(["owner"]);
  const adminUsers = await getAllAdmins().catch(() => []);

  return (
    <>
      <AdminHeader title="ADMINS" subtitle="Manage admin accounts" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
            {adminUsers.length} ADMIN ACCOUNTS
          </div>
          <InviteAdminModal />
        </div>

        <div className="border border-white/5 rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                  NAME
                </th>
                <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase hidden md:table-cell">
                  EMAIL
                </th>
                <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                  ROLE
                </th>
                <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase hidden md:table-cell">
                  JOINED
                </th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b border-white/3 hover:bg-white/2"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center font-pixel text-[8px] text-white/60">
                        {admin.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-sans text-[12px] text-white/80">
                        {admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-[10px] text-white/40">
                    {admin.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 font-pixel text-[7px] tracking-widest uppercase px-2 py-1 rounded-sm ${
                        admin.role === "owner"
                          ? "bg-white/10 text-white/70"
                          : "bg-white/4 text-white/30"
                      }`}
                    >
                      {admin.role === "owner" && <Shield size={9} />}
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-[10px] text-white/30">
                    {formatDate(admin.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 border border-white/5 rounded-sm bg-white/2">
          <div className="font-pixel text-[7px] tracking-widest text-white/25 uppercase mb-2">
            NOTE
          </div>
          <p className="font-mono text-[9px] text-white/30 leading-relaxed">
            Only the owner can view this page and create new admin accounts. New
            admins receive the role you assign. Editors can manage content only;
            Admins have full CMS access.
          </p>
        </div>
      </div>
    </>
  );
}
