/**
 * The Diagnose switchboard — the section that sets this page apart.
 *
 * Instead of another "our process" list, the visitor picks the symptom they
 * actually walked in with and immediately sees the likely cause, the first
 * three things we'd change, and what we'd measure. It is honest (no invented
 * numbers, no fake dashboard) and it answers the only question a buyer has:
 * *what would you actually do about my problem?*
 */
export type Diagnosis = {
  /** Shown in the picker — phrased the way a founder would say it out loud. */
  symptom: string;
  /** Short label for the mobile picker chips. */
  short: string;
  cause: string;
  moves: string[];
  /** Which discipline owns the fix. */
  owner: string;
  /** What lands inside the first week, so nothing sounds open-ended. */
  firstWeek: string;
  /** The single number we'd hold ourselves to. */
  metric: string;
};

export const diagnoses: Diagnosis[] = [
  {
    symptom: 'My ads used to work. Now they don’t.',
    short: 'Ads stopped working',
    cause: 'Almost always creative fatigue plus audience overlap — the same three assets shown to the same people until the auction stops rewarding you.',
    moves: [
      'Audit the account and stop everything below break-even',
      'Ship five new creative angles, not five new colour variants',
      'Split the overlapping audiences and reset budget by intent',
    ],
    owner: 'Strategic Marketing',
    firstWeek: 'You get the written audit and the first new creative set live by day six.',
    metric: 'Cost per purchase, tracked daily against your break-even.',
  },
  {
    symptom: 'Traffic comes in. Nobody buys.',
    short: 'Traffic doesn’t convert',
    cause: 'A mismatch between the promise in the ad and the first screen of the page. The visitor arrives ready and then has to work out what to do next.',
    moves: [
      'Rebuild the landing page around one offer and one action',
      'Cut the steps between “interested” and “paid”',
      'Add the proof a first-time buyer needs before they trust you',
    ],
    owner: 'Web Development',
    firstWeek: 'A wireframe of the new page and a list of every friction point we found.',
    metric: 'Conversion rate on the landing page, measured before and after.',
  },
  {
    symptom: 'I can’t tell what’s actually working.',
    short: 'No clear reporting',
    cause: 'Numbers living in four places that disagree with each other, so every decision becomes a guess dressed up as a strategy.',
    moves: [
      'Fix tracking properly, server-side where the platform needs it',
      'One dashboard you can open yourself, any day, no PDF',
      'A short written read-out every week — what changed and why',
    ],
    owner: 'Automation & Reporting',
    firstWeek: 'Tracking fixed and your dashboard link in your inbox.',
    metric: 'Revenue per channel you can actually reconcile with your bank.',
  },
  {
    symptom: 'Nobody finds us on Google.',
    short: 'Invisible in search',
    cause: 'Technical debt the crawler trips over, and content written for keywords nobody uses when they’re ready to buy.',
    moves: [
      'Technical audit, then actually ship the fixes',
      'Map content to buying intent instead of search volume',
      'Build the internal linking and schema the site never had',
    ],
    owner: 'Robust SEO',
    firstWeek: 'The audit, prioritised by effort against impact, not alphabetically.',
    metric: 'Non-brand organic traffic, and what it’s worth in revenue.',
  },
  {
    symptom: 'Our brand looks smaller than we are.',
    short: 'Brand looks small',
    cause: 'Good work presented inconsistently. Every asset made by a different hand, so nothing compounds into recognition.',
    moves: [
      'A proper identity system, not a logo and hope',
      'Templates your team can use without breaking it',
      'A content engine that ships on a schedule',
    ],
    owner: 'Creative Design',
    firstWeek: 'Direction boards, so you see where it’s going before we build it.',
    metric: 'Engagement and saved posts — the early signal of recognition.',
  },
];
