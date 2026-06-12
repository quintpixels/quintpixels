"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import { createTeamMember, updateTeamMember } from "@/lib/actions/content";
import type { TeamMember } from "@/db/schema";

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onSaved: () => void;
}

export function TeamMemberModal({
  member,
  onClose,
  onSaved,
}: TeamMemberModalProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (member) await updateTeamMember(member.id, formData);
      else await createTeamMember(formData);
      onSaved();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#111] border border-white/8 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 sticky top-0 bg-[#111]">
          <span className="font-pixel text-[9px] tracking-widest text-white/70 uppercase">
            {member ? "EDIT MEMBER" : "NEW MEMBER"}
          </span>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/60"
          >
            <X size={15} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                FIRST NAME
              </label>
              <input
                name="firstName"
                defaultValue={member?.firstName ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                LAST NAME
              </label>
              <input
                name="lastName"
                defaultValue={member?.lastName ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                INITIALS
              </label>
              <input
                name="initials"
                defaultValue={member?.initials ?? ""}
                required
                maxLength={3}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                SYSTEM LABEL
              </label>
              <input
                name="system"
                defaultValue={member?.system ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
                placeholder="CREATIVE ENGINEERING"
              />
            </div>
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              ROLE / TITLE
            </label>
            <input
              name="role"
              defaultValue={member?.role ?? ""}
              required
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              PHILOSOPHY
            </label>
            <textarea
              name="philosophy"
              defaultValue={member?.philosophy ?? ""}
              required
              rows={2}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20 resize-none"
            />
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              STACK (comma separated)
            </label>
            <input
              name="stack"
              defaultValue={(member?.stack as string[])?.join(", ") ?? ""}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              placeholder="React, Node.js, TypeScript"
            />
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              IMAGE URL
            </label>
            <input
              name="imageUrl"
              defaultValue={member?.imageUrl ?? ""}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              placeholder="/uploads/..."
            />
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              ACCENT HUE (HSL)
            </label>
            <input
              name="accentHue"
              defaultValue={member?.accentHue ?? "220 40% 14%"}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              placeholder="220 40% 14%"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-white text-black font-pixel text-[8px] tracking-widest uppercase py-2.5 rounded-sm hover:bg-white/90 disabled:opacity-50"
            >
              {pending ? "SAVING..." : member ? "SAVE CHANGES" : "ADD MEMBER"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 font-pixel text-[8px] text-white/30 hover:text-white/60 uppercase"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
