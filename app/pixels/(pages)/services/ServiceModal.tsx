"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import { createService, updateService } from "@/lib/actions/content";
import type { Service } from "@/db/schema";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSaved: (service: Service) => void;
}

const ICON_OPTIONS = [
  "Monitor",
  "Code2",
  "AppWindow",
  "Sparkles",
  "Cpu",
  "Database",
  "Globe",
  "Layers",
  "Network",
  "Workflow",
  "Briefcase",
  "Zap",
];

export function ServiceModal({ service, onClose, onSaved }: ServiceModalProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (service) {
        await updateService(service.id, formData);
        onSaved({ ...service, ...Object.fromEntries(formData) } as Service);
      } else {
        await createService(formData);
        onClose();
        
        window.location.reload();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#111] border border-white/8 rounded-sm shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <span className="font-pixel text-[9px] tracking-widest text-white/70 uppercase">
            {service ? "EDIT SERVICE" : "NEW SERVICE"}
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
                NUMBER (e.g. 01)
              </label>
              <input
                name="num"
                defaultValue={service?.num ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                ICON
              </label>
              <select
                name="icon"
                defaultValue={service?.icon ?? "Monitor"}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon} className="bg-[#111]">
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              TITLE (use \n for line break)
            </label>
            <input
              name="title"
              defaultValue={service?.title ?? ""}
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
              defaultValue={service?.description ?? ""}
              required
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
              defaultValue={
                Array.isArray(service?.tags)
                  ? (service.tags as string[]).join(", ")
                  : typeof service?.tags === "string"
                    ? service.tags
                    : ""
              }
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              placeholder="React, Next.js, TypeScript"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-white text-black font-pixel text-[8px] tracking-widest uppercase py-2.5 rounded-sm hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {pending
                ? "SAVING..."
                : service
                  ? "SAVE CHANGES"
                  : "CREATE SERVICE"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 font-pixel text-[8px] tracking-widest text-white/30 hover:text-white/60 uppercase"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
