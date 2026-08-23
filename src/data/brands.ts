export interface Brand {
  name: string;
  image: string;
}

export const brands: Brand[] = [
  { name: 'METAX', image: '/uploads/brand-metax.jpg' },
  { name: 'EATO Restaurant', image: '/uploads/brand-eato.jpg' },
  { name: 'Alpha Care Education', image: '/uploads/brand-alphacare.jpg' },
  { name: 'SharkWeb', image: '/uploads/brand-sharkweb.jpg' },
  { name: 'Central Industries', image: '/uploads/brand-centralindustries.jpg' },
  { name: 'EZNikah', image: '/uploads/brand-eznikah.jpg' },
  { name: 'Quantum eBikes', image: '/uploads/brand-quantumebikes.jpg' },
  { name: 'Be The Brand Network', image: '/uploads/brand-bethebrandnetwork.jpg' },
  { name: 'HibeTech', image: '/uploads/brand-hibetech.jpg' },
  { name: 'Britsol', image: '/uploads/brand-britsol.jpg' },
  { name: 'Elite Custom Boxes', image: '/uploads/brand-elitecustomboxes.jpg' },
  { name: 'Prime Tech', image: '/uploads/brand-primetech.jpg' },
  { name: 'Ali Associates', image: '/uploads/brand-aliassociates.jpg' },
  { name: 'Custom Box Makers', image: '/uploads/brand-customboxmakers.jpg' },
  { name: 'The Box Printers', image: '/uploads/brand-theboxprinters.jpg' },
];

export const brandRow1 = brands.slice(0, 8);
export const brandRow2 = brands.slice(8);
