"use client";

import { useState, useTransition } from "react";
import { deleteTeamMember } from "@/lib/actions/content";
import { Plus, Trash2, Edit } from "lucide-react";
import { TeamMemberModal } from "./TeamMemberModal";
import type { TeamMember } from "@/db/schema";

export function TeamCMS({ members: initial }: { members: TeamMember[] }) {
  const [members, setMembers] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Remove this team member?")) return;
    startTransition(async () => {
      await deleteTeamMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
          {members.length} MEMBERS
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-white text-black font-pixel text-[8px] tracking-widest uppercase px-4 py-2.5 rounded-sm hover:bg-white/90"
        >
          <Plus size={12} /> ADD MEMBER
        </button>
      </div>
      <div className="border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                #
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                NAME
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase hidden md:table-cell">
                ROLE
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase hidden md:table-cell">
                SYSTEM
              </th>
              <th className="text-right px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center font-pixel text-[8px] text-white/20 uppercase"
                >
                  NO TEAM MEMBERS
                </td>
              </tr>
            )}
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b border-white/3 hover:bg-white/2"
              >
                <td className="px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center font-pixel text-[9px] text-white/60">
                    {member.initials}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-sans text-[12px] text-white/80">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="font-mono text-[9px] text-white/25 mt-0.5 line-clamp-1">
                    {member.philosophy}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-mono text-[10px] text-white/40">
                  {member.role}
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                  {member.system}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditing(member);
                        setModalOpen(true);
                      }}
                      className="text-white/30 hover:text-white/70"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-white/20 hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <TeamMemberModal
          member={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSaved={() => {
            setModalOpen(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
