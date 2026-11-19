"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="not-found">
      <div className="notfound-grid" />
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>404 / LOST IN THE SYSTEM</p>
        <h1>
          Wrong route.
          <br />
          <em>Right instinct.</em>
        </h1>
        <span>
          This page does not exist, but the rest of the archive is ready when
          you are.
        </span>
        <div>
          <Link href="/">Return home ↗</Link>
          <button onClick={() => router.back()}>Go back</button>
          <Link href="/projects">Explore work →</Link>
        </div>
      </motion.section>
    </main>
  );
}
