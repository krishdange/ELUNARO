import { projects } from '../data/projects.js';
import SectionHead from './SectionHead.jsx';
import ProjectCard from './ProjectCard.jsx';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import './Work.css';

export default function Work() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);
  const hasConcepts = projects.some((p) => p.kind === 'concept');

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          split
          id="work-title"
          index="03"
          label="Selected work"
          title={
            <>
              Systems we <span className="serif grad-text">design</span> and build.
            </>
          }
          lede="A look at the kinds of products ELUNARO engineers — from data-rich web applications to grounded AI assistants and automated back-office flows."
        />

        {hasConcepts ? (
          <Reveal className="work__notice" role="note">
            <Icon name="info" />
            <p>
              <strong>Transparency note:</strong> the projects below are demonstration concepts that illustrate our
              capabilities. They are not client engagements, and no results are implied.
            </p>
          </Reveal>
        ) : null}

        <div className="work__grid">
          {featured ? <ProjectCard project={featured} /> : null}
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
