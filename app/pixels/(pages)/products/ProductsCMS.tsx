"use client";

import { useState, useTransition } from "react";
import { deleteProduct } from "@/lib/actions/content";
import { Plus, Trash2, Edit } from "lucide-react";
import { ProductModal } from "./ProductModal";
import type { Product } from "@/db/schema";

export function ProductsCMS({ products: initial }: { products: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this product?")) return;
    startTransition(async () => {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
          {products.length} PRODUCTS
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-white text-black font-pixel text-[8px] tracking-widest uppercase px-4 py-2.5 rounded-sm hover:bg-white/90"
        >
          <Plus size={12} /> ADD PRODUCT
        </button>
      </div>
      <div className="border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                ID
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase">
                NAME
              </th>
              <th className="text-left px-4 py-3 font-pixel text-[7px] tracking-widest text-white/25 uppercase hidden md:table-cell">
                TYPE
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
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center font-pixel text-[8px] text-white/20 uppercase"
                >
                  NO PRODUCTS YET
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-white/3 hover:bg-white/2"
              >
                <td className="px-4 py-3 font-mono text-[10px] text-white/30">
                  {product.productId}
                </td>
                <td className="px-4 py-3">
                  <div className="font-sans text-[12px] text-white/80">
                    {product.name}
                  </div>
                  <div className="font-mono text-[9px] text-white/25 line-clamp-1 mt-0.5">
                    {product.description}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-mono text-[10px] text-white/40">
                  {product.type}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-pixel text-[7px] tracking-widest uppercase px-2 py-1 rounded-sm ${
                      product.status === "Available"
                        ? "bg-white/8 text-white/50"
                        : product.status === "Beta"
                          ? "bg-white/5 text-white/35"
                          : "bg-white/3 text-white/20"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditing(product);
                        setModalOpen(true);
                      }}
                      className="text-white/30 hover:text-white/70"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
        <ProductModal
          product={editing}
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
