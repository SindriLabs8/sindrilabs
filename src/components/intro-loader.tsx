"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setTimeout(
      () => setVisible(false),
      reducedMotion ? 360 : 980,
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="wordmark-loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -8,
            transition: { duration: reducedMotion ? 0.03 : 0.28, ease },
          }}
        >
          <div className="wordmark-center">
            <div className="wordmark-mask">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.16, duration: 0.62, ease }}
              >
                Triputra Harza
                <span />
              </motion.h1>
            </div>
            <motion.p
              className="wordmark-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.3 }}
            >
              Opening the archive
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
