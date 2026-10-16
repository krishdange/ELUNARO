import { services } from '../data/services.js';
import { useContactIntent } from '../context/ContactIntent.js';
import SectionHead from './SectionHead.jsx';
import ServiceArt from './ServiceArt.jsx';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import './Services.css';

/* Pointer-follow spotlight — element-scoped, only on precise pointers */
function trackSpotlight(e) {
  if (e.pointerType !== 'mouse') return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

function ServiceCard({ service, index }) {
  const { requestService } = useContactIntent();
  const featured = Boolean(service.art);

  return (
    <Reveal
      as="article"
      id={`service-${service.id}`}
      className={`svc ${featured ? 'svc--featured' : ''} svc--${service.id}`}
      delay={index % 3}
      onPointerMove={trackSpotlight}
      aria-labelledby={`svc-title-${service.id}`}
    >
      <div className="svc__top">
        <span className="svc__icon">
          <Icon name={service.icon} />
        </span>
        <span className="svc__num">{service.number}</span>
      </div>

      <div className="svc__body">
        <h3 id={`svc-title-${service.id}`} className="svc__title">
          {service.title}
        </h3>

        <dl className="svc__detail">
          <div>
            <dt>The challenge</dt>
            <dd>{service.problem}</dd>
          </div>
          <div>
            <dt>What we build</dt>
            <dd>{service.solution}</dd>
          </div>
        </dl>

        <ul className="tag-list" aria-label={`${service.short} focus areas`}>
          {service.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <a href="#contact" className="link-arrow svc__cta" onClick={() => requestService(service.id)}>
          {service.cta}
          <Icon name="arrow-right" />
        </a>
      </div>

      {featured ? (
        <div className="svc__art">
          <ServiceArt variant={service.art} />
        </div>
      ) : null}
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          split
          id="services-title"
          index="01"
          label="Services"
          title={
            <>
              Software that fits the way <span className="serif grad-text">you work.</span>
            </>
          }
          lede="Five focused disciplines, one goal: dependable software that removes friction from your business. Each engagement starts from the problem — not from a technology we want to sell."
        />

        <div className="svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}

          <Reveal className="svc-cta" delay={1}>
            <div className="svc-cta__copy">
              <h3>Not sure which one fits?</h3>
              <p>Describe the problem in plain language. We will help shape the right solution — or tell you if software isn’t the answer.</p>
            </div>
            <a href="#contact" className="btn btn--primary">
              Talk it through
              <Icon name="arrow-right" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
