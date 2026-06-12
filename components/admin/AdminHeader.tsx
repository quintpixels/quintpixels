"use client";

import { useTransition } from "react";
import { logout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-black/8 bg-[#f7f5f2]">
      <div>
        <h1 className="font-pixel text-[14px] tracking-widest text-[#0b0b0a] uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="font-mono text-[11px] text-[#0b0b0a]/50 mt-0.5 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>

      <button
        onClick={handleLogout}
        disabled={pending}
        className="flex items-center gap-2 px-3 py-1.5 text-[#0b0b0a]/40 hover:text-[#0b0b0a]/80 transition-colors rounded-sm hover:bg-black/5 group"
      >
        <span className="font-pixel text-[8px] tracking-widest uppercase hidden sm:block group-hover:text-[#0b0b0a]/70">
          LOGOUT
        </span>
        <LogOut size={13} />
      </button>
    </header>
  );
}
