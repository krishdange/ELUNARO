import { useEffect, useId, useRef, useState } from 'react';
import { services } from '../data/services.js';
import { useContactIntent } from '../context/ContactIntent.js';
import { site } from '../config/site.js';
import {
  budgetOptions,
  timelineOptions,
  MESSAGE_MAX,
  validateInquiry,
  submitInquiry,
  buildMailto,
  composeInquiryText,
} from '../lib/inquiry.js';
import Icon from './Icon.jsx';
import './ContactForm.css';

const serviceOptions = [...services.map((s) => ({ id: s.id, label: s.short })), { id: 'other', label: 'Something else' }];
const fieldOrder = ['name', 'email', 'service', 'message'];
const MIN_FILL_MS = 2500; // humans don't complete this form faster than this

const initialValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  budget: '',
  timeline: '',
  website: '', // honeypot — must stay empty
};

function Field({ id, label, required, error, hint, children, className = '' }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`.trim()}>
      <div className="field__label-row">
        <label htmlFor={id} className="field__label">
          {label}
        </label>
        <span className={`field__req ${required ? 'is-required' : ''}`}>{required ? 'Required' : 'Optional'}</span>
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field__error">
          <Icon name="alert" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const uid = useId().replace(/:/g, '');
  const id = (name) => `${uid}-${name}`;
  const { intent } = useContactIntent();

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error | unconfigured | too-fast
  const [copied, setCopied] = useState(false);
  const mountedAt = useRef(Date.now());
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const errors = validateInquiry(values);
  const visibleError = (name) => ((attempted || touched[name]) && errors[name]) || '';

  // Preselect a service when a "Discuss…" CTA elsewhere on the page is used
  useEffect(() => {
    if (intent.nonce > 0 && intent.service) {
      setValues((v) => ({ ...v, service: intent.service }));
      setStatus((s) => (s === 'success' ? 'idle' : s));
    }
  }, [intent]);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status === 'unconfigured' || status === 'error' || status === 'too-fast') setStatus('idle');
  };
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const describedBy = (name) => (visibleError(name) ? `${id(name)}-error` : undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setAttempted(true);
    setCopied(false);

    const firstInvalid = fieldOrder.find((f) => errors[f]);
    if (firstInvalid) {
      const el =
        firstInvalid === 'service'
          ? formRef.current?.querySelector('input[name="service"]:checked, input[name="service"]')
          : formRef.current?.querySelector(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    // Spam checks: honeypot filled, or form completed implausibly fast
    if (values.website) {
      setStatus('error');
      return;
    }
    if (Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus('too-fast');
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      service: serviceOptions.find((s) => s.id === values.service)?.label ?? values.service,
      message: values.message.trim(),
      budget: values.budget,
      timeline: values.timeline,
      _subject: `New project inquiry — ${values.name.trim()}`,
      _template: 'table',
    };

    if (!site.formEndpoint) {
      setStatus('unconfigured');
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus('submitting');
    try {
      await submitInquiry(payload);
      setStatus('success');
      setValues(initialValues);
      setTouched({});
      setAttempted(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus('error');
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const serviceLabel = serviceOptions.find((s) => s.id === values.service)?.label ?? '';
  const mailto = buildMailto(values, serviceLabel);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(composeInquiryText(values, serviceLabel));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="form-card form-success" ref={statusRef} tabIndex={-1} role="status">
        <span className="form-success__icon">
          <Icon name="check" strokeWidth={2} />
        </span>
        <h3>Thank you — your message has been sent.</h3>
        <p>We’ll read it carefully and reply to the email address you provided.</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  const msgLen = values.message.trim().length;

  return (
    <form ref={formRef} className="form-card form" noValidate onSubmit={onSubmit} aria-describedby={`${uid}-form-note`}>
      <div className="form__grid">
        <Field id={id('name')} label="Full name" required error={visibleError('name')}>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            className="input"
            value={values.name}
            onChange={update}
            onBlur={blur}
            aria-required="true"
            aria-invalid={Boolean(visibleError('name'))}
            aria-describedby={describedBy('name')}
            maxLength={120}
          />
        </Field>

        <Field id={id('email')} label="Business email" required error={visibleError('email')}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="input"
            value={values.email}
            onChange={update}
            onBlur={blur}
            aria-required="true"
            aria-invalid={Boolean(visibleError('email'))}
            aria-describedby={describedBy('email')}
            maxLength={200}
          />
        </Field>

        <Field id={id('company')} label="Company name" className="field--full">
          <input
            id={id('company')}
            name="company"
            type="text"
            autoComplete="organization"
            className="input"
            value={values.company}
            onChange={update}
            maxLength={160}
          />
        </Field>

        <fieldset
          className={`field field--full choice ${visibleError('service') ? 'has-error' : ''}`}
          aria-describedby={describedBy('service')}
          aria-required="true"
        >
          <div className="field__label-row">
            <legend className="field__label">Service of interest</legend>
            <span className="field__req is-required">Required</span>
          </div>
          <div className="choice__options">
            {serviceOptions.map((opt) => (
              <label key={opt.id} className="choice__opt">
                <input
                  type="radio"
                  name="service"
                  value={opt.id}
                  checked={values.service === opt.id}
                  onChange={update}
                  onBlur={blur}
                />
                <span className="choice__pill">
                  <span className="choice__check" aria-hidden="true">
                    <Icon name="check" strokeWidth={2.4} />
                  </span>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
          {visibleError('service') ? (
            <p id={`${id('service')}-error`} className="field__error">
              <Icon name="alert" />
              {visibleError('service')}
            </p>
          ) : null}
        </fieldset>

        <Field
          id={id('message')}
          label="Project description"
          required
          error={visibleError('message')}
          className="field--full"
        >
          <div className="textarea-wrap">
          <textarea
            id={id('message')}
            name="message"
            className="input input--area"
            rows={6}
            value={values.message}
            onChange={update}
            onBlur={blur}
            placeholder="What are you trying to achieve? Who will use it? Is there an existing system involved?"
            aria-required="true"
            aria-invalid={Boolean(visibleError('message'))}
            aria-describedby={[describedBy('message'), `${id('message')}-count`].filter(Boolean).join(' ')}
            maxLength={MESSAGE_MAX}
          />
          <span id={`${id('message')}-count`} className="field__count" aria-live="off">
            {msgLen} / {MESSAGE_MAX}
          </span>
          </div>
        </Field>

        <Field id={id('budget')} label="Budget range">
          <div className="select">
            <select id={id('budget')} name="budget" className="input" value={values.budget} onChange={update}>
              <option value="">Select a range</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <Icon name="chevron" />
          </div>
        </Field>

        <Field id={id('timeline')} label="Expected timeline">
          <div className="select">
            <select id={id('timeline')} name="timeline" className="input" value={values.timeline} onChange={update}>
              <option value="">Select a timeline</option>
              {timelineOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <Icon name="chevron" />
          </div>
        </Field>

        {/* Honeypot: invisible to people, tempting to bots */}
        <div className="hp" aria-hidden="true">
          <label htmlFor={id('website')}>Website</label>
          <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
        </div>
      </div>

      {/* Status messages */}
      <div aria-live="polite">
        {status === 'unconfigured' ? (
          <div className="notice notice--warn" ref={statusRef} tabIndex={-1}>
            <Icon name="info" />
            <div>
              <p className="notice__title">Online submissions aren’t connected yet.</p>
              <p>
                Your details look good, but this form isn’t linked to an inbox yet, so <strong>your message has not been sent</strong>.{' '}
                {mailto ? 'You can send it by email instead — we’ll prefill everything for you.' : 'You can copy your message so nothing is lost, and send it once direct contact details are published.'}
              </p>
              <div className="notice__actions">
                {mailto ? (
                  <a href={mailto} className="btn btn--primary btn--sm">
                    <Icon name="mail" />
                    Send via email
                  </a>
                ) : null}
                <button type="button" className="btn btn--ghost btn--sm" onClick={copyMessage}>
                  {copied ? 'Copied to clipboard' : 'Copy my message'}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="notice notice--error" ref={statusRef} tabIndex={-1}>
            <Icon name="alert" />
            <div>
              <p className="notice__title">Your message couldn’t be sent.</p>
              <p>Please check your connection and try again in a moment.{mailto ? ' Or send it by email instead.' : ''}</p>
              {mailto ? (
                <div className="notice__actions">
                  <a href={mailto} className="btn btn--ghost btn--sm">
                    <Icon name="mail" />
                    Send via email
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {status === 'too-fast' ? (
          <div className="notice notice--warn" ref={statusRef} tabIndex={-1}>
            <Icon name="info" />
            <div>
              <p className="notice__title">That was quick!</p>
              <p>Please take a moment to review your details, then submit again.</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="form__foot">
        <p id={`${uid}-form-note`} className="form__note">
          Fields marked <span className="field__req is-required">Required</span> must be completed. Your details are used
          only to respond to your inquiry.
        </p>
        <button type="submit" className="btn btn--primary form__submit" disabled={status === 'submitting'} aria-disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <Icon name="arrow-right" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
