/**
 * The team section content.
 *
 * `teamImage` is the single wide shot in `public/team.jpg` — swap it for your
 * own landscape photo any time; the frame is fixed-height and cover-fits, so any
 * ~16:9 crop lands cleanly.
 */
export const teamPills = ['One Team, One Mission', 'Always Learning', 'Built To Ship', 'Remote Friendly', 'Client First'];

export const teamImage = {
  src: '/team.jpg',
  alt: 'The Innovick team gathered around the studio table',
  kicker: 'MAKE IT REAL',
  caption: 'Ideas are only useful when they ship.',
  location: 'DHAKA ↔ WORLD',
};

/**
 * Individual headshots for the About page roster.
 *
 * TODO: save each portrait to `public/team/member-N.jpg` (a chest-up 3:4 crop
 * fits the frame best). Until a file exists its card falls back to an initials
 * block, so a missing photo never breaks the lineup.
 */
export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  oneLiner: string;
};

// TODO: swap these placeholder teammates for the real roster.
//
// Photos are hotlinked Unsplash chest-up portraits — the same pattern
// `data/reviews.ts` uses — so the B&W → colour hover reveal has real detail.
// Swap each `photo` for your own file in `public/team/` when ready; a missing
// file falls back to an initials block.
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=80`;

export const teamMembers: TeamMember[] = [
  { name: 'Ahnaf Rahman', role: 'Lead Strategist', photo: unsplash('photo-1560250097-0b93528c311a'), oneLiner: 'Turns fuzzy goals into weekly sprints.' },
  { name: 'Nusrat Jahan', role: 'Creative Director', photo: unsplash('photo-1580489944761-15a19d654956'), oneLiner: 'Makes brands impossible to scroll past.' },
  { name: 'Tanvir Islam', role: 'Full-Stack Developer', photo: unsplash('photo-1507003211169-0a1dd7228f2d'), oneLiner: 'Ships fast sites that convert.' },
  { name: 'Farhana Akter', role: 'Performance Marketing Lead', photo: unsplash('photo-1573497019940-1c28c88b4f3e'), oneLiner: 'Spends ad money like it’s her own.' },
  { name: 'Rafiul Karim', role: 'Automation Engineer', photo: unsplash('photo-1500648767791-00dcc994a43e'), oneLiner: 'Wires the follow-ups founders forget.' },
  { name: 'Sadia Chowdhury', role: 'Brand Designer', photo: unsplash('photo-1438761681033-6461ffad8d80'), oneLiner: 'Gives young brands an expensive look.' },
  { name: 'Imran Hossain', role: 'SEO & Content Lead', photo: unsplash('photo-1472099645785-5658abf4ff4e'), oneLiner: 'Builds traffic that compounds monthly.' },
  { name: 'Mehjabin Noor', role: 'Social Media Manager', photo: unsplash('photo-1544005313-94ddf0286df2'), oneLiner: 'Keeps communities talking daily.' },
];
