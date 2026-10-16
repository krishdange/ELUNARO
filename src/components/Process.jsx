import { processSteps } from '../data/process.js';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import './Process.css';

export default function Process() {
  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="container process__layout">
        <div className="process__intro">
          <div className="process__sticky">
            <Reveal as="p" className="eyebrow">
              <span className="eyebrow__index">02</span>
              <span className="eyebrow__rule" aria-hidden="true" />
              How we work
            </Reveal>
            <Reveal as="h2" id="process-title" className="process__title" delay={1}>
              A clear path from <span className="serif grad-text">question</span> to working software.
            </Reveal>
            <Reveal as="p" className="process__lede" delay={2}>
              Every project moves through the same five stages. You always know where things stand, what comes next and
              what you will receive.
            </Reveal>
            <Reveal className="process__note" delay={3}>
              <Icon name="info" />
              <p>
                We don’t quote timelines before we understand the work. Estimates come after discovery, and they are
                written down.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="steps">
          <span className="steps__rail" aria-hidden="true">
            <span className="steps__rail-fill" />
          </span>
          <ol className="steps__list">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.number} className="step" delay={0}>
              <span className="step__marker" aria-hidden="true">
                <span />
              </span>
              <div className="step__head">
                <span className="step__num" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="step__title">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
              </div>
              <p className="step__body">{step.body}</p>
              <ul className="tag-list" aria-label={`${step.title} outputs`}>
                {step.outputs.map((o) => (
                  <li key={o} className="tag">
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
