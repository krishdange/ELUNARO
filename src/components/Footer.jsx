import { navLinks, site, whatsappLink } from '../config/site.js';
import { services } from '../data/services.js';
import Wordmark from './Wordmark.jsx';
import Icon from './Icon.jsx';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container">
        <div className="footer__cta">
          <p className="footer__cta-text">
            Have a problem worth solving? <span className="serif grad-text">Let’s talk.</span>
          </p>
          <a href="#contact" className="btn btn--primary">
            Start a Project
            <Icon name="arrow-right" />
          </a>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#home" aria-label="ELUNARO — back to top" className="footer__logo">
              <Wordmark />
            </a>
            <p>{site.description}</p>
          </div>

          <nav className="footer__col" aria-label="Footer navigation">
            <h3 className="footer__heading">Navigate</h3>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h3 className="footer__heading">Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#service-${s.id}`}>{s.short}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <ul>
              {site.contactEmail ? (
                <li>
                  <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                </li>
              ) : null}
              <li>
                <a href="#contact">Project inquiry form</a>
              </li>
              <li className="footer__owner">{site.owner.name}</li>
              <li>
                <a href={`mailto:${site.owner.email}`}>{site.owner.email}</a>
              </li>
              <li>
                <a href={`tel:+${site.owner.whatsapp}`}>{site.owner.phoneDisplay}</a>
              </li>
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} ELUNARO. All rights reserved.</p>
          <p className="footer__made">Designed &amp; engineered in-house.</p>
        </div>
      </div>

      <div className="footer__giant" aria-hidden="true">
        ELUNARO
      </div>
    </footer>
  );
}
