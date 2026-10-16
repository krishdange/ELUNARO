import { site } from '../config/site.js';

export const budgetOptions = ['Under $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Not sure yet'];
export const timelineOptions = ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'Flexible / exploring'];

export const MESSAGE_MIN = 30;
export const MESSAGE_MAX = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v) {
  const errors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Your name looks a little short.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email, like name@company.com.';

  if (!v.service) errors.service = 'Please choose the service closest to your needs.';

  if (!message) errors.message = 'Please tell us a little about your project.';
  else if (message.length < MESSAGE_MIN)
    errors.message = `A few more details would help — at least ${MESSAGE_MIN} characters (${message.length} so far).`;
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return errors;
}

/**
 * Sends the inquiry to the configured endpoint as JSON.
 * Throws if no endpoint is configured or the request fails.
 */
export async function submitInquiry(payload, { timeoutMs = 15000 } = {}) {
  if (!site.formEndpoint) {
    const err = new Error('Form endpoint is not configured');
    err.code = 'UNCONFIGURED';
    throw err;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    // Some services (e.g. FormSubmit) answer 200 with { success: "false" } when nothing was sent.
    const data = await res.json().catch(() => null);
    if (data && String(data.success) === 'false') throw new Error(data.message || 'Submission was not accepted');
    return true;
  } finally {
    clearTimeout(timer);
  }
}

/** Plain-text version of the inquiry, used for the mailto fallback and "copy" action. */
export function composeInquiryText(v, serviceLabel) {
  return [
    `Name: ${v.name}`,
    v.company ? `Company: ${v.company}` : null,
    `Email: ${v.email}`,
    `Service: ${serviceLabel}`,
    v.budget ? `Budget: ${v.budget}` : null,
    v.timeline ? `Timeline: ${v.timeline}` : null,
    '',
    v.message,
  ]
    .filter((l) => l !== null)
    .join('\n');
}

export function buildMailto(v, serviceLabel) {
  if (!site.contactEmail) return '';
  const subject = `Project inquiry — ${v.name || 'New project'}`;
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeInquiryText(v, serviceLabel))}`;
}
