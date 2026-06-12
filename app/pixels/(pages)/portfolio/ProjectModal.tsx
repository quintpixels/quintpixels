"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import {
  createPortfolioProject,
  updatePortfolioProject,
} from "@/lib/actions/content";
import type { PortfolioProject } from "@/db/schema";

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSaved: () => void;
}

export function ProjectModal({ project, onClose, onSaved }: ProjectModalProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (project) {
        await updatePortfolioProject(project.id, formData);
      } else {
        await createPortfolioProject(formData);
      }
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
            {project ? "EDIT PROJECT" : "NEW PROJECT"}
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
                TITLE
              </label>
              <input
                name="title"
                defaultValue={project?.title ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                SLUG
              </label>
              <input
                name="slug"
                defaultValue={project?.slug ?? ""}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
                placeholder="auto-generated"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                CATEGORY
              </label>
              <input
                name="category"
                defaultValue={project?.category ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                YEAR
              </label>
              <input
                name="year"
                defaultValue={
                  project?.year ?? new Date().getFullYear().toString()
                }
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              SUBTITLE
            </label>
            <input
              name="sub"
              defaultValue={project?.sub ?? ""}
              required
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
            />
          </div>

          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              defaultValue={project?.description ?? ""}
              rows={3}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20 resize-none"
            />
          </div>

          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              TAGS (comma separated)
            </label>
            <input
              name="tags"
              defaultValue={(project?.tags as string[])?.join(", ") ?? ""}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                CARD COLOR
              </label>
              <input
                name="color"
                type="color"
                defaultValue={project?.color ?? "#f0ede9"}
                className="w-full h-10 bg-white/3 border border-white/8 rounded-sm cursor-pointer"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                STATUS
              </label>
              <select
                name="status"
                defaultValue={project?.status ?? "published"}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              >
                <option value="published" className="bg-[#111]">
                  Published
                </option>
                <option value="draft" className="bg-[#111]">
                  Draft
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              LIVE URL
            </label>
            <input
              name="liveUrl"
              defaultValue={project?.liveUrl ?? ""}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              value="true"
              id="featured"
              defaultChecked={project?.featured ?? false}
              className="rounded border-white/20 bg-white/5"
            />
            <label
              htmlFor="featured"
              className="font-pixel text-[7px] tracking-widest text-white/40 uppercase"
            >
              FEATURED PROJECT
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-white text-black font-pixel text-[8px] tracking-widest uppercase py-2.5 rounded-sm hover:bg-white/90 disabled:opacity-50"
            >
              {pending
                ? "SAVING..."
                : project
                  ? "SAVE CHANGES"
                  : "CREATE PROJECT"}
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
