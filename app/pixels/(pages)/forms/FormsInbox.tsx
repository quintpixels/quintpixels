"use client";

import { useState, useTransition } from "react";
import { archiveProjectAction, deleteProjectAction } from "@/lib/actions/forms";
import { Trash2, Archive, FileText, Search } from "lucide-react";
import type { ProjectSubmission } from "@/db/schema";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function FormsInbox({
  submissions: initial,
}: {
  submissions: ProjectSubmission[];
}) {
  const [submissions, setSubmissions] = useState(initial);
  const [selected, setSelected] = useState<ProjectSubmission | null>(null);
  const [search, setSearch] = useState("");
  const [, startTransition] = useTransition();

  const filtered = submissions.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.projectDescription.toLowerCase().includes(search.toLowerCase()),
  );

  const handleArchive = (id: string) => {
    startTransition(async () => {
      await archiveProjectAction(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) setSelected(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this submission?")) return;
    startTransition(async () => {
      await deleteProjectAction(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) setSelected(null);
    });
  };

  return (
    <div
      className="flex flex-1 overflow-hidden"
      style={{ minHeight: "calc(100vh - 57px)" }}
    >
      <div className="w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-3 border-b border-white/5">
          <div className="relative">
            <Search
              size={12}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search submissions..."
              className="w-full bg-white/3 border border-white/8 rounded-sm pl-8 pr-3 py-2 font-mono text-[10px] text-white placeholder-white/20 focus:outline-none focus:border-white/20"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center font-pixel text-[7px] text-white/20 uppercase">
              NO SUBMISSIONS
            </div>
          )}
          {filtered.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelected(sub)}
              className={`w-full text-left px-4 py-3.5 border-b border-white/3 hover:bg-white/3 transition-colors ${selected?.id === sub.id ? "bg-white/5" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText size={11} className="text-white/40 shrink-0" />
                <span className="font-sans text-[11px] text-white/80">
                  {sub.name}
                </span>
              </div>
              {sub.budget && (
                <div className="font-pixel text-[6px] tracking-widest text-white/25 uppercase ml-5 mb-1">
                  BUDGET: {sub.budget}
                </div>
              )}
              <p className="font-mono text-[9px] text-white/30 line-clamp-1 ml-5">
                {sub.projectDescription}
              </p>
              <div className="font-mono text-[8px] text-white/15 mt-1 ml-5">
                {formatDate(sub.createdAt)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 hidden md:flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText size={24} className="text-white/10 mx-auto mb-3" />
              <div className="font-pixel text-[8px] tracking-widest text-white/15 uppercase">
                SELECT A SUBMISSION
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
                PROJECT BRIEF
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleArchive(selected.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white/30 hover:text-white/60 border border-white/8 hover:border-white/15 rounded-sm transition-colors"
                >
                  <Archive size={12} />
                  <span className="font-pixel text-[7px] tracking-widest uppercase">
                    ARCHIVE
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white/20 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-sm transition-colors"
                >
                  <Trash2 size={12} />
                  <span className="font-pixel text-[7px] tracking-widest uppercase">
                    DELETE
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-1">
                  NAME
                </div>
                <div className="font-sans text-[13px] text-white/80">
                  {selected.name}
                </div>
              </div>
              <div>
                <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-1">
                  EMAIL
                </div>
                <a
                  href={`mailto:${selected.email}`}
                  className="font-mono text-[11px] text-white/50 hover:text-white/70"
                >
                  {selected.email}
                </a>
              </div>
              {selected.company && (
                <div>
                  <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-1">
                    COMPANY
                  </div>
                  <div className="font-sans text-[12px] text-white/60">
                    {selected.company}
                  </div>
                </div>
              )}
              {selected.budget && (
                <div>
                  <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-1">
                    BUDGET
                  </div>
                  <div className="font-sans text-[12px] text-white/60">
                    {selected.budget}
                  </div>
                </div>
              )}
              {selected.timeline && (
                <div>
                  <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-1">
                    TIMELINE
                  </div>
                  <div className="font-sans text-[12px] text-white/60">
                    {selected.timeline}
                  </div>
                </div>
              )}
              <div>
                <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-1">
                  RECEIVED
                </div>
                <div className="font-mono text-[10px] text-white/40">
                  {formatDate(selected.createdAt)}
                </div>
              </div>
            </div>

            {(selected.services as string[])?.length > 0 && (
              <div className="mb-6">
                <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-2">
                  SERVICES REQUESTED
                </div>
                <div className="flex flex-wrap gap-2">
                  {(selected.services as string[]).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-white/5 font-mono text-[9px] text-white/50 rounded-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-white/5 mb-6" />
            <div>
              <div className="font-pixel text-[7px] tracking-widest text-white/20 uppercase mb-3">
                PROJECT DESCRIPTION
              </div>
              <p className="font-sans text-[13px] text-white/60 leading-relaxed whitespace-pre-wrap">
                {selected.projectDescription}
              </p>
            </div>
            <div className="mt-8">
              <a
                href={`mailto:${selected.email}?subject=Re: Your Project Brief — Quint Pixels`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black font-pixel text-[8px] tracking-widest uppercase rounded-sm hover:bg-white/90 transition-colors"
              >
                REPLY VIA EMAIL
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
