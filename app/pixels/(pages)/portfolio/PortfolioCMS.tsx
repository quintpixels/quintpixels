"use client";

import { useState, useTransition } from "react";
import { deletePortfolioProject } from "@/lib/actions/content";
import { Plus, Trash2, Edit, Star } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import type { PortfolioProject } from "@/db/schema";

export function PortfolioCMS({
  projects: initial,
}: {
  projects: PortfolioProject[];
}) {
  const [projects, setProjects] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this project?")) return;
    startTransition(async () => {
      await deletePortfolioProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
          {projects.length} PROJECTS
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-white text-black font-pixel text-[8px] tracking-widest uppercase px-4 py-2.5 rounded-sm hover:bg-white/90 transition-colors"
        >
          <Plus size={12} />
          ADD PROJECT
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
                TITLE
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase hidden md:table-cell">
                CATEGORY
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                STATUS
              </th>
              <th className="text-right px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center font-pixel text-[8px] text-white/20 uppercase"
                >
                  NO PROJECTS YET
                </td>
              </tr>
            )}
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-white/3 hover:bg-white/2 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-[10px] text-white/30">
                  {project.index}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[12px] text-white/80">
                      {project.title}
                    </span>
                    {project.featured && (
                      <Star size={10} className="text-white/40" />
                    )}
                  </div>
                  <div className="font-mono text-[9px] text-white/25 mt-0.5">
                    {project.year}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-mono text-[10px] text-white/40">
                  {project.category}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-pixel text-[7px] tracking-widest uppercase px-2 py-1 rounded-sm ${
                      project.status === "published"
                        ? "bg-white/8 text-white/50"
                        : "bg-white/3 text-white/20"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditing(project);
                        setModalOpen(true);
                      }}
                      className="text-white/30 hover:text-white/70"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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
        <ProjectModal
          project={editing}
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
