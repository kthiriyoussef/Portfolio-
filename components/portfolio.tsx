"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUp, BrainCircuit, Check, ChevronDown,
  Code2, Download, ExternalLink, Github, Languages, Linkedin, Mail,
  MapPin, Menu, MessageCircle, Network, Printer, Send, ShieldCheck, X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { copy, personal, type Locale } from "@/lib/portfolio-data";

const sectionIds = ["home", "about", "experience", "projects", "skills", "education", "contact"];
const pillarIcons = [Code2, BrainCircuit, ShieldCheck];

type LocalizedContent = (typeof copy)["en"];
type Project = LocalizedContent["projects"][number];

function ExternalSocials({ locale }: { locale: Locale }) {
  const links = [
    { label: "LinkedIn", href: personal.social.linkedin, Icon: Linkedin },
    { label: "GitHub", href: personal.social.github, Icon: Github },
  ].filter((link) => link.href.trim().length > 0);
  if (!links.length) return null;
  return <>{links.map(({ label, href, Icon }) => (
    <a className="social-link" href={href} key={label} rel="noreferrer" target="_blank" aria-label={`${label} — open in a new tab`}>
      <Icon size={14} /> {label}<span className="sr-only"> ({locale === "fr" ? "ouvre un nouvel onglet" : "opens in a new tab"})</span>
    </a>
  ))}</>;
}

function moveMagneticTarget(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mag-x", `${(event.clientX - bounds.left - bounds.width / 2) * 0.08}px`);
  event.currentTarget.style.setProperty("--mag-y", `${(event.clientY - bounds.top - bounds.height / 2) * 0.08}px`);
}

function resetMagneticTarget(event: React.PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--mag-x", "0px");
  event.currentTarget.style.setProperty("--mag-y", "0px");
}

function CodeVisual() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.7 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);
  const float = (distance: number, duration: number) => reducedMotion
    ? { y: 0 }
    : { y: [0, distance, 0], transition: { duration, repeat: Infinity, ease: "easeInOut" as const } };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
  return (
    <div
      className="hero-visual"
      aria-label="Illustrated software editor and deployment status"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="visual-glow" />
      <motion.div
        className="code-window"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : .75, delay: reducedMotion ? 0 : .22 }}
        style={{ rotateX, rotateY }}
      >
        <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>application.ts</span><span>TS</span></div>
        <div className="code-body" aria-hidden="true">
          <div className="code-line"><span className="line-number">1</span><span><span className="code-purple">const</span> engineer <span className="code-muted">=</span> {"{"}</span></div>
          <div className="code-line"><span className="line-number">2</span><span>  <span className="code-blue">focus</span>: <span className="code-green">&quot;full-stack&quot;</span>,</span></div>
          <div className="code-line"><span className="line-number">3</span><span>  <span className="code-blue">principles</span>: [</span></div>
          <div className="code-line"><span className="line-number">4</span><span>    <span className="code-green">&quot;clear architecture&quot;</span>,</span></div>
          <div className="code-line"><span className="line-number">5</span><span>    <span className="code-green">&quot;thoughtful delivery&quot;</span>,</span></div>
          <div className="code-line"><span className="line-number">6</span><span>    <span className="code-green">&quot;useful software&quot;</span></span></div>
          <div className="code-line"><span className="line-number">7</span><span>  ],</span></div>
          <div className="code-line"><span className="line-number">8</span><span>  <span className="code-blue">learning</span>: <span className="code-purple">&quot;always&quot;</span></span></div>
          <div className="code-line"><span className="line-number">9</span><span>{"}"};</span></div>
          <div className="terminal-strip"><span className="terminal-dot" /> pipeline <span className="code-green">ready</span> <span className="code-muted">·</span> building what matters</div>
        </div>
      </motion.div>
      <motion.div className="float-chip chip-a" animate={float(-6, 4.5)}><Network className="chip-icon" size={14} /> REST APIs</motion.div>
      <motion.div className="float-chip chip-b" animate={float(6, 5)}><BrainCircuit className="chip-icon" size={14} /> Applied AI</motion.div>
      <motion.div className="float-chip chip-c" animate={float(-4, 4)}><Code2 className="chip-icon" size={14} /> Full-stack</motion.div>
    </div>
  );
}

