import { useRef, useState } from 'react';
import { faqs } from '../data/faq.js';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import './FAQ.css';

export default function FAQ() {
  const [open, setOpen] = useState(() => new Set([0]));
  const buttons = useRef([]);

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  // Arrow / Home / End move focus between accordion headers (WAI-ARIA pattern)
  const onKeyDown = (e, i) => {
    const last = faqs.length - 1;
    let target = null;
    if (e.key === 'ArrowDown') target = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowUp') target = i === 0 ? last : i - 1;
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'End') target = last;
    if (target !== null) {
      e.preventDefault();
      buttons.current[target]?.focus();
    }
  };

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__layout">
        <div className="faq__intro">
          <Reveal as="p" className="eyebrow">
            <span className="eyebrow__index">05</span>
            <span className="eyebrow__rule" aria-hidden="true" />
            FAQ
          </Reveal>
          <Reveal as="h2" id="faq-title" className="faq__title" delay={1}>
            Questions, <span className="serif grad-text">answered</span> plainly.
          </Reveal>
          <Reveal as="p" className="faq__lede" delay={2}>
            Can’t find what you’re looking for? Ask us directly — there are no wrong questions at the start of a
            project.
          </Reveal>
          <Reveal delay={3}>
            <a href="#contact" className="link-arrow">
              Ask a question
              <Icon name="arrow-right" />
            </a>
          </Reveal>
        </div>

        <Reveal className="accordion" delay={1}>
          {faqs.map((item, i) => {
            const isOpen = open.has(i);
            const btnId = `faq-btn-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={item.q} className={`acc ${isOpen ? 'is-open' : ''}`}>
                <h3 className="acc__heading">
                  <button
                    ref={(el) => (buttons.current[i] = el)}
                    id={btnId}
                    type="button"
                    className="acc__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <span className="acc__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="acc__q">{item.q}</span>
                    <span className="acc__icon" aria-hidden="true">
                      <Icon name="plus" />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className="acc__panel" inert={isOpen ? undefined : ''}>
                  <div className="acc__inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
