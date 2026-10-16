/**
 * Portfolio entries.
 *
 * The entries below are DEMONSTRATION CONCEPTS. They illustrate the kinds of
 * systems ELUNARO builds and are clearly labelled as such on the site.
 * Replace them with real projects when available.
 *
 * Fields
 * - kind:     'concept' | 'client' | 'internal'  → controls the badge shown
 * - visual:   'dashboard' | 'assistant' | 'automation' | 'api' → built-in CSS thumbnail
 * - image:    optional { src, alt } to show a real screenshot instead of `visual`
 * - links:    optional array of { label, href } — only add real, working URLs
 * - service:  id from services.js, preselected when someone clicks "Discuss a similar project"
 * - featured: render as the large lead project (use on one entry)
 */
export const projects = [
  {
    id: 'ops-dashboard',
    kind: 'concept',
    featured: true,
    title: 'Operations Insight Workspace',
    category: 'Web Application · SaaS',
    description:
      'A concept for a multi-tenant analytics workspace that brings operational data from several tools into one clear, role-aware view — with saved reports and granular permissions.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    visual: 'dashboard',
    service: 'web-saas',
    links: [],
  },
  {
    id: 'knowledge-assistant',
    kind: 'concept',
    title: 'Grounded Knowledge Assistant',
    category: 'AI Integration',
    description:
      'An assistant that answers questions from internal documentation using retrieval, citing its sources so every answer can be checked.',
    tech: ['Python', 'FastAPI', 'LLM API', 'Vector search'],
    visual: 'assistant',
    service: 'ai-solutions',
    links: [],
  },
  {
    id: 'invoice-automation',
    kind: 'concept',
    title: 'Invoice-to-Ledger Pipeline',
    category: 'Workflow Automation',
    description:
      'An automated flow that extracts invoice data, routes exceptions for human approval and syncs approved records to accounting.',
    tech: ['Node.js', 'Queues', 'Webhooks', 'Document AI'],
    visual: 'automation',
    service: 'automation',
    links: [],
  },
  {
    id: 'commerce-api',
    kind: 'concept',
    title: 'Unified Commerce API Layer',
    category: 'API & Systems Engineering',
    description:
      'A single, documented API in front of store, payment and fulfilment providers, normalising their data for every client app.',
    tech: ['TypeScript', 'REST', 'GraphQL', 'OAuth 2.0'],
    visual: 'api',
    service: 'api-systems',
    links: [],
  },
];
