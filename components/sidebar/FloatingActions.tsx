"use client";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Briefcase, LayoutGrid } from "lucide-react";
import { createMagnetic } from "@/lib/animations/magnetic";
import { ConnectSidebar } from "./ConnectSidebar";
import { ProjectSidebar } from "./ProjectSidebar";

export function FloatingActions() {
  const [connectOpen, setConnectOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const connectBtnRef = useRef<HTMLButtonElement>(null);
  const projectBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    const c1 = connectBtnRef.current
      ? createMagnetic(connectBtnRef.current, { strength: 0.25 })
      : null;
    const c2 = projectBtnRef.current
      ? createMagnetic(projectBtnRef.current, { strength: 0.25 })
      : null;
    const c3 = menuBtnRef.current
      ? createMagnetic(menuBtnRef.current, { strength: 0.25 })
      : null;
    return () => {
      c1?.();
      c2?.();
      c3?.();
    };
  }, []);

  
  useEffect(() => {
    const handler = () => setNavOpen(false);
    document.addEventListener("pix:nav:closed", handler);
    return () => document.removeEventListener("pix:nav:closed", handler);
  }, []);

  const openConnect = () => {
    setProjectOpen(false);
    setConnectOpen(true);
  };
  const openProject = () => {
    setConnectOpen(false);
    setProjectOpen(true);
  };
  const toggleNav = () => {
    if (navOpen) {
      setNavOpen(false);
      document.dispatchEvent(new CustomEvent("pix:nav:close"));
    } else {
      setConnectOpen(false);
      setProjectOpen(false);
      setNavOpen(true);
      document.dispatchEvent(new CustomEvent("pix:nav:open"));
    }
  };

  return (
    <>
      
      <button
        ref={menuBtnRef}
        className={`floating-btn menu-trigger${navOpen ? " floating-btn--active" : ""}`}
        onClick={toggleNav}
        aria-label={navOpen ? "Close navigation" : "Open navigation menu"}
        data-cursor="menu"
      >
        <LayoutGrid size={13} strokeWidth={1.5} />
        <span className="floating-btn-label">MENU</span>
      </button>

      
      <div className="floating-actions" aria-label="Quick actions">
        <button
          ref={connectBtnRef}
          className={`floating-btn${connectOpen ? " floating-btn--active" : ""}`}
          onClick={() => (connectOpen ? setConnectOpen(false) : openConnect())}
          aria-label="Open connect panel"
          data-cursor="connect"
        >
          <MessageSquare size={13} strokeWidth={1.5} />
          <span className="floating-btn-label">CONNECT</span>
        </button>

        <button
          ref={projectBtnRef}
          className={`floating-btn${projectOpen ? " floating-btn--active" : ""}`}
          onClick={() => (projectOpen ? setProjectOpen(false) : openProject())}
          aria-label="Start a project"
          data-cursor="project"
        >
          <Briefcase size={13} strokeWidth={1.5} />
          <span className="floating-btn-label">PROJECT</span>
        </button>
      </div>

      
      <ConnectSidebar
        isOpen={connectOpen}
        onClose={() => setConnectOpen(false)}
      />
      <ProjectSidebar
        isOpen={projectOpen}
        onClose={() => setProjectOpen(false)}
      />
    </>
  );
}
