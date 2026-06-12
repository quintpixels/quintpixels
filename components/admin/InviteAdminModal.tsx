"use client";

import { useActionState, useState } from "react";
import { X, User, Eye, EyeOff } from "lucide-react";
import { createAdminAccount } from "@/lib/actions/auth";

export function InviteAdminModal({ onCreated }: { onCreated?: () => void }) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(
    createAdminAccount,
    undefined,
  );

  function handleSuccess() {
    setOpen(false);
    onCreated?.();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-white/8 border border-white/10 text-white/60 hover:text-white font-pixel text-[8px] tracking-widest uppercase px-4 py-2.5 rounded-sm hover:bg-white/12 transition-colors"
      >
        <User size={12} />
        ADD ADMIN
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#161513] border border-white/10 rounded-sm">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div className="font-pixel text-[9px] tracking-[0.3em] text-white/70 uppercase">
                CREATE ADMIN ACCOUNT
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {state?.success ? (
              <div className="p-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-sm p-4 mb-4">
                  <p className="font-mono text-[11px] text-emerald-400">
                    {state.message}
                  </p>
                </div>
                <button
                  onClick={handleSuccess}
                  className="w-full bg-white/8 border border-white/10 text-white/60 hover:text-white font-pixel text-[8px] tracking-widest uppercase px-4 py-3 rounded-sm hover:bg-white/12 transition-colors"
                >
                  DONE
                </button>
              </div>
            ) : (
              <form action={action} className="p-6 space-y-4">
                {state?.message && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3">
                    <p className="font-mono text-[11px] text-red-400">
                      {state.message}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block font-pixel text-[7px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-sm px-3 py-2.5 font-mono text-[12px] text-white placeholder:text-white/20 outline-none transition-colors"
                  />
                  {state?.errors?.name && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-pixel text-[7px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="admin@quintpixels.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-sm px-3 py-2.5 font-mono text-[12px] text-white placeholder:text-white/20 outline-none transition-colors"
                  />
                  {state?.errors?.email && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-pixel text-[7px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-sm px-3 py-2.5 pr-10 font-mono text-[12px] text-white placeholder:text-white/20 outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {state?.errors?.password && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">
                      {state.errors.password[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-pixel text-[7px] tracking-[0.3em] text-white/40 uppercase mb-1.5">
                    Role
                  </label>
                  <select
                    name="role"
                    defaultValue="admin"
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-sm px-3 py-2.5 font-mono text-[12px] text-white/80 outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="admin" className="bg-[#161513]">
                      Admin — full CMS access
                    </option>
                    <option value="editor" className="bg-[#161513]">
                      Editor — content only
                    </option>
                  </select>
                  {state?.errors?.role && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">
                      {state.errors.role[0]}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 bg-white/4 border border-white/8 text-white/40 hover:text-white/60 font-pixel text-[8px] tracking-widest uppercase px-4 py-3 rounded-sm hover:bg-white/8 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex-1 bg-white text-[#0b0b0a] hover:bg-white/90 disabled:opacity-50 font-pixel text-[8px] tracking-widest uppercase px-4 py-3 rounded-sm transition-colors"
                  >
                    {pending ? "CREATING..." : "CREATE ADMIN"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
