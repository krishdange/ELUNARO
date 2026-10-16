import { useContactIntent } from '../context/ContactIntent.js';
import ProjectVisual from './ProjectVisual.jsx';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';

const kindLabel = {
  concept: 'Demonstration concept',
  client: 'Client project',
  internal: 'Internal product',
};

export default function ProjectCard({ project, delay = 0 }) {
  const { requestService } = useContactIntent();
  const titleId = `project-${project.id}`;

  return (
    <Reveal as="article" className={`project ${project.featured ? 'project--featured' : ''}`} delay={delay} aria-labelledby={titleId}>
      <div className="project__media">
        {project.image ? (
          <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" />
        ) : (
          <ProjectVisual variant={project.visual} />
        )}
        <span className={`project__badge project__badge--${project.kind}`}>{kindLabel[project.kind] ?? project.kind}</span>
      </div>

      <div className="project__body">
        <p className="project__category">{project.category}</p>
        <h3 id={titleId} className="project__title">
          {project.title}
        </h3>
        <p className="project__desc">{project.description}</p>

        <ul className="tag-list" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <div className="project__links">
          {project.links?.map((l) => (
            <a key={l.href} href={l.href} className="link-arrow" target="_blank" rel="noopener noreferrer">
              {l.label}
              <Icon name="arrow-up-right" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          <a href="#contact" className="link-arrow" onClick={() => requestService(project.service ?? '')}>
            Discuss a similar project
            <Icon name="arrow-right" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
