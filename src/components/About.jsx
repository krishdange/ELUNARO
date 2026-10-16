import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import './About.css';

const principles = [
  {
    icon: 'cube',
    title: 'Quality & maintainability',
    body: 'Readable code, sensible architecture and documentation, so your software stays easy to change long after launch.',
  },
  {
    icon: 'chat',
    title: 'Clear communication',
    body: 'Plain language, regular updates and honest answers — including when something is harder than expected.',
  },
  {
    icon: 'shield',
    title: 'Security-conscious',
    body: 'Careful handling of data, credentials and access from day one, rather than as an afterthought.',
  },
  {
    icon: 'target',
    title: 'Practical problem-solving',
    body: 'We choose the simplest approach that solves the real problem — whether or not it involves AI.',
  },
  {
    icon: 'eye',
    title: 'Thoughtful experiences',
    body: 'Interfaces designed around the people who use them every day, not just around the data model.',
  },
  {
    icon: 'compass',
    title: 'Honest scope',
    body: 'Clear agreements on what will be delivered. No inflated promises, no invented numbers.',
  },
];

function Eclipse() {
  return (
    <svg className="about__eclipse" viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <linearGradient id="ab-rim" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#79e8e2" />
          <stop offset=".5" stopColor="#9db9ff" />
          <stop offset="1" stopColor="#b49bff" />
        </linearGradient>
        <mask id="ab-mask">
          <rect width="400" height="400" fill="#fff" />
          <circle cx="214" cy="186" r="118" fill="#000" />
        </mask>
        <filter id="ab-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      {[150, 172, 194].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#9db9ff" strokeOpacity={0.12 - i * 0.03} strokeDasharray={i === 1 ? '2 6' : undefined} />
      ))}
      <circle cx="200" cy="200" r="122" fill="url(#ab-rim)" mask="url(#ab-mask)" filter="url(#ab-blur)" opacity=".8" />
      <circle cx="200" cy="200" r="122" fill="url(#ab-rim)" mask="url(#ab-mask)" />
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          <span className="eyebrow__index">04</span>
          <span className="eyebrow__rule" aria-hidden="true" />
          About ELUNARO
        </Reveal>

        <Reveal as="h2" id="about-title" className="about__statement" delay={1}>
          We’re a young studio with a simple conviction: software should <span className="serif grad-text">earn</span> its
          place in your business.
        </Reveal>

        <div className="about__split">
          <Reveal className="about__visual" delay={1}>
            <Eclipse />
            <div className="about__visual-caption">
              <span className="eyebrow">Early-stage, by design</span>
              <p>
                You work directly with the people designing and building your product — and every project gets our full
                attention.
              </p>
            </div>
          </Reveal>

          <div className="about__copy">
            <Reveal as="h3" className="about__label" delay={1}>
              Our mission
            </Reveal>
            <Reveal as="p" className="about__mission" delay={2}>
              To help businesses turn everyday friction into dependable software — combining useful engineering,
              thoughtful user experience and practical AI.
            </Reveal>
            <Reveal as="p" className="about__text" delay={3}>
              ELUNARO focuses on the work that makes a real difference to how a team operates: tools that remove
              repetitive tasks, products that people enjoy using, and AI that is applied where it genuinely helps. We
              care as much about how software is built as what it does — because the code you receive should be an
              asset, not a liability.
            </Reveal>
          </div>
        </div>

        <div className="principles" role="list" aria-label="Our principles">
          {principles.map((p, i) => (
            <Reveal key={p.title} className="principle" role="listitem" delay={i % 3}>
              <span className="principle__icon">
                <Icon name={p.icon} />
              </span>
              <h3 className="principle__title">{p.title}</h3>
              <p className="principle__body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
