"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SectionSidebar } from "./SectionSidebar";
import type { SectionId } from "@/lib/nav";

type SidebarFoldValue = {
  open: boolean;
  ready: boolean;
  toggle: () => void;
};

const SidebarFoldContext = createContext<SidebarFoldValue | null>(null);
const STORAGE_KEY = "esha-sidebar-open";

export function SidebarFoldProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "0") {
      setOpen(false);
    }
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    setOpen((current) => {
      const next = !current;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  return (
    <SidebarFoldContext.Provider value={{ open, ready, toggle }}>
      {children}
    </SidebarFoldContext.Provider>
  );
}

function useSidebarFold() {
  const value = useContext(SidebarFoldContext);
  if (!value) {
    throw new Error("useSidebarFold must be used within SidebarFoldProvider");
  }
  return value;
}

export function SectionLayout({
  active,
  hashPrefix = "",
  children,
}: {
  active: SectionId;
  hashPrefix?: string;
  children: React.ReactNode;
}) {
  const { open, ready, toggle } = useSidebarFold();

  return (
    <div
      className={`about-reference-layout${open ? "" : " is-folded"}${ready ? " is-ready" : ""}`}
    >
      <div className="about-reference-rail">
        <div className="about-reference-pane" {...(!open ? { inert: true } : {})}>
          <SectionSidebar active={active} hashPrefix={hashPrefix} />
        </div>
        <button
          type="button"
          className="sidebar-fold"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Close contents" : "Open contents"}
        >
          <svg viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M6.25 1.25 2.5 5l3.75 3.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
      {children}
    </div>
  );
}