function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 500, damping: 38, mass: 0.35 });
  const y = useSpring(cursorY, { stiffness: 500, damping: 38, mass: 0.35 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reducedMotion || !pointer.matches) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    const onPointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);
    };
    const onPointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-cursor], a, button");
      if (!target) {
        setLabel("");
        return;
      }
      setLabel(target.dataset.cursor || (target.matches(".project-open") ? "VIEW PROJECT" : "EXPLORE"));
    };
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest("[data-cursor], a, button")) return;
      setLabel("");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [cursorX, cursorY, reducedMotion]);

  if (!enabled) return null;
  return (
    <motion.div
      className={`custom-cursor ${visible ? "is-visible" : ""} ${label ? "is-hovering" : ""}`}
      aria-hidden="true"
      style={{ x, y }}
    >
      <span className="cursor-ring" />
      <span className="cursor-dot" />
      <span className="cursor-label">{label}</span>
    </motion.div>
  );
}

function ProjectArt({ type }: { type: string }) {
  const caption: Record<string, string> = {
    health: "Care · Retrieval · Validation",
    learning: "Learn · Track · Certify",
    crm: "Customers · Quotations · Operations",
    recruitment: "Discover · Evaluate · Compare",
    event: "Plan · Reserve · Coordinate",
    automotive: "Inventory · Sales · Customers",
    prices: "Collect · Structure · Compare",
  };
  return (
    <div className={`project-art art-${type}`} aria-hidden="true">
      <div className="dashboard-preview">
        <div className="preview-top"><span>{type === "health" ? "ORIENTATION / OVERVIEW" : type.toUpperCase() + " / OVERVIEW"}</span><span>● ● ●</span></div>
        <div className="preview-layout">
          <div className="preview-sidebar"><i /><i /><i /><i /><i /></div>
          <div className="preview-main">
            <div className="preview-title-bar" /><div className="preview-subtitle-bar" />
            <div className="preview-cards"><div className="preview-card" /><div className="preview-card" /><div className="preview-card" /></div>
            <div className="preview-chart" />
          </div>
        </div>
      </div>
      <span className="art-caption">{caption[type] || "Designed for real workflows"}</span>
    </div>
  );
}

