export interface WorkItem {
  number: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
}

export const workItems: WorkItem[] = [
  {
    number: '01',
    category: 'Education / Performance',
    name: 'An admissions season that paid for itself three times over',
    description:
      'End-to-end admissions marketing for a public-health institute: funnels, landing pages, paid social and copy that turned enquiries into enrolments.',
    tags: ['300% ROI', 'Enrolment ↑', '2025'],
    image: '/uploads/work-education.jpg',
  },
  {
    number: '02',
    category: 'B2B / Engineering',
    name: 'Making switchgear worth scrolling for',
    description:
      "A social and paid programme for Central Industries' UL-certified electrical line — technical product, human language, buyers who finally engaged.",
    tags: ['USA', 'Paid social', '2024–25'],
    image: '/uploads/work-engineering.jpg',
  },
  {
    number: '03',
    category: 'Hospitality / F&B',
    name: 'EATO Restaurant — filling tables, not feeds',
    description:
      'Marketing execution end to end: launch campaigns, menu storytelling and local paid social built around footfall.',
    tags: ['Local', 'Footfall', '2024'],
    image: '/uploads/work-restaurant.jpg',
  },
  {
    number: '04',
    category: 'Education / Care',
    name: 'Alpha Care Education — trust before the pitch',
    description:
      'Positioning and content for a care-training provider, written so parents and employers hear the same promise.',
    tags: ['Positioning', 'Content', '2024'],
    image: '/uploads/work-care.jpg',
  },
  {
    number: '05',
    category: 'Technology / Web3',
    name: 'METAX — plain language for a technical product',
    description:
      'Brand messaging and social content that made a complex platform legible to the people deciding on it.',
    tags: ['Messaging', 'Web3', '2023'],
    image: '/uploads/work-tech.jpg',
  },
  {
    number: '06',
    category: 'Startup / Gen Z',
    name: 'EZNikah — a launch voice for a young audience',
    description:
      "Scripting, editing and distribution for a NYC startup's first content engine. Values-led, never preachy.",
    tags: ['NYC', 'Short-form', '2023'],
    image: '/uploads/work-video.jpg',
  },
];
