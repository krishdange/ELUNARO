import { services } from '../data/services.js';
import HeroVisual from './HeroVisual.jsx';
import Icon from './Icon.jsx';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__beam" />
        <div className="hero__floor" />
      </div>

      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="hero__eyebrow hero-in" style={{ '--d': 0 }}>
            <span className="hero__pulse" aria-hidden="true" />
            Software &amp; AI Studio
            <span className="hero__eyebrow-sep" aria-hidden="true">/</span>
            <span className="hero__eyebrow-dim">For ambitious teams, worldwide</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__line hero-in" style={{ '--d': 1 }}>Engineering</span>
            <span className="hero__line hero-in" style={{ '--d': 2 }}>
              what comes <span className="serif grad-text hero__accent">next.</span>
            </span>
          </h1>

          <p className="hero__lede hero-in" style={{ '--d': 3 }}>
            ELUNARO designs and builds custom software, practical AI solutions and automated workflows that solve real
            business problems — engineered to be understood, maintained and grown.
          </p>

          <div className="hero__ctas hero-in" style={{ '--d': 4 }}>
            <a href="#contact" className="btn btn--primary">
              Start a Project
              <Icon name="arrow-right" />
            </a>
            <a href="#work" className="btn btn--ghost">
              Explore Our Work
            </a>
          </div>
        </div>

        <div className="hero__visual hero-in" style={{ '--d': 2 }}>
          <HeroVisual />
        </div>
      </div>

      <div className="container">
        <nav className="hero__strip hero-in" style={{ '--d': 5 }} aria-label="What we do">
          <p className="hero__strip-label">What we do</p>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <a href={`#service-${s.id}`}>
                  <span className="hero__strip-num">{s.number}</span>
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
