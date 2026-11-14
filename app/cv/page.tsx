import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { copy, personal } from "@/lib/portfolio-data";
import PrintButton from "@/components/print-button";

export const metadata = { title: `CV | ${personal.name}`, robots: { index: false, follow: false } };

export default function ResumePage() {
  const content = copy.en;
  return (
    <main className="resume-page">
      <div className="resume-toolbar">
        <Link className="button-secondary" href="/"><ArrowLeft size={14} /> Portfolio</Link>
        <PrintButton />
      </div>
      <article className="resume-paper">
        <header>
          <h1>{personal.name}</h1>
          <div className="resume-subtitle">{personal.title} | Applied AI &amp; DevOps</div>
          <div className="resume-contact">{personal.location} · {personal.email} · {personal.phone}</div>
        </header>
        <section className="resume-section">
          <h2>Profile</h2>
          <p className="resume-summary">Final-year Software Engineering student at ESPRIT, passionate about building reliable full-stack applications, intelligent software solutions and scalable architectures. Seeking a six-month PFE internship starting January 2027.</p>
        </section>
        <section className="resume-section">
          <h2>Experience</h2>
          {content.experiences.map((experience) => (
            <div className="resume-entry" key={experience.company}>
              <div className="resume-entry-head"><strong>{experience.company} — {experience.role}</strong><span>{experience.dates}</span></div>
              <em>{experience.place}</em>
              <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <em>Technologies: {experience.stack.join(", ")}</em>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Education</h2>
          {content.education.map((item) => (
            <div className="resume-entry" key={item.institution}>
              <div className="resume-entry-head"><strong>{item.institution} — {item.degree}</strong><span>{item.dates}</span></div>
              <em>{item.location}</em>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Technical skills</h2>
          {content.skillGroups.map((group) => (
            <p className="resume-skills" key={group.name}><strong>{group.name}:</strong> {group.skills.join(", ")}</p>
          ))}
        </section>
        <section className="resume-section">
          <h2>Languages</h2>
          <p className="resume-summary">{content.languages.map((language) => `${language.name} (${language.level})`).join(" · ")}</p>
        </section>
      </article>
      <p className="resume-note">Use “Print / Save as PDF” and choose “Save as PDF” in your browser’s print dialog.</p>
    </main>
  );
}
