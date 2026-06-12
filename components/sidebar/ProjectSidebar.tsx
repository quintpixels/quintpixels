"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { openSidebar, closeSidebar } from "@/lib/animations/sidebar";
import { X, ArrowRight } from "lucide-react";
import { submitProjectRequirement } from "@/lib/actions/forms";

const BUDGET_OPTIONS = ["₹50K–₹2L", "₹2L–₹5L", "₹5L–₹15L", "₹15L+"];
const TIMELINE_OPTIONS = ["ASAP", "1 MONTH", "3 MONTHS", "LONG TERM"];
const SERVICES = [
  "WEB APP",
  "MOBILE APP",
  "AI INTEGRATION",
  "UI/UX",
  "CLOUD SYSTEMS",
  "CUSTOM SOFTWARE",
];
const PROJECT_TYPES = ["PRODUCT", "ENTERPRISE", "STARTUP", "REDESIGN", "OTHER"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    description: "",
    projectType: "",
    budget: "",
    timeline: "",
    services: [] as string[],
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

  const setText =
    (k: "name" | "company" | "email" | "description") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((v) => ({ ...v, [k]: e.target.value }));

  const toggleService = (s: string) =>
    setForm((v) => ({
      ...v,
      services: v.services.includes(s)
        ? v.services.filter((x) => x !== s)
        : [...v.services, s],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("company", form.company);
    fd.append("budget", form.budget);
    fd.append("timeline", form.timeline);
    form.services.forEach((s) => fd.append("services", s));
    fd.append("projectDescription", form.description);
    startTransition(async () => {
      const result = await submitProjectRequirement(undefined, fd);
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
        aria-label="Start a project"
        className="sidebar-panel sidebar-panel--wide"
        data-lenis-prevent
        style={{ visibility: "hidden" }}
      >
        
        <div data-field className="sb-header">
          <div>
            <p className="sb-eyebrow">START A PROJECT</p>
            <h2 className="sb-title">
              Tell us what
              <br />
              you&apos;re building.
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
                onChange={setText("name")}
                required
                autoComplete="off"
              />
            </div>
            <div data-field className="pix-field-row">
              <div className="pix-field">
                <label className="pix-label">Company</label>
                <input
                  type="text"
                  placeholder="YOUR COMPANY"
                  className="pix-input"
                  value={form.company}
                  onChange={setText("company")}
                  autoComplete="off"
                />
              </div>
              <div className="pix-field">
                <label className="pix-label">Email</label>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="pix-input"
                  value={form.email}
                  onChange={setText("email")}
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div data-field className="pix-section">
              <p className="pix-section-label">PROJECT TYPE</p>
              <div className="pix-option-grid pix-option-grid--5">
                {PROJECT_TYPES.map((t) => (
                  <label key={t} className="pix-option">
                    <input
                      type="radio"
                      name="projectType"
                      value={t}
                      className="sr-only"
                      checked={form.projectType === t}
                      onChange={() =>
                        setForm((v) => ({ ...v, projectType: t }))
                      }
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div data-field className="pix-section">
              <p className="pix-section-label">BUDGET RANGE</p>
              <div className="pix-option-grid pix-option-grid--4">
                {BUDGET_OPTIONS.map((b) => (
                  <label key={b} className="pix-option">
                    <input
                      type="radio"
                      name="budget"
                      value={b}
                      className="sr-only"
                      checked={form.budget === b}
                      onChange={() => setForm((v) => ({ ...v, budget: b }))}
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <div data-field className="pix-section">
              <p className="pix-section-label">TIMELINE</p>
              <div className="pix-option-grid pix-option-grid--4">
                {TIMELINE_OPTIONS.map((t) => (
                  <label key={t} className="pix-option">
                    <input
                      type="radio"
                      name="timeline"
                      value={t}
                      className="sr-only"
                      checked={form.timeline === t}
                      onChange={() => setForm((v) => ({ ...v, timeline: t }))}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div data-field className="pix-section">
              <p className="pix-section-label">SERVICES NEEDED</p>
              <div className="pix-option-grid pix-option-grid--3">
                {SERVICES.map((s) => (
                  <label
                    key={s}
                    className={`pix-option pix-option--check ${form.services.includes(s) ? "pix-option--checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      value={s}
                      className="sr-only"
                      checked={form.services.includes(s)}
                      onChange={() => toggleService(s)}
                    />
                    <span className="pix-check-mark" />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div data-field className="pix-field">
              <label className="pix-label">Project Description</label>
              <textarea
                rows={3}
                placeholder="DESCRIBE YOUR PROJECT"
                className="pix-input pix-textarea"
                value={form.description}
                onChange={setText("description")}
              />
            </div>

            <div data-field>
              {submitError && (
                <p className="text-[10px] font-mono tracking-wider text-red-400/80 mb-3">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="sb-submit"
                data-cursor="submit"
              >
                <span>{isPending ? "SUBMITTING..." : "SUBMIT BRIEF"}</span>
                <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        ) : (
          <div className="sb-success" data-field>
            <div className="sb-success-icon">✓</div>
            <p className="sb-success-text">
              Brief received.
              <br />
              Our team will review and respond within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