export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroLine, setHeroLine] = useState(0);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0);
  const [projectFilter, setProjectFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTop, setShowTop] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: experienceScroll } = useScroll({
    target: experienceRef,
    offset: ["start 72%", "end 48%"],
  });
  const timelineProgress = useSpring(experienceScroll, { stiffness: 90, damping: 28 });
  const content = copy[locale];
  const reducedMotion = useReducedMotion();
  const appear = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : .55, ease: "easeOut" as const } },
  }), [reducedMotion]);
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        shell.style.setProperty("--pointer-x", `${event.clientX}px`);
        shell.style.setProperty("--pointer-y", `${event.clientY + window.scrollY}px`);
        frame = 0;
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-24% 0px -60% 0px", threshold: [0, .15, .35] });
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setHeroLine((current) => (current + 1) % content.heroLines.length), 3600);
    return () => window.clearInterval(timer);
  }, [content.heroLines.length, reducedMotion]);

  useEffect(() => {
    if (!selectedProject) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modalCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key === "Tab") {
        const dialog = document.querySelector(".project-modal");
        const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [selectedProject]);

  const navTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };
  const projectFilterKey = ["All projects", "Full-stack", "Applied AI", "DevOps", "Other"][content.filters.indexOf(projectFilter)];
  const filteredProjects = content.projects.filter((project) => !projectFilterKey || projectFilterKey === "All projects" || project.filter.includes(projectFilterKey));
  const categories = [...new Set(content.skillGroups.map((group) => group.name))];
  const skillNameFor = (index: number) => locale === "fr"
    ? ["Backend et API", "Frontend", "Bases de données", "IA et apprentissage automatique", "DevOps et cloud"][index]
    : ["Backend & APIs", "Frontend", "Databases", "AI & Machine Learning", "DevOps & Cloud"][index];
  const visibleSkillGroups = content.skillGroups.filter((_, index) => skillFilter === "All" || skillFilter === "Tout" || skillNameFor(index) === skillFilter);

  return (
    <main className="site-shell" ref={shellRef}>
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      <CustomCursor />
      <nav className={`navigation ${scrolled ? "is-scrolled" : ""}`} aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
        <div className="nav-inner">
          <a className="brand-mark" href="#home" onClick={() => navTo("home")} aria-label="Mohamed Youssef KTHIRI — home">
            <span className="brand-symbol">MK</span><span className="brand-name">MOHAMED KTHIRI</span>
          </a>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {content.nav.map((label, index) => (
              <a className={`nav-link ${activeSection === sectionIds[index] ? "active" : ""}`} href={`#${sectionIds[index]}`} key={sectionIds[index]} onClick={(event) => { event.preventDefault(); navTo(sectionIds[index]); }}>
                {label}
                {activeSection === sectionIds[index] && <motion.span className="nav-active-indicator" layoutId="nav-active-indicator" />}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <div className="language-switch" aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}>
              <button type="button" aria-pressed={locale === "en"} onClick={() => { setLocale("en"); setProjectFilter("All"); setSkillFilter("All"); document.documentElement.lang = "en"; }}>EN</button>
              <button type="button" aria-pressed={locale === "fr"} onClick={() => { setLocale("fr"); setProjectFilter("Tous les projets"); setSkillFilter("Tout"); document.documentElement.lang = "fr"; }}>FR</button>
            </div>
            <a className="button-primary nav-cv" href={personal.cvPath} download="Mohamed_Youssef_Kthiri_CV.pdf"><Download size={13} /> CV</a>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="content-width hero-grid">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : .1 } } }}>
            <motion.div className="hero-greeting" variants={appear}>{content.greeting}</motion.div>
            <motion.h1 className="hero-title" variants={appear}>
              <span>{personal.firstName}</span><span className="surname">{personal.surname}</span>
            </motion.h1>
            <motion.p className="hero-role" variants={appear}>{personal.title}</motion.p>
            <motion.div className="hero-rotator" aria-live="polite" variants={appear}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={heroLine} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: reducedMotion ? 0 : .24 }}>{content.heroLines[heroLine]}</motion.span>
              </AnimatePresence>
            </motion.div>
            <motion.p className="hero-description" variants={appear}>{content.heroDescription}</motion.p>
            <motion.div className="availability" variants={appear}><span className="availability-dot" />{content.availability} <span>— {personal.availability}</span></motion.div>
            <motion.div className="hero-actions" variants={appear}>
              <a className="button-primary" href="#projects" onPointerMove={moveMagneticTarget} onPointerLeave={resetMagneticTarget} onClick={(event) => { event.preventDefault(); navTo("projects"); }}>{content.explore}<ArrowRight size={15} /></a>
              <a className="button-secondary" href={personal.cvPath} download="Mohamed_Youssef_Kthiri_CV.pdf" onPointerMove={moveMagneticTarget} onPointerLeave={resetMagneticTarget}><Download size={14} />{locale === "fr" ? "Télécharger mon CV" : "Download CV"}</a>
              <a className="button-secondary" href="#contact" onPointerMove={moveMagneticTarget} onPointerLeave={resetMagneticTarget} onClick={(event) => { event.preventDefault(); navTo("contact"); }}><MessageCircle size={14} />{content.connect}</a>
            </motion.div>
            <motion.div className="hero-socials" variants={appear}><ExternalSocials locale={locale} /></motion.div>
            <motion.div className="hero-proofline" variants={appear}>
              <span>ESPRIT <i /> TUNISIA</span>
              <span>{locale === "fr" ? "STAGE PFE · 6 MOIS" : "PFE INTERNSHIP · 6 MONTHS"}</span>
            </motion.div>
          </motion.div>
          <CodeVisual />
        </div>
        <a className="scroll-cue" href="#about" onClick={(event) => { event.preventDefault(); navTo("about"); }}>SCROLL TO EXPLORE <ArrowDown size={11} /></a>
      </section>

      <Section id="about" eyebrow={content.aboutEyebrow} title={content.aboutTitle} intro={content.aboutDescription} variants={appear}>
        <div className="about-editorial">
          <motion.aside className="about-education glass-card" variants={appear}>
            <span className="project-index">{locale === "fr" ? "FORMATION / 01" : "EDUCATION / 01"}</span>
            <h3>{content.education[0].institution}</h3>
            <p>{content.education[0].degree}</p>
            <span className="about-education-date">{content.education[0].dates}</span>
            <span className="about-education-location">{content.education[0].location}</span>
          </motion.aside>
          <div className="about-grid">
            {content.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return <motion.article className="pillar-card glass-card" key={pillar.title} variants={appear}>
                <div className="pillar-icon"><Icon size={19} /></div><h3>{pillar.title}</h3><p>{pillar.description}</p>
              </motion.article>;
            })}
          </div>
        </div>
        <motion.blockquote className="philosophy" variants={appear}>“{content.philosophy}”</motion.blockquote>
      </Section>

      <Section id="experience" eyebrow={content.experienceEyebrow} title={content.experienceTitle} intro={content.experienceDescription} variants={appear}>
        <div className="experience-list" ref={experienceRef}>
          <motion.span className="experience-progress" aria-hidden="true" style={{ scaleY: timelineProgress }} />
          {content.experiences.map((experience, index) => {
            const expanded = expandedExperience === index;
            return <motion.article className="experience-item" key={experience.company} variants={appear} aria-expanded={expanded}>
              <span className="experience-node" />
              <button className="experience-trigger" type="button" aria-expanded={expanded} onClick={() => setExpandedExperience(expanded ? null : index)}>
                <span><span className="experience-company">{experience.company}</span><span className="experience-role">{experience.role}</span></span>
                <span className="experience-meta"><span className="experience-date">{experience.dates}</span><span>{experience.place}</span><ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .2s" }} /></span>
              </button>
              <AnimatePresence initial={false}>
                {expanded && <motion.div className="experience-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .25 }}>
                  <p className="experience-description">{experience.description}</p>
                  <ul className="detail-list">{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  <div className="tech-list">{experience.stack.map((tech) => <span className="pill" key={tech}>{tech}</span>)}</div>
                </motion.div>}
              </AnimatePresence>
            </motion.article>;
          })}
        </div>
      </Section>

      <Section id="projects" eyebrow={content.projectsEyebrow} title={content.projectsTitle} intro={content.projectsDescription} variants={appear}>
        <div className="project-toolbar" role="group" aria-label={locale === "fr" ? "Filtrer les projets" : "Filter projects"}>
          {content.filters.map((filter) => (
            <button className="filter-button" type="button" key={filter} aria-pressed={projectFilter === filter || ((projectFilter === "All" || projectFilter === "Tous les projets") && (filter === "All projects" || filter === "Tous les projets"))} onClick={() => setProjectFilter(filter)}>{filter}</button>
          ))}
        </div>
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                className={`project-card glass-card ${index === 0 && projectFilter === "All" || index === 0 && projectFilter === "Tous les projets" ? "featured" : ""}`}
                key={project.number}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: .16 }}
                variants={appear}
                exit={{ opacity: 0, y: 9 }}
                transition={{ duration: reducedMotion ? 0 : .4, ease: "easeOut" }}
                data-cursor={locale === "fr" ? "DÉCOUVRIR" : "DISCOVER"}
                onPointerMove={(event) => {
                  if (event.pointerType !== "mouse") return;
                  const bounds = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
                  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
                  event.currentTarget.style.setProperty("--tilt-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 3}deg`);
                  event.currentTarget.style.setProperty("--tilt-y", `${((event.clientY - bounds.top) / bounds.height - .5) * -3}deg`);
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.setProperty("--tilt-x", "0deg");
                  event.currentTarget.style.setProperty("--tilt-y", "0deg");
                }}
              >
                <ProjectArt type={project.visual} />
                <div className="project-info">
                  <span className="project-index">PROJECT / {project.number}</span>
                  <div className="project-title-row"><h3 className="project-title">{project.title}</h3>{project.year && <span className="project-year">{project.year}</span>}</div>
                  <div className="project-category">{project.category}</div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-stack">{project.stack.slice(0, 5).map((tech) => <span className="pill" key={tech}>{tech}</span>)}{project.stack.length > 5 && <span className="pill">+{project.stack.length - 5}</span>}</div>
                  <button className="project-open" type="button" onClick={() => setSelectedProject(project)}>{content.viewProject}<ArrowRight size={13} /></button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section id="skills" eyebrow={content.skillsEyebrow} title={content.skillsTitle} intro={content.skillsDescription} variants={appear}>
        <div className="skill-filter" role="group" aria-label={locale === "fr" ? "Filtrer les compétences" : "Filter skills"}>
          {[content.allSkills, ...categories].map((category, index) => (
            <button className="filter-button" key={`${category}-${index}`} type="button" aria-pressed={(index === 0 && (skillFilter === "All" || skillFilter === "Tout")) || skillFilter === category} onClick={() => setSkillFilter(index === 0 ? "All" : category)}>{category}</button>
          ))}
        </div>
        <div className="skills-groups">
          {visibleSkillGroups.map((group) => <motion.article className="skill-group glass-card" key={group.name} variants={appear}>
            <h3>{skillNameFor(content.skillGroups.indexOf(group))}</h3>
            <div className="skill-cloud">{group.skills.map((skill, skillIndex) => <span className="pill skill-chip" style={{ animationDelay: `${skillIndex * 35}ms` }} key={skill}>{skill}</span>)}</div>
          </motion.article>)}
        </div>
      </Section>

      <Section id="education" eyebrow={content.educationEyebrow} title={content.educationTitle} variants={appear}>
        <div className="education-grid">
          <div className="education-list">{content.education.map((item) => <motion.article className="education-card glass-card" key={item.institution} variants={appear}>
            <div><span className="education-institution">{item.institution}</span><span className="education-location">{item.location}</span></div>
            <div className="education-degree">{item.degree}</div><div className="education-date">{item.dates}</div>
          </motion.article>)}</div>
          <motion.aside className="language-card glass-card" variants={appear}>
            <h3><Languages size={16} style={{ verticalAlign: "middle", marginRight: 8, color: "#7dd3fc" }} />{content.languageTitle}</h3>
            {content.languages.map((language) => <div className="language-row" key={language.name}><span>{language.name}</span><span className="language-level">{language.level}</span></div>)}
          </motion.aside>
        </div>
      </Section>

      <Section id="contact" eyebrow={content.contactEyebrow} title={content.contactTitle} intro={content.contactDescription} variants={appear}>
        <div className="contact-grid">
          <div className="contact-details">
            <ContactDetail Icon={Mail} label="Email" value={personal.email} href={`mailto:${personal.email}`} />
            <ContactDetail Icon={MessageCircle} label={locale === "fr" ? "Téléphone" : "Phone"} value={personal.phone} href={`tel:${personal.phone.replaceAll(" ", "")}`} />
            <ContactDetail Icon={MapPin} label={locale === "fr" ? "Localisation" : "Location"} value={personal.location} />
            <div className="contact-socials"><ExternalSocials locale={locale} /></div>
            <a className="button-secondary" style={{ justifySelf: "start", marginTop: 7 }} href={personal.cvPath} download="Mohamed_Youssef_Kthiri_CV.pdf"><Download size={14} />{locale === "fr" ? "Télécharger le CV PDF" : "Download CV PDF"}</a>
          </div>
          <ContactForm content={content} />
        </div>
      </Section>

      <footer className="site-footer">
        <div className="content-width footer-inner">
          <span>© {new Date().getFullYear()} {personal.name} · {content.footer}</span>
          <div className="footer-links">
            {content.nav.map((label, index) => <a href={`#${sectionIds[index]}`} key={sectionIds[index]}>{label}</a>)}
            <a href={`mailto:${personal.email}`}>Email</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && <motion.button className="back-to-top" type="button" aria-label={locale === "fr" ? "Retour en haut" : "Back to top"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} onClick={() => navTo("home")}><ArrowUp size={17} /></motion.button>}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
          <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: reducedMotion ? 0 : .2 }}>
            <div className="modal-header"><div><span className="project-index">{content.modal.toUpperCase()} / {selectedProject.number}</span><h2 id="modal-title">{selectedProject.title}</h2><div className="project-category">{selectedProject.category}{selectedProject.year ? ` · ${selectedProject.year}` : ""}</div></div><button ref={modalCloseRef} className="modal-close" type="button" aria-label={content.close} onClick={() => setSelectedProject(null)}><X size={17} /></button></div>
            <div className="modal-body">
              <p>{selectedProject.description}</p>
              <h3>{locale === "fr" ? "Le problème" : "The problem"}</h3><p>{selectedProject.problem}</p>
              <h3>{locale === "fr" ? "Approche technique" : "Technical approach"}</h3><p>{selectedProject.implementation}</p>
              <h3>{locale === "fr" ? "Fonctionnalités clés" : "Key features"}</h3><ul className="detail-list">{selectedProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <h3>{locale === "fr" ? "Technologies" : "Technologies"}</h3><div className="tech-list">{selectedProject.stack.map((tech) => <span className="pill" key={tech}>{tech}</span>)}</div>
              {selectedProject.note && <p className="health-note">{selectedProject.note}</p>}
              {(selectedProject.github || selectedProject.demo) ? <div className="modal-links">
                {selectedProject.github && <a className="button-secondary" href={selectedProject.github} target="_blank" rel="noreferrer"><Github size={14} />GitHub<ExternalLink size={12} /></a>}
                {selectedProject.demo && <a className="button-primary" href={selectedProject.demo} target="_blank" rel="noreferrer"><ExternalLink size={14} />{locale === "fr" ? "Démo en direct" : "Live demo"}</a>}
              </div> : <p style={{ marginTop: 16, fontSize: 10 }}>{content.noLinks}</p>}
            </div>
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}

