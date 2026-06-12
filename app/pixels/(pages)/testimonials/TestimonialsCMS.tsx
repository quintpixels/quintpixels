"use client";

import { useState, useTransition } from "react";
import { deleteTestimonial } from "@/lib/actions/content";
import { Plus, Trash2, Edit, Star } from "lucide-react";
import { TestimonialModal } from "./TestimonialModal";
import type { Testimonial } from "@/db/schema";

export function TestimonialsCMS({
  testimonials: initial,
}: {
  testimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    startTransition(async () => {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
          {testimonials.length} TESTIMONIALS
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-white text-black font-pixel text-[8px] tracking-widest uppercase px-4 py-2.5 rounded-sm hover:bg-white/90"
        >
          <Plus size={12} /> ADD TESTIMONIAL
        </button>
      </div>
      <div className="space-y-3">
        {testimonials.length === 0 && (
          <div className="border border-white/5 rounded-sm px-4 py-12 text-center font-pixel text-[8px] text-white/20 uppercase">
            NO TESTIMONIALS YET
          </div>
        )}
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="border border-white/5 rounded-sm p-4 hover:bg-white/2 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans text-[12px] text-white/80">
                    {t.clientName}
                  </span>
                  {t.featured && <Star size={10} className="text-white/40" />}
                  {t.company && (
                    <span className="font-mono text-[9px] text-white/30">
                      · {t.company}
                    </span>
                  )}
                </div>
                <p className="font-mono text-[10px] text-white/40 line-clamp-2 leading-relaxed">
                  "{t.testimonial}"
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditing(t);
                    setModalOpen(true);
                  }}
                  className="text-white/30 hover:text-white/70"
                >
                  <Edit size={13} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-white/20 hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <TestimonialModal
          testimonial={editing}
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
