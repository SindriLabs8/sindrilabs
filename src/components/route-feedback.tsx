"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RouteFeedback() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const release = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (release.current) window.clearTimeout(release.current);
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>("a[href]");
      if (
        !target ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        target.target === "_blank"
      )
        return;
      const url = new URL(target.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      )
        return;
      setLoading(true);
      if (release.current) window.clearTimeout(release.current);
      // Failsafe: never leave progress UI on screen if navigation is interrupted.
      release.current = window.setTimeout(() => setLoading(false), 1800);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="route-progress"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 0.86, opacity: 1 }}
          exit={{
            scaleX: 1,
            opacity: 0,
            transition: { duration: reducedMotion ? 0 : 0.2 },
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
