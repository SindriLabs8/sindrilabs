"use client";

import { certifications } from "@/constants/certification";
import { chapters } from "@/constants/chapters";
import { domains } from "@/constants/domains";
import { projects } from "@/constants/projects";
import { testimonials } from "@/constants/testimonials";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaCode,
  FaCreditCard,
  FaDatabase,
  FaJava,
  FaServer,
} from "react-icons/fa6";
import {
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type I = "arrow" | "github" | "mail" | "x" | "external" | "plus";
function Icon({ n, size = 17 }: { n: I; size?: number }) {
  const p: Record<I, ReactNode> = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="m19 5-9 9" />
        <path d="M19 13v6H5V5h6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    github: (
      <path d="M8 20c-4 1.2-4-2-5.5-2.5M15.5 22v-3.1a2.7 2.7 0 0 0-.8-2.1c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C7.7 4.3 6.7 4.6 6.7 4.6a4.2 4.2 0 0 0-.1 3.1 4.6 4.6 0 0 0-1.2 3.1c0 4.7 2.8 5.7 5.5 6a2.7 2.7 0 0 0-.8 2.1V22" />
    ),
    x: <path d="M5 4l14 16M19 4 5 20" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {p[n]}
    </svg>
  );
}

const skillIcons: Record<string, IconType> = {
  "Next.js App Router": SiNextdotjs,
  "React 19": SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS v4": SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  "REST API": FaServer,
  "Server Actions": FaCode,
  "Supabase Client": SiSupabase,
  Midtrans: FaCreditCard,
  Docker: SiDocker,
  "C++": SiCplusplus,
  Java: FaJava,
  PHP: SiPhp,
  Laravel: SiLaravel,
};
function SkillLogo({ skill }: { skill: string }) {
  const Mark = skillIcons[skill] ?? FaCode;
  return (
    <span className="skill-symbol" aria-hidden="true">
      <Mark />
    </span>
  );
}

