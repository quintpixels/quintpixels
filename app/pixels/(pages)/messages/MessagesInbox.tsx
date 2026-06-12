"use client";

import { useState, useTransition } from "react";
import {
  archiveContactAction,
  deleteContactAction,
  unarchiveContactAction,
} from "@/lib/actions/forms";
import {
  Trash2,
  Archive,
  ArchiveRestore,
  Mail,
  MailOpen,
  Search,
} from "lucide-react";
import type { ContactSubmission } from "@/db/schema";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function MessagesInbox({
  messages: initial,
  archived: initialArchived,
}: {
  messages: ContactSubmission[];
  archived: ContactSubmission[];
}) {
  const [tab, setTab] = useState<"inbox" | "archived">("inbox");
  const [messages, setMessages] = useState(initial);
  const [archived, setArchived] = useState(initialArchived);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "unread" | "connect" | "contact"
  >("all");
  const [, startTransition] = useTransition();

  const activeList = tab === "inbox" ? messages : archived;

  const filtered = activeList.filter((m) => {
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      tab === "archived" ||
      filter === "all" ||
      (filter === "unread" && !m.read) ||
      filter === m.source;
    return matchSearch && matchFilter;
  });

  const handleArchive = (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    startTransition(async () => {
      await archiveContactAction(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setArchived((prev) => [{ ...msg, archived: true }, ...prev]);
      if (selected?.id === id) setSelected(null);
    });
  };

  const handleUnarchive = (id: string) => {
    const msg = archived.find((m) => m.id === id);
    if (!msg) return;
    startTransition(async () => {
      await unarchiveContactAction(id);
      setArchived((prev) => prev.filter((m) => m.id !== id));
      setMessages((prev) => [{ ...msg, archived: false }, ...prev]);
      if (selected?.id === id) setSelected(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Permanently delete this message?")) return;
    startTransition(async () => {
      await deleteContactAction(id);
      if (tab === "inbox") {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        setArchived((prev) => prev.filter((m) => m.id !== id));
      }
      if (selected?.id === id) setSelected(null);
    });
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div
      className="flex flex-1 overflow-hidden"
      style={{ minHeight: "calc(100vh - 57px)" }}
    >
      
      <div className="w-full md:w-80 lg:w-96 border-r border-[#e0ddd8] flex flex-col shrink-0">
        
        <div className="flex border-b border-[#e0ddd8]">
          <button
            onClick={() => {
              setTab("inbox");
              setSelected(null);
            }}
            className={`flex-1 py-3 font-pixel text-[7px] tracking-widest uppercase transition-colors border-b-2 ${
              tab === "inbox"
                ? "text-[#0b0b0a] border-[#0b0b0a]"
                : "text-[#7a7872] border-transparent hover:text-[#0b0b0a]"
            }`}
          >
            INBOX ({messages.length})
          </button>
          <button
            onClick={() => {
              setTab("archived");
              setSelected(null);
            }}
            className={`flex-1 py-3 font-pixel text-[7px] tracking-widest uppercase transition-colors border-b-2 ${
              tab === "archived"
                ? "text-[#0b0b0a] border-[#0b0b0a]"
                : "text-[#7a7872] border-transparent hover:text-[#0b0b0a]"
            }`}
          >
            ARCHIVED ({archived.length})
          </button>
        </div>

        <div className="p-3 border-b border-[#e0ddd8] space-y-2">
          <div className="relative">
            <Search
              size={12}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8c6c1]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-[#f0ede9] border border-[#e0ddd8] rounded-sm pl-8 pr-3 py-2 font-mono text-[10px] text-[#0b0b0a] placeholder-[#c8c6c1] focus:outline-none focus:border-[#7a7872]"
            />
          </div>
          {tab === "inbox" && (
            <div className="flex gap-1">
              {(["all", "unread", "contact", "connect"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 font-pixel text-[6px] tracking-widest uppercase py-1.5 rounded-sm transition-colors ${
                    filter === f
                      ? "bg-[#e0ddd8] text-[#0b0b0a]"
                      : "text-[#7a7872] hover:text-[#0b0b0a]"
                  }`}
                >
                  {f === "unread" ? `UNREAD (${unreadCount})` : f.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center font-pixel text-[7px] text-[#c8c6c1] uppercase">
              {tab === "archived" ? "NO ARCHIVED MESSAGES" : "NO MESSAGES"}
            </div>
          )}
          {filtered.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`w-full text-left px-4 py-3.5 border-b border-[#f0ede9] hover:bg-[#f0ede9] transition-colors ${
                selected?.id === msg.id ? "bg-[#ebe8e4]" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  {!msg.read ? (
                    <Mail
                      size={11}
                      className="text-[#0b0b0a] shrink-0 mt-0.5"
                    />
                  ) : (
                    <MailOpen
                      size={11}
                      className="text-[#c8c6c1] shrink-0 mt-0.5"
                    />
                  )}
                  <span
                    className={`font-sans text-[11px] ${msg.read ? "text-[#7a7872]" : "text-[#0b0b0a]"}`}
                  >
                    {msg.name}
                  </span>
                </div>
                <span className="font-pixel text-[6px] tracking-widest text-[#c8c6c1] uppercase shrink-0">
                  {msg.source}
                </span>
              </div>
              <p className="font-mono text-[9px] text-[#7a7872] line-clamp-2 leading-relaxed ml-5">
                {msg.message}
              </p>
              <div className="font-mono text-[8px] text-[#c8c6c1] mt-1 ml-5">
                {formatDate(msg.createdAt)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 hidden md:flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Mail size={24} className="text-[#e0ddd8] mx-auto mb-3" />
              <div className="font-pixel text-[8px] tracking-widest text-[#c8c6c1] uppercase">
                SELECT A MESSAGE
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            
            <div className="flex items-center justify-between mb-6">
              <div className="font-pixel text-[8px] tracking-[0.3em] text-[#c8c6c1] uppercase">
                {selected.source.toUpperCase()} MESSAGE
              </div>
              <div className="flex items-center gap-2">
                {tab === "inbox" ? (
                  <button
                    onClick={() => handleArchive(selected.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[#7a7872] hover:text-[#0b0b0a] border border-[#e0ddd8] hover:border-[#c8c6c1] rounded-sm transition-colors"
                  >
                    <Archive size={12} />
                    <span className="font-pixel text-[7px] tracking-widest uppercase">
                      ARCHIVE
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnarchive(selected.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[#7a7872] hover:text-[#0b0b0a] border border-[#e0ddd8] hover:border-[#c8c6c1] rounded-sm transition-colors"
                  >
                    <ArchiveRestore size={12} />
                    <span className="font-pixel text-[7px] tracking-widest uppercase">
                      UNARCHIVE
                    </span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[#c8c6c1] hover:text-red-600 border border-[#e0ddd8] hover:border-red-200 rounded-sm transition-colors"
                >
                  <Trash2 size={12} />
                  <span className="font-pixel text-[7px] tracking-widest uppercase">
                    DELETE
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-pixel text-[7px] tracking-widest text-[#c8c6c1] uppercase mb-1">
                    FROM
                  </div>
                  <div className="font-sans text-[13px] text-[#0b0b0a]">
                    {selected.name}
                  </div>
                </div>
                <div>
                  <div className="font-pixel text-[7px] tracking-widest text-[#c8c6c1] uppercase mb-1">
                    EMAIL
                  </div>
                  <a
                    href={`mailto:${selected.email}`}
                    className="font-mono text-[11px] text-[#7a7872] hover:text-[#0b0b0a] transition-colors"
                  >
                    {selected.email}
                  </a>
                </div>
              </div>
              {selected.company && (
                <div>
                  <div className="font-pixel text-[7px] tracking-widest text-[#c8c6c1] uppercase mb-1">
                    COMPANY
                  </div>
                  <div className="font-sans text-[12px] text-[#4a4846]">
                    {selected.company}
                  </div>
                </div>
              )}
              <div>
                <div className="font-pixel text-[7px] tracking-widest text-[#c8c6c1] uppercase mb-1">
                  RECEIVED
                </div>
                <div className="font-mono text-[10px] text-[#7a7872]">
                  {formatDate(selected.createdAt)}
                </div>
              </div>
            </div>

            <div className="h-px bg-[#e0ddd8] mb-6" />

            <div>
              <div className="font-pixel text-[7px] tracking-widest text-[#c8c6c1] uppercase mb-3">
                MESSAGE
              </div>
              <p className="font-sans text-[13px] text-[#4a4846] leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>

            <div className="mt-8">
              <a
                href={`mailto:${selected.email}?subject=Re: Your message to Quint Pixels`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0b0b0a] text-[#f7f5f2] font-pixel text-[8px] tracking-widest uppercase rounded-sm hover:bg-[#2a2826] transition-colors"
              >
                REPLY VIA EMAIL
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
