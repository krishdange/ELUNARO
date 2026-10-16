import { createContext, useContext } from 'react';

/**
 * Lets any CTA preselect a service in the contact form,
 * e.g. "Discuss this service" on a service card.
 */
export const ContactIntentContext = createContext({
  intent: { service: '', nonce: 0 },
  requestService: () => {},
});

export const useContactIntent = () => useContext(ContactIntentContext);
