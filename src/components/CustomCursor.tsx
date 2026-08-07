"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type gsap from "gsap";
import { onMotionReady } from "@/lib/motion";

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

type CursorType = "default" | "project";

type CursorApi = {
  type: CursorType;
  label: string | null;
  setCursor: (type: CursorType, label?: string | null) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorApi | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    type: CursorType;
    label: string | null;
  }>({ type: "default", label: null });

  const setCursor = useCallback(
    (type: CursorType, label: string | null = null) => {
      setState({ type, label });
    },
    []
  );
  const resetCursor = useCallback(() => {
    setState({ type: "default", label: null });
  }, []);

  const api = useMemo<CursorApi>(
    () => ({
      type: state.type,
      label: state.label,
      setCursor,
      resetCursor,
    }),
    [resetCursor, setCursor, state]
  );

  return (
    <CursorContext.Provider value={api}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}

let gsapPromise: Promise<typeof gsap> | null = null;

function loadGsap(): Promise<typeof gsap> {
  gsapPromise ??= import("gsap").then((m) => m.default);
  return gsapPromise;
}

export function CustomCursor() {
  const { type, label, resetCursor } = useCursor();
  const pathname = usePathname();
  const elRef = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled =
    useMediaQuery("(hover: hover) and (pointer: fine)") && !reduced;
  const target = useRef({ x: 0, y: 0 });
  const size = useRef({ w: 10, h: 10 });

  useEffect(() => {
    if (!enabled) return;
    const el = elRef.current;
    if (!el) return;
    let cancelled = false;
    let gsapApi: typeof gsap | undefined;
    let quickX: gsap.QuickToFunc | undefined;
    let quickY: gsap.QuickToFunc | undefined;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX - size.current.w / 2;
      target.current.y = e.clientY - size.current.h / 2;
      quickX?.(target.current.x);
      quickY?.(target.current.y);
    };

    const start = () => {
      window.addEventListener("mousemove", onMove, { passive: true });

      void loadGsap().then((gsap) => {
        if (cancelled || !elRef.current) return;
        gsapApi = gsap;
        quickX = gsap.quickTo(el, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        quickY = gsap.quickTo(el, "y", {
          duration: 0.6,
          ease: "power3.out",
        });
        quickX(target.current.x);
        quickY(target.current.y);
      });
    };
    const unsubscribe = onMotionReady(start);

    return () => {
      cancelled = true;
      unsubscribe();
      window.removeEventListener("mousemove", onMove);
      gsapApi?.killTweensOf(el, "x,y");
    };
  }, [enabled]);

  const isProject = type === "project";
  const w = isProject ? 140 : 10;
  const h = isProject ? 44 : 10;

  useEffect(() => {
    resetCursor();
  }, [pathname, resetCursor]);

  useEffect(() => {
    if (!enabled) return;

    const reset = () => resetCursor();
    const onVisibilityChange = () => {
      if (document.hidden) resetCursor();
    };

    document.addEventListener("mouseleave", reset);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", reset);

    return () => {
      document.removeEventListener("mouseleave", reset);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", reset);
    };
  }, [enabled, resetCursor]);

  useEffect(() => {
    size.current = { w, h };
    if (!enabled || !elRef.current) return;
    const el = elRef.current;
    let cancelled = false;
    const unsubscribe = onMotionReady(() => {
      void loadGsap().then((gsap) => {
        if (cancelled || !elRef.current) return;
        gsap.to(el, {
          width: w,
          height: h,
          duration: 0.5,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      });
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [w, h, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      className={`cursor-rus ${isProject && label ? "cursor-rus--project" : ""}`}
      aria-hidden="true"
    >
      <span className="cursor-rus__label">{label}</span>
    </div>
  );
}
