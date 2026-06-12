"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import { createProduct, updateProduct } from "@/lib/actions/content";
import type { Product } from "@/db/schema";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

const STATUS_OPTIONS = ["Available", "Beta", "Coming Soon", "Deprecated"];
const ICON_OPTIONS = [
  "Layers",
  "Network",
  "Workflow",
  "Cpu",
  "Zap",
  "Globe",
  "Shield",
  "Database",
  "Code2",
  "Sparkles",
];

export function ProductModal({ product, onClose, onSaved }: ProductModalProps) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (product) await updateProduct(product.id, formData);
      else await createProduct(formData);
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
            {product ? "EDIT PRODUCT" : "NEW PRODUCT"}
          </span>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/60"
          >
            <X size={15} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              PRODUCT NAME
            </label>
            <input
              name="name"
              defaultValue={product?.name ?? ""}
              required
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              TYPE / CATEGORY
            </label>
            <input
              name="type"
              defaultValue={product?.type ?? ""}
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
              defaultValue={product?.description ?? ""}
              required
              rows={3}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                ICON
              </label>
              <select
                name="icon"
                defaultValue={product?.icon ?? "Layers"}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              >
                {ICON_OPTIONS.map((i) => (
                  <option key={i} value={i} className="bg-[#111]">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
                STATUS
              </label>
              <select
                name="status"
                defaultValue={product?.status ?? "Available"}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-[#111]">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-2">
              LEARN MORE URL
            </label>
            <input
              name="learnMoreUrl"
              defaultValue={product?.learnMoreUrl ?? ""}
              className="w-full bg-white/3 border border-white/8 rounded-sm px-3 py-2.5 font-mono text-[11px] text-white focus:outline-none focus:border-white/20"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-white text-black font-pixel text-[8px] tracking-widest uppercase py-2.5 rounded-sm hover:bg-white/90 disabled:opacity-50"
            >
              {pending
                ? "SAVING..."
                : product
                  ? "SAVE CHANGES"
                  : "CREATE PRODUCT"}
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
