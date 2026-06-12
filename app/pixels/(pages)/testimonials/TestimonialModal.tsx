"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import { createTestimonial, updateTestimonial } from "@/lib/actions/content";
import type { Testimonial } from "@/db/schema";

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSaved: () => void;
}

export function TestimonialModal({
  testimonial,
  onClose,
  onSaved,
}: TestimonialModalProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (testimonial) await updateTestimonial(testimonial.id, formData);
      else await createTestimonial(formData);
      onSaved();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#111] border border-white/8 rounded-sm shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <span className="font-pixel text-[9px] tracking-widest text-white/70 uppercase">
            {testimonial ? "EDIT TESTIMONIAL" : "NEW TESTIMONIAL"}
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
                CLIENT NAME
              </label>
              <input
                name="clientName"
                defaultValue={testimonial?.clientName ?? ""}
                required
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                COMPANY
              </label>
              <input
                name="company"
                defaultValue={testimonial?.company ?? ""}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              ROLE / TITLE
            </label>
            <input
              name="role"
              defaultValue={testimonial?.role ?? ""}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              TESTIMONIAL
            </label>
            <textarea
              name="testimonial"
              defaultValue={testimonial?.testimonial ?? ""}
              required
              rows={4}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20 resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              value="true"
              id="t-featured"
              defaultChecked={testimonial?.featured ?? false}
              className="rounded border-white/20 bg-white/5"
            />
            <label
              htmlFor="t-featured"
              className="font-pixel text-[7px] tracking-widest text-white/40 uppercase"
            >
              FEATURED
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
                : testimonial
                  ? "SAVE CHANGES"
                  : "ADD TESTIMONIAL"}
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
