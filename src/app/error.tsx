"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Portfolio route error:", error); }, [error]);
  return <main className="recovery"><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SYSTEM / RECOVERY</motion.p><motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>A route took an<br/><em>unexpected turn.</em></motion.h1><p>Nothing is lost. Try the page again, or return to the archive.</p><div><button onClick={reset}>Try again ↗</button><a href="/">Return home →</a></div></main>;
}
