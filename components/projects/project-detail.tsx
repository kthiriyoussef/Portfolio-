"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, ExternalLink, Github } from "lucide-react";
import { personal, type Locale } from "@/lib/portfolio-data";
import type { LocalizedProject } from "@/lib/project-catalog";
import CrmEnvironment from "@/components/projects/crm-environment";

export default function ProjectDetail({ project }: { project: LocalizedProject }) {
  const [locale, setLocale] = useState<Locale>("en");
  const content = project[locale];
  const story = project.story?.[locale];
  const isCrm = project.slug === "agil-energy-crm";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className={`project-environment project-theme-${content.visual}`}>
      <header className="project-environment-nav">
        <Link className="project-back-link" href="/#projects"><ArrowLeft size={15} />{locale === "fr" ? "Retour au portfolio" : "Back to portfolio"}</Link>
        <div className="project-language-switch" role="group" aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}>
          <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
          <button type="button" aria-pressed={locale === "fr"} onClick={() => setLocale("fr")}>FR</button>
        </div>
      </header>

      <div className="project-environment-content">
        <section className="project-environment-hero" aria-labelledby="project-title">
          <span className="project-environment-index">PROJECT ENVIRONMENT / {content.number}</span>
          <p className="project-environment-category">{content.category}{content.year ? ` · ${content.year}` : ""}</p>
          <h1 id="project-title">{content.title}</h1>
          <p className="project-environment-summary">{story?.overview ?? content.description}</p>
          <div className="project-environment-actions">
            {content.github && <a className="button-secondary" href={content.github} target="_blank" rel="noreferrer"><Github size={14} />GitHub<ExternalLink size={12} /></a>}
            {content.demo && <a className="button-primary" href={content.demo} target="_blank" rel="noreferrer"><ExternalLink size={14} />{locale === "fr" ? "Démo en direct" : "Live demo"}</a>}
            <a className="button-secondary" href={personal.cvPath} download="Mohamed_Youssef_Kthiri_CV.pdf"><Download size={14} />CV</a>
          </div>
          {!content.github && !content.demo && <p className="project-resource-note">{locale === "fr" ? "Aucun dépôt ou démonstration disponible dans les ressources du portfolio." : "No repository or live demo was supplied with the portfolio resources."}</p>}
        </section>

        <section className="project-environment-workspace" aria-labelledby="workspace-title">
          <div className="project-workspace-topline"><span className="workspace-live-dot" />{locale === "fr" ? "ESPACE DE PRÉSENTATION" : "PROJECT BRIEF"}</div>
          <h2 id="workspace-title">{locale === "fr" ? "Aperçu du produit" : "Product overview"}</h2>
          <div className="project-overview-cards">
            <article><span>{locale === "fr" ? "LE BESOIN" : "THE NEED"}</span><p>{content.problem}</p></article>
            <article><span>{locale === "fr" ? "L'APPROCHE" : "THE APPROACH"}</span><p>{content.implementation}</p></article>
            {story && <article><span>{locale === "fr" ? "PUBLIC CIBLE" : "INTENDED USERS"}</span><p>{story.audience}</p></article>}
          </div>
          {isCrm ? (
            <CrmEnvironment locale={locale} />
          ) : (
            <div className="project-details-grid">
              <article className="project-overview-panel">
                <span className="detail-eyebrow">{locale === "fr" ? "FONCTIONNALITÉS DOCUMENTÉES" : "DOCUMENTED FEATURES"}</span>
                <ul className="detail-list">{content.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </article>
              {story && <article className="project-overview-panel">
                <span className="detail-eyebrow">{locale === "fr" ? "CONTRIBUTION" : "MY CONTRIBUTION"}</span>
                <p>{story.contribution}</p>
              </article>}
            </div>
          )}
        </section>

        <section className="project-environment-section">
          <span className="detail-eyebrow">{locale === "fr" ? "ARCHITECTURE & TECHNOLOGIES" : "ARCHITECTURE & TECHNOLOGIES"}</span>
          {story && <div className="architecture-flow"><span>{story.flow}</span></div>}
          <div className="project-technology-list">{content.stack.map((technology) => <span className="pill" key={technology}>{technology}</span>)}</div>
          {story && <div className="architecture-nodes">
            {story.nodes.map((node) => <article className="architecture-node-card" key={node.name}>
              <strong>{node.name}</strong><p>{node.role}</p>
            </article>)}
          </div>}
        </section>

        {story && <section className="project-environment-section project-engineering-notes">
          <article><span className="detail-eyebrow">{locale === "fr" ? "DÉCISIONS & DÉFIS" : "ENGINEERING CHALLENGE"}</span><p>{story.challenge}</p></article>
          <p className="project-resource-note">{story.galleryNote}</p>
          {story.statusNote && <p className="project-status-note">{story.statusNote}</p>}
        </section>}

        <Link className="project-next-link" href="/#projects">{locale === "fr" ? "Retour aux projets" : "Return to all projects"}<ArrowRight size={15} /></Link>
      </div>
    </main>
  );
}
