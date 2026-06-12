"use client";

import { useState, useTransition } from "react";
import type { SeoMetadata } from "@/db/schema";

interface SeoEditorProps {
  pages: string[];
  seoMap: Record<string, SeoMetadata>;
  updateSeoMetadata: (
    page: string,
    data: {
      title?: string;
      description?: string;
      keywords?: string;
      ogImage?: string;
    },
  ) => Promise<void>;
}

export function SeoEditor({
  pages,
  seoMap,
  updateSeoMetadata,
}: SeoEditorProps) {
  const [activePage, setActivePage] = useState(pages[0]);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);

  const current = seoMap[activePage];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: (formData.get("title") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      keywords: (formData.get("keywords") as string) || undefined,
      ogImage: (formData.get("ogImage") as string) || undefined,
    };
    startTransition(async () => {
      await updateSeoMetadata(activePage, data);
      setSaved(activePage);
      setTimeout(() => setSaved(null), 2000);
    });
  };

  return (
    <div className="p-6">
      
      <div className="flex gap-1 mb-6 border-b border-white/5">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setActivePage(p)}
            className={`px-4 py-2.5 font-pixel text-[7px] tracking-widest uppercase transition-colors border-b-2 -mb-px ${
              activePage === p
                ? "border-white/40 text-white/70"
                : "border-transparent text-white/25 hover:text-white/45"
            }`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      
      <form
        key={activePage}
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-4"
      >
        <div>
          <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
            PAGE TITLE
          </label>
          <input
            name="title"
            defaultValue={current?.title ?? ""}
            placeholder={`${activePage.charAt(0).toUpperCase() + activePage.slice(1)} — Quint Pixels`}
            className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[11px] text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <div>
          <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
            META DESCRIPTION
          </label>
          <textarea
            name="description"
            defaultValue={current?.description ?? ""}
            rows={3}
            placeholder="A short description for search engines (150-160 characters recommended)"
            className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[11px] text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors resize-none"
          />
        </div>
        <div>
          <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
            KEYWORDS
          </label>
          <input
            name="keywords"
            defaultValue={current?.keywords ?? ""}
            placeholder="design, development, studio, ..."
            className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[11px] text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <div>
          <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
            OG IMAGE URL
          </label>
          <input
            name="ogImage"
            defaultValue={current?.ogImage ?? ""}
            placeholder="/og-image.jpg"
            className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[11px] text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="bg-white text-black font-pixel text-[9px] tracking-widest uppercase px-6 py-3 rounded-sm hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {pending ? "SAVING..." : `SAVE ${activePage.toUpperCase()}`}
          </button>
          {saved === activePage && (
            <span className="font-pixel text-[7px] tracking-widest text-white/40 uppercase">
              SAVED ✓
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