export default function App() {
  const [active, setActive] = useState("intro"),
    [hidden, setHidden] = useState(false),
    [scrollProgress, setScrollProgress] = useState(0),
    [testimonialIndex, setTestimonialIndex] = useState(0),
    [dragStart, setDragStart] = useState<number | null>(null),
    [activeExperience, setActiveExperience] = useState(0),
    [pointerLabel, setPointerLabel] = useState("Open"),
    [pointerVisible, setPointerVisible] = useState(false),
    [pointerKind, setPointerKind] = useState("default");
  const pointerRef = useRef<HTMLDivElement>(null);
  const nav = [
    ["intro", "Index"],
    ["work", "Work"],
    ["thinking", "Skills"],
    ["certifications", "Credentials"],
    ["journey", "Experience"],
    ["contact", "Contact"],
  ] as const;
  useEffect(() => {
    let last = 0,
      frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY,
        max = document.documentElement.scrollHeight - window.innerHeight,
        ratio = max > 0 ? Math.min(y / max, 1) : 0;
      document.documentElement.style.setProperty(
        "--scroll-ratio",
        ratio.toFixed(4),
      );
      setScrollProgress(Math.round(ratio * 100));
      setHidden(y > 130 && y > last);
      last = y;
      const marker = window.innerHeight * 0.34;
      let current = "intro";
      nav.forEach(([id]) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker)
          current = id;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => (el.dataset.revealed = "true"));
      return;
    }
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const pointer = pointerRef.current;
    if (!pointer) return;
    const move = (event: PointerEvent) => {
      pointer.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0) translate3d(-50%,-50%,0)`;
    };
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pointer]"),
    );
    const enter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      setPointerLabel(target.dataset.pointer || "Open");
      setPointerKind(target.dataset.pointerKind || "default");
      setPointerVisible(true);
    };
    const leave = () => setPointerVisible(false);
    targets.forEach((target) => {
      target.addEventListener("pointerenter", enter);
      target.addEventListener("pointerleave", leave);
      target.addEventListener("pointermove", move);
    });
    return () =>
      targets.forEach((target) => {
        target.removeEventListener("pointerenter", enter);
        target.removeEventListener("pointerleave", leave);
        target.removeEventListener("pointermove", move);
      });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveExperience(
              Number((entry.target as HTMLElement).dataset.experienceIndex),
            );
        }),
      { threshold: 0.55 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-experience-index]")
      .forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActive(id);
    window.scrollTo({
      top: Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - 94,
      ),
      behavior: "smooth",
    });
  };
  const showTestimonial = (direction: 1 | -1) =>
    setTestimonialIndex(
      (index) =>
        (index + direction + testimonials.length) % testimonials.length,
    );
  const finishTestimonialDrag = (clientX: number) => {
    if (dragStart === null) return;
    const distance = clientX - dragStart;
    if (Math.abs(distance) > 42) showTestimonial(distance < 0 ? 1 : -1);
    setDragStart(null);
  };
  return (
    <main>
      <div
        ref={pointerRef}
        className={`hover-pointer ${pointerVisible ? "visible" : ""} ${pointerKind}`}
        aria-hidden="true"
      >
        <span>{pointerLabel}</span>
        <svg className="skill-pointer-shape" viewBox="0 0 32 40" fill="none">
          <path
            d="M3 2v31.5l8.3-7 5.7 11.2 5.3-2.7-5.6-11.1H28L3 2Z"
            fill="#2D9CFF"
            stroke="#F5FAFF"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={scrollProgress}
      >
        <i style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        <span>{scrollProgress}%</span>
      </div>
      <nav className={`topnav ${hidden ? "hide" : ""}`}>
        <a
          href="#intro"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            go("intro");
          }}
        >
          <Image
            src="/icon.jpg"
            alt="Triputra Harza"
            width={24}
            height={24}
            priority
          />
          <span>Triputra Harza</span>
        </a>
        <div className="navcore">
          {nav.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={active === id ? "on" : ""}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="navright">
          <span
            className="nav-progress"
            aria-label={`Scroll progress ${scrollProgress}%`}
          >
            {scrollProgress.toString().padStart(2, "0")}%
          </span>
          <a
            href="https://github.com/THRG1170"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Icon n="github" />
          </a>
          <button type="button" onClick={() => go("contact")}>
            Start a project <Icon n="arrow" size={14} />
          </button>
        </div>
      </nav>
      <section className="intro intro--split" id="intro">
        <div className="split-hero">
          <div className="split-hero-copy" data-reveal>
            <p className="split-kicker">Triputra Harza / Full-stack engineer</p>
            <h1>
              Software
              <br />
              built to feel
              <br />
              <em>inevitable.</em>
            </h1>
            <p className="split-lede">
              I design and build modern web products where considered interfaces
              meet durable engineering.
            </p>
            <div className="split-actions">
              <button type="button" onClick={() => go("work")}>
                View selected work <Icon n="arrow" />
              </button>
              <a href="mailto:trahmadisyawal@gmail.com">
                Start a conversation <Icon n="mail" />
              </a>
            </div>
            <p className="split-index">01 / Introduction</p>
          </div>
          <figure className="hero-portrait" data-reveal>
            <Image
              src="/triputra-harza-portrait.jpeg"
              alt="Portrait of Triputra Harza"
              width={900}
              height={900}
              priority
            />
          </figure>
        </div>
      </section>
      <section className="work project-gallery" id="work">
        <header className="section-head gallery-head" data-reveal>
          <span>01 / Selected output</span>
          <h2>
            Projects with
            <br />
            <em>a point of view.</em>
          </h2>
          <p>
            Six products, each shaped around a distinct user need and a real
            technical system.
          </p>
        </header>
        <div className="gallery-caption">
          <span>Selected projects</span>
          <span>
            {projects.length.toString().padStart(2, "0")} in the archive
          </span>
        </div>
        <div className="project-tile-grid">
          {projects.map((p, i) => (
            <a
              data-reveal
              data-pointer="Open"
              className={`project-tile ${p.tone}`}
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${p.name}`}
            >
              <div className="project-tile-top">
                <span>0{i + 1}</span>
                <span>{p.type}</span>
                <Icon n="external" size={15} />
              </div>
              <div className="project-tile-body">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
              <div className="project-tile-stack">
                {p.stack.slice(0, 4).map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="skills-gallery" id="thinking">
        <header className="skills-intro" data-reveal>
          <span>02 / Technical range</span>
          <h2>
            A connected
            <br />
            <em>toolkit.</em>
          </h2>
          <p>
            Technology choices made for the whole product—not just the visible
            layer.
          </p>
        </header>
        <div className="skill-groups">
          {domains.map(([number, title, items]) => (
            <section
              className="skill-group"
              data-reveal
              key={title}
              aria-labelledby={`skill-${number}`}
            >
              <header>
                <span>{number}</span>
                <h3 id={`skill-${number}`}>{title}</h3>
                <p>{items.length} tools</p>
              </header>
              <div className="skill-tile-grid">
                {items.map((skill, index) => (
                  <article
                    className="skill-tile"
                    data-pointer="Explore"
                    data-pointer-kind="skill"
                    key={skill}
                  >
                    <SkillLogo skill={skill} />
                    <strong>{skill}</strong>
                    <i>0{index + 1}</i>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="certifications" id="certifications">
        <header className="certifications-head" data-reveal>
          <span>03 / Credentials</span>
          <h2>
            Learning,
            <br />
            <em>documented.</em>
          </h2>
          <p>
            Certificates earned through applied coursework and continued
            practice.
          </p>
        </header>
        <div className="certificate-grid">
          {certifications.map((certificate) => (
            <article
              className="certificate-card"
              data-reveal
              data-pointer="✓"
              data-pointer-kind="certificate"
              key={certificate.id}
            >
              <div className="certificate-art">
                <Image
                  src={certificate.image}
                  alt={`${certificate.title} certificate`}
                  width={1080}
                  height={765}
                />
              </div>
              <div className="certificate-meta">
                <div>
                  <span>{certificate.issuer}</span>
                  <h3>{certificate.title}</h3>
                </div>
                <p>
                  {certificate.date}
                  <br />
                  ID {certificate.id}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="journey experience-reveal" id="journey">
        <aside className="experience-sticky">
          <span>04 / Experience</span>
          <p className="experience-year">{chapters[activeExperience][0]}</p>
          <h2>{chapters[activeExperience][1]}</h2>
          <p className="experience-description">
            {chapters[activeExperience][2]}
          </p>
          <div className="experience-count">
            <span>{String(activeExperience + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(chapters.length).padStart(2, "0")}</span>
          </div>
        </aside>
        <div className="experience-steps">
          {chapters.map(([year, title, text], i) => (
            <article
              className={activeExperience === i ? "active" : ""}
              data-experience-index={i}
              key={year}
            >
              <span>{year}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <b>{String(i + 1).padStart(2, "0")}</b>
            </article>
          ))}
        </div>
      </section>
      <section className="testimonials" aria-labelledby="testimonials-title">
        <div className="testimonials-copy">
          <span>05 / Testimonials</span>
          <h2 id="testimonials-title">
            In their
            <br />
            <em>words.</em>
          </h2>
        </div>
        <div
          className="testimonial-carousel"
          onPointerDown={(event) => setDragStart(event.clientX)}
          onPointerUp={(event) => finishTestimonialDrag(event.clientX)}
          onPointerCancel={() => setDragStart(null)}
        >
          <blockquote
            className="testimonial"
            key={testimonials[testimonialIndex].name}
          >
            <p>“{testimonials[testimonialIndex].quote}”</p>
            <footer>{testimonials[testimonialIndex].name}</footer>
          </blockquote>
          <div className="testimonial-controls">
            <button
              type="button"
              onClick={() => showTestimonial(-1)}
              aria-label="Previous testimonial"
            >
              <Icon n="arrow" size={17} />
            </button>
            <span>
              {String(testimonialIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => showTestimonial(1)}
              aria-label="Next testimonial"
            >
              <Icon n="arrow" size={17} />
            </button>
          </div>
        </div>
      </section>
      <section className="wordfield" aria-label="Triputra Harza creative index">
        <header className="wordfield-head">
          <span>06 / The signal</span>
          <p>Words that shape the work.</p>
        </header>
        <div className="word-board" aria-label="Animated word search">
          <p>
            QWE<span className="word-mark mark-triputra">TRIPUTRAHARZA</span>
            PLATFORM
          </p>
          <p>RAIVOICEAGENTBVCXZQPLKM</p>
          <p>
            YOUTUB<span className="word-mark mark-builder">WEBBUILDER</span>
            NELQPLK
          </p>
          <p>
            WERT<span className="word-mark mark-vibe">VIBECODINGIDE</span>TYQW
          </p>
          <p>
            AINEWS<span className="word-mark mark-stack">FULLSTACK</span>RMBHNMK
          </p>
          <p>
            G<span className="word-mark mark-craft">PRODUCTCRAFT</span>FIRMBNMK
          </p>
          <p>
            HCONTENT
            <span className="word-mark mark-systems">SYSTEMTHINKING</span>
          </p>
          <p>JCONSULTINGBWCXZZLQWER</p>
          <p>KSUPPORTAGENTMNBVCXQPL</p>
        </div>
        <p className="wordfield-caption">
          TRIPUTRAHARZA · WEBBUILDER · VIBECODINGIDE · FULLSTACK · PRODUCTCRAFT
          · SYSTEMTHINKING
        </p>
      </section>
      <section className="contact" id="contact" data-reveal>
        <div className="contact-top">
          <span>07 / Open channel</span>
          <p>
            For ambitious web products, thoughtful collaborations, or a useful
            conversation.
          </p>
        </div>
        <h2>
          Let’s make the next
          <br />
          <em>thing matter.</em>
        </h2>
        <div className="contact-grid">
          <a href="mailto:trahmadisyawal@gmail.com" className="contact-primary">
            <span>Direct line</span>
            <strong>
              trahmadisyawal
              <br />
              @gmail.com
            </strong>
            <Icon n="arrow" />
          </a>
          <div className="contact-info">
            <p>
              <span>Location</span>Palu, Sulawesi Tengah, Indonesia
            </p>
            <p>
              <span>Timezone</span>WITA / UTC+8
            </p>
            <p>
              <span>Availability</span>Open for meaningful work
            </p>
          </div>
          <div className="contact-links">
            <a
              href="https://github.com/THRG1170"
              target="_blank"
              rel="noreferrer"
            >
              <Icon n="github" /> GitHub
            </a>
            <a
              href="https://x.com/triputraharza"
              target="_blank"
              rel="noreferrer"
            >
              <Icon n="x" /> X / Twitter
            </a>
          </div>
        </div>
      </section>
      <footer>
        <a href="#intro" onClick={() => go("intro")} className="brand">
          <Image
            src="/icon.jpg"
            alt="Triputra Harza"
            width={24}
            height={24}
            priority
          />
          <span>TH</span>
        </a>
        <span>© 2025 Triputra Harza</span>
        <span>Made with care / no shortcuts</span>
      </footer>
    </main>
  );
}