function Section({ id, eyebrow, title, intro, variants, children }: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  variants: Variants;
  children: React.ReactNode;
}) {
  const words = title.split(/\s+/);
  return <section className="section" id={id}>
    <div className="content-width">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: .13 }}
        variants={{ visible: { transition: { staggerChildren: .055 } } }}
      >
        <motion.span className="eyebrow" variants={variants}>{eyebrow}</motion.span>
        <motion.h2
          className="section-heading"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: .045 } } }}
        >
          {words.map((word, index) => (
            <motion.span className="heading-word" variants={variants} key={`${word}-${index}`}>{word}</motion.span>
          ))}
        </motion.h2>
        {intro && <motion.p className="section-intro" variants={variants}>{intro}</motion.p>}
      </motion.div>
      <motion.div
        className="section-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: .08 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: .08, delayChildren: .04 } } }}
      >
        {children}
      </motion.div>
    </div>
  </section>;
}

function ContactDetail({ Icon, label, value, href }: { Icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = <><span className="contact-detail-icon"><Icon size={16} /></span><span><span className="contact-detail-label">{label}</span><span className="contact-detail-value">{value}</span></span></>;
  return href ? <a className="contact-detail glass-card" href={href}>{content}</a> : <div className="contact-detail glass-card">{content}</div>;
}

function ContactForm({ content }: { content: LocalizedContent }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !subject || !message) {
      setStatus("error");
      return;
    }
    const body = `${message}\n\nName: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.reset();
    setStatus("success");
  }
  return <form className="contact-form glass-card" onSubmit={submit}>
    <div className="form-row">
      <label className="form-field">{content.form.name}<input autoComplete="name" name="name" required maxLength={100} /></label>
      <label className="form-field">{content.form.email}<input autoComplete="email" name="email" type="email" required maxLength={254} /></label>
    </div>
    <label className="form-field">{content.form.subject}<input name="subject" required maxLength={150} /></label>
    <label className="form-field">{content.form.message}<textarea name="message" required maxLength={5000} /></label>
    <label className="honeypot" aria-hidden="true">{content.form.honeypot}<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className={`form-feedback ${status === "error" ? "error" : ""}`} role="status" aria-live="polite">
      {status === "success" ? content.form.success : status === "error" ? content.form.error : ""}
    </div>
    <button className="button-primary" style={{ justifySelf: "start" }} type="submit">
      {content.form.send}{status === "success" ? <Check size={14} /> : <Send size={14} />}
    </button>
  </form>;
}
