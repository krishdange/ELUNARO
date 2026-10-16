import Reveal from './Reveal.jsx';

export default function SectionHead({ index, label, title, lede, split = false, id }) {
  return (
    <header className={`section-head ${split ? 'section-head--split' : ''}`.trim()}>
      <Reveal as="p" className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        {label}
      </Reveal>
      <Reveal as="h2" id={id} className="section-head__title" delay={1}>
        {title}
      </Reveal>
      {lede ? (
        <Reveal as="p" className="section-head__lede" delay={2}>
          {lede}
        </Reveal>
      ) : null}
    </header>
  );
}
