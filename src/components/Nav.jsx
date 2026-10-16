import { useCallback, useEffect, useRef, useState } from 'react';
import { navLinks } from '../config/site.js';
import { useScrolledPast } from '../hooks/useScrollY.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import Wordmark from './Wordmark.jsx';
import Icon from './Icon.jsx';
import './Nav.css';

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport decides the active section
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((l) => l.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(24);
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Close the mobile panel when the layout switches to desktop
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  // Lock scroll, focus first link, handle Escape and focus trapping while open
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const focusables = () => [toggleRef.current, ...(panelRef.current?.querySelectorAll('a, button') ?? [])].filter(Boolean);
    focusables()[1]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key === 'Tab') {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__brand" aria-label="ELUNARO — back to top" onClick={() => close()}>
          <Wordmark />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a href="#contact" className="btn btn--primary btn--sm nav__cta">
            Let’s Talk
            <Icon name="arrow-right" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className="nav__panel"
        hidden={isDesktop}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <nav aria-label="Mobile">
          <ul className="nav__panel-list">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ '--i': i }}>
                <a
                  href={`#${link.id}`}
                  className={`nav__panel-link ${active === link.id ? 'is-active' : ''}`}
                  onClick={() => close()}
                >
                  <span className="nav__panel-index">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__panel-foot">
          <p>Have a project in mind?</p>
          <a href="#contact" className="btn btn--primary" onClick={() => close()}>
            Start a Project
            <Icon name="arrow-right" />
          </a>
        </div>
      </div>
    </header>
  );
}
