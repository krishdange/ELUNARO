/**
 * Central site configuration.
 *
 * Contact details are intentionally empty by default — nothing here is invented.
 * Provide real values through environment variables (see `.env.example`)
 * or by editing the fallbacks below.
 */
const env = import.meta.env;

export const site = {
  name: 'ELUNARO',
  tagline: 'Software & AI Studio',
  description:
    'A software and AI studio designing and engineering custom software, practical AI solutions and automated workflows for ambitious teams.',

  /** Public contact email. Leave empty until a real inbox exists. */
  contactEmail: (env.VITE_CONTACT_EMAIL || '').trim(),

  /**
   * Endpoint that receives the inquiry form as a JSON POST.
   * Works with services such as Formspree, Basin or a custom serverless function.
   * Default: FormSubmit, which emails each inquiry to the owner's inbox.
   */
  formEndpoint: (env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/dangekrish68@gmail.com').trim(),

  /** Add real profiles only, e.g. { label: 'LinkedIn', href: 'https://…' } */
  socials: [],

  /** Direct contact details shown in the contact section and footer. */
  owner: {
    name: 'Krish Dange',
    email: 'dangekrish68@gmail.com',
    phone: '8878154226',
    phoneDisplay: '+91 88781 54226',
    /** International format without "+" or spaces, as wa.me expects. */
    whatsapp: '918878154226',
  },
};

export const whatsappLink = `https://wa.me/${site.owner.whatsapp}?text=${encodeURIComponent(
  'Hi Krish, I found ELUNARO and would like to discuss a project.',
)}`;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
