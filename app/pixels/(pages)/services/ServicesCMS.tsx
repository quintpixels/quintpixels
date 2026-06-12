"use client";

import { useState, useTransition } from "react";
import { deleteService, toggleServiceActive } from "@/lib/actions/content";
import { Plus, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { ServiceModal } from "./ServiceModal";
import type { Service } from "@/db/schema";

interface ServicesCMSProps {
  services: Service[];
}

export function ServicesCMS({ services: initial }: ServicesCMSProps) {
  const [services, setServices] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [pending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this service?")) return;
    startTransition(async () => {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    });
  };

  const handleToggle = (id: string, active: boolean) => {
    startTransition(async () => {
      await toggleServiceActive(id, !active);
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, active: !active } : s)),
      );
    });
  };

  return (
    <div className="p-6">
      
      <div className="flex items-center justify-between mb-6">
        <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase">
          {services.length} SERVICES
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-white text-black font-pixel text-[8px] tracking-widest uppercase px-4 py-2.5 rounded-sm hover:bg-white/90 transition-colors"
        >
          <Plus size={12} />
          ADD SERVICE
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
                TAGS
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
            {services.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center font-pixel text-[8px] text-white/20 uppercase"
                >
                  NO SERVICES YET — ADD YOUR FIRST
                </td>
              </tr>
            )}
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-white/3 hover:bg-white/2 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-[10px] text-white/30">
                  {service.num}
                </td>
                <td className="px-4 py-3">
                  <div className="font-sans text-[12px] text-white/80">
                    {service.title.replace("\n", " ")}
                  </div>
                  <div className="font-mono text-[9px] text-white/25 mt-0.5 line-clamp-1">
                    {service.description}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(service.tags)
                      ? (service.tags as string[])
                      : typeof service.tags === "string"
                        ? (service.tags as string).split(",").map((t) => t.trim()).filter(Boolean)
                        : []
                    ).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/5 font-mono text-[8px] text-white/40 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggle(service.id, service.active)}
                    className="flex items-center gap-1.5 group"
                  >
                    {service.active ? (
                      <>
                        <Eye
                          size={11}
                          className="text-white/40 group-hover:text-white/60"
                        />
                        <span className="font-pixel text-[7px] tracking-widest text-white/40 uppercase">
                          ACTIVE
                        </span>
                      </>
                    ) : (
                      <>
                        <EyeOff
                          size={11}
                          className="text-white/20 group-hover:text-white/40"
                        />
                        <span className="font-pixel text-[7px] tracking-widest text-white/20 uppercase">
                          HIDDEN
                        </span>
                      </>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditing(service);
                        setModalOpen(true);
                      }}
                      className="text-white/30 hover:text-white/70 transition-colors"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
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
        <ServiceModal
          service={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSaved={(svc) => {
            if (editing) {
              setServices((prev) =>
                prev.map((s) => (s.id === svc.id ? svc : s)),
              );
            } else {
              setServices((prev) => [...prev, svc]);
            }
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
