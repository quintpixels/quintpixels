"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { openSidebar, closeSidebar } from "@/lib/animations/sidebar";
import { X, ArrowRight } from "lucide-react";
import { submitConnect } from "@/lib/actions/forms";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectSidebar({ isOpen, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (isOpen) {
      const fields = Array.from(panel.querySelectorAll("[data-field]"));
      openSidebar(panel, backdrop, fields);
      setTimeout(() => firstRef.current?.focus(), 560);
    } else {
      closeSidebar(panel, backdrop);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((v) => ({ ...v, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("company", form.company);
    fd.append("message", form.message);
    fd.append("source", "connect");
    startTransition(async () => {
      const result = await submitConnect(undefined, fd);
      if (result?.errors) {
        const firstError = Object.values(result.errors).flat()[0];
        setSubmitError(firstError ?? "Something went wrong. Please try again.");
      } else {
        setSent(true);
      }
    });
  };

  return (
    <div aria-hidden={!isOpen} className="sidebar-wrapper">
      
      <div
        ref={backdropRef}
        className="sidebar-backdrop"
        onClick={onClose}
        style={{ visibility: "hidden" }}
      />
      
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Connect with us"
        className="sidebar-panel"
        data-lenis-prevent
        style={{ visibility: "hidden" }}
      >
        
        <div data-field className="sb-header">
          <div>
            <p className="sb-eyebrow">GET IN TOUCH</p>
            <h2 className="sb-title">
              Let&apos;s work
              <br />
              together.
            </h2>
          </div>
          <button className="sb-close" onClick={onClose} aria-label="Close">
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        <div className="sb-divider" data-field />

        {!sent ? (
          <form onSubmit={handleSubmit} className="sb-form">
            <div data-field className="pix-field">
              <label className="pix-label">Name</label>
              <input
                ref={firstRef}
                type="text"
                placeholder="YOUR NAME"
                className="pix-input"
                value={form.name}
                onChange={set("name")}
                required
                autoComplete="off"
              />
            </div>

            <div data-field className="pix-field">
              <label className="pix-label">Email</label>
              <input
                type="email"
                placeholder="YOUR@EMAIL.COM"
                className="pix-input"
                value={form.email}
                onChange={set("email")}
                required
                autoComplete="off"
              />
            </div>

            <div data-field className="pix-field">
              <label className="pix-label">Company</label>
              <input
                type="text"
                placeholder="YOUR COMPANY"
                className="pix-input"
                value={form.company}
                onChange={set("company")}
                autoComplete="off"
              />
            </div>

            <div data-field className="pix-field">
              <label className="pix-label">Message</label>
              <textarea
                rows={4}
                placeholder="TELL US ABOUT YOUR PROJECT"
                className="pix-input pix-textarea"
                value={form.message}
                onChange={set("message")}
                required
                minLength={10}
              />
              {submitError && (
                <p className="text-[10px] font-mono tracking-wider text-red-400/80 mt-1">
                  {submitError}
                </p>
              )}
            </div>

            <div data-field>
              <button
                type="submit"
                disabled={isPending}
                className="sb-submit"
                data-cursor="send"
              >
                <span>{isPending ? "SENDING..." : "SEND MESSAGE"}</span>
                <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        ) : (
          <div className="sb-success" data-field>
            <div className="sb-success-icon">✓</div>
            <p className="sb-success-text">
              Message received.
              <br />
              We&apos;ll be in touch shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
