// Single source of truth for contact details and links.
export const SITE = {
  phoneDisplay: '+93 78 765 4751',
  phoneHref: 'tel:+93787654751',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Rifah+Medical+Complex+Kabul+Afghanistan',
  // TODO: replace with the doctor's official Facebook page URL once confirmed.
  facebookHref: 'https://www.facebook.com/search/pages?q=Dr.%20Khalid%20Khan%20Zadran',
  photo: '/images/dr-khalid-khan-zadran.jpg',
  credentials: ['MBBS', 'MD', 'RMP', 'MCPS', 'FCPS'],
};
// Services. `index` points at the translated specs.items entry; `key` points at an svc.* entry.
export const SERVICES = [
  { slug: 'brain-surgery', index: 0, art: 'brain' },
  { slug: 'spine-surgery', index: 1, art: 'spine' },
  { slug: 'neurovascular-surgery', key: 'neuro', art: 'vessel' },
  { slug: 'nerve-disorders', index: 2, art: 'nerve' },
];
export const NAV = [
  { to: '/', key: 'home', end: true },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/education', key: 'education' },
  { to: '/faq', key: 'faq' },
  { to: '/contact', key: 'contact' },
];
