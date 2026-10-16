import { site, whatsappLink } from '../config/site.js';
import ContactForm from './ContactForm.jsx';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import './Contact.css';

const nextSteps = [
  { title: 'Share the context', body: 'Tell us what you’re trying to achieve — rough ideas are fine.' },
  { title: 'We review and reply', body: 'We read every inquiry and follow up with questions to understand it properly.' },
  { title: 'Agree on an approach', body: 'If it’s a good fit, we propose a scope and plan in writing before any work begins.' },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__layout">
        <div className="contact__intro">
          <Reveal as="p" className="eyebrow">
            <span className="eyebrow__index">06</span>
            <span className="eyebrow__rule" aria-hidden="true" />
            Start a project
          </Reveal>
          <Reveal as="h2" id="contact-title" className="contact__title" delay={1}>
            Let’s build what <span className="serif grad-text">comes next.</span>
          </Reveal>
          <Reveal as="p" className="contact__lede" delay={2}>
            Whether you have a detailed brief or just a problem worth solving, we’d like to hear about it.
          </Reveal>

          <Reveal as="ol" className="next-steps" delay={3} aria-label="What happens next">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="next-step">
                <span className="next-step__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <p className="next-step__title">{s.title}</p>
                  <p className="next-step__body">{s.body}</p>
                </div>
              </li>
            ))}
          </Reveal>

          {site.contactEmail ? (
            <Reveal delay={4} className="contact__direct">
              <span className="eyebrow">Prefer email?</span>
              <a href={`mailto:${site.contactEmail}`} className="link-arrow">
                <Icon name="mail" />
                {site.contactEmail}
              </a>
            </Reveal>
          ) : null}

          <Reveal delay={4} className="contact__whatsapp">
            <span className="eyebrow">Prefer to chat?</span>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
              <Icon name="whatsapp" />
              Contact on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <ul className="contact__details" aria-label="Contact details">
              <li>
                <Icon name="user" />
                {site.owner.name}
              </li>
              <li>
                <Icon name="mail" />
                <a href={`mailto:${site.owner.email}`}>{site.owner.email}</a>
              </li>
              <li>
                <Icon name="phone" />
                <a href={`tel:+${site.owner.whatsapp}`}>{site.owner.phoneDisplay}</a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
