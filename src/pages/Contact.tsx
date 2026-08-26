import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  CircleHelp,
  LifeBuoy,
  Phone,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorFollower } from '@/components/common/CursorFollower';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
// The common Button renders an <a>, which can't submit a form — the shadcn
// button is used for the single real <button> submit, dressed in the same
// brand-variant treatment (gradient, pill radius, purple shadow) as above.
import { Button as UiButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { contact } from '@/data/site';
import { purpleGradient, surface } from '@/lib/theme';

/**
 * Contact / strategy-call page.
 *
 * Same shell as every other page (fixed frosted Navbar over the content, dark
 * Footer sign-off) with a two-column body: the qualifying form on the left,
 * support + paid-call cards stacked on the right. Submission isn't wired to a
 * backend yet — the form holds its own state and flips a confirmation line.
 */

/** Shared field treatment so every input reads as one family. */
const fieldClass =
  'h-11 rounded-xl border-[#e6e8f0] bg-white px-4 text-sm text-[#151a35] placeholder:text-[#7a8199] shadow-none focus-visible:ring-[#8e31b5]/40';

const fitBadges = [
  { icon: Building2, label: 'Growing brand?' },
  { icon: CircleHelp, label: 'Marketing feels scattered?' },
  { icon: Phone, label: "Let's talk" },
];

const audienceOptions = [
  'Solo Founder',
  'Small Business (1–50 employees)',
  'Growing Brand (51–500 employees)',
  'Non-profit Organization',
  'Student / Learning',
  'Other',
];

const serviceOptions = [
  'Strategic Marketing',
  'Creative Design',
  'Social Media Management',
  'Web Development',
  'SEO',
  'Automation Services',
];

const budgetOptions = [
  'Below 20k Taka',
  '20k to 1 Lac Taka',
  '1 Lac to 3 Lac Taka',
  '3 Lac to 10 Lac Taka',
  '10 Lac+ Taka',
];

const coverageItems = [
  'Audit your current marketing',
  'Assess the right service fit',
  'Map out next steps',
];

export function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    audience: '',
    budget: '',
    subject: '',
    message: '',
  });
  const [services, setServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [key]: event.target.value }));
    };

  const toggleService = (service: string) => {
    setServices(prev =>
      prev.includes(service)
        ? prev.filter(item => item !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No backend yet — acknowledge locally. Wire submission up later.
    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <CursorFollower />
      <Navbar />
      <main className="bg-white">
        {/* -------------------------------------------------------------- */}
        {/* Header block                                                    */}
        {/* -------------------------------------------------------------- */}
        <section className="relative isolate bg-white px-5 pb-16 pt-[calc(92px+4rem)] md:pb-20">
          <Reveal className="container-wide mx-auto max-w-3xl text-center">
            <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-.05em] text-[#151a35]">
              Book a Strategy Call
            </h1>
            <p className="mt-5 text-[17px] font-medium leading-8 text-[#151a35]">
              Brand owners and decision-makers only.
            </p>
            <p className="mt-2 text-sm italic text-[#5c6178]">
              If you're looking for the lowest bid, this probably isn't the
              right fit.
            </p>

            {/* Qualification badges — who this call is actually for.
                Mobile: a tight left-aligned stack. sm+: one centered row. */}
            <div className="mx-auto mt-9 flex w-fit flex-col items-start gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:gap-x-10 sm:gap-y-4">
              {fitBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#8e31b5]/10 text-[#8e31b5]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-[#151a35]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Two-column body: form + sidebar                                 */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-white pb-24">
          <div className="container-wide grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
            {/* ------------------------------------------------------------ */}
            {/* Main form column                                             */}
            {/* ------------------------------------------------------------ */}
            <Reveal className="flex min-w-0 flex-col">
              {/* Pill sits proud of the card edge, like a sticky label. */}
              <span
                className="relative z-10 -mb-3 ml-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[.08em] text-white shadow-[0_10px_24px_rgba(142,49,181,.28)]"
                style={{ background: purpleGradient }}
              >
                Send a Message <ArrowRight size={13} />
              </span>

              <div
                id="request-form"
                className="scroll-mt-28 rounded-2xl border border-[#8e31b5]/20 bg-white p-6 shadow-[0_24px_60px_rgba(142,49,181,.10),0_18px_50px_rgba(21,26,53,.06)] md:p-9"
              >
                <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-.03em] text-[#151a35]">
                  Request a Meeting
                </h2>
                <p className="mt-2.5 max-w-lg text-[15px] leading-7 text-[#5c6178]">
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-7">
                  {/* Name row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="first-name"
                        className="text-[13px] font-medium text-[#151a35]"
                      >
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        value={form.firstName}
                        onChange={update('firstName')}
                        placeholder="Jane"
                        required
                        className={fieldClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="last-name"
                        className="text-[13px] font-medium text-[#151a35]"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        value={form.lastName}
                        onChange={update('lastName')}
                        placeholder="Rahman"
                        required
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  {/* Email + phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[13px] font-medium text-[#151a35]"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="jane@yourbrand.com"
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-[13px] font-medium text-[#151a35]"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+880 1XXX XXXXXX"
                      className={fieldClass}
                    />
                  </div>

                  {/* Audience radio group */}
                  <fieldset className="space-y-3">
                    <legend className="text-[13px] font-medium text-[#151a35]">
                      What best describes you?
                    </legend>
                    <RadioGroup
                      value={form.audience}
                      onValueChange={value =>
                        setForm(prev => ({ ...prev, audience: value }))
                      }
                      className="gap-2.5"
                    >
                      {audienceOptions.map(option => (
                        <label
                          key={option}
                          htmlFor={`audience-${option}`}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eceef5] px-4 py-2.5 text-sm text-[#151a35] transition-colors hover:border-[#8e31b5]/30 hover:bg-[#f5f6fa]"
                        >
                          <RadioGroupItem
                            id={`audience-${option}`}
                            value={option}
                            className="text-[#8e31b5]"
                          />
                          {option}
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>

                  {/* Services checkbox group */}
                  <fieldset className="space-y-3">
                    <legend className="text-[13px] font-medium text-[#151a35]">
                      Which services are you interested in?
                    </legend>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {serviceOptions.map(option => (
                        <label
                          key={option}
                          htmlFor={`service-${option}`}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eceef5] px-4 py-2.5 text-sm text-[#151a35] transition-colors hover:border-[#8e31b5]/30 hover:bg-[#f5f6fa]"
                        >
                          <Checkbox
                            id={`service-${option}`}
                            checked={services.includes(option)}
                            onCheckedChange={() => toggleService(option)}
                            className="data-[state=checked]:border-[#8e31b5] data-[state=checked]:bg-[#8e31b5]"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Budget radio group */}
                  <fieldset className="space-y-3">
                    <legend className="text-[13px] font-medium text-[#151a35]">
                      Monthly Marketing Budget?
                    </legend>
                    <RadioGroup
                      value={form.budget}
                      onValueChange={value =>
                        setForm(prev => ({ ...prev, budget: value }))
                      }
                      className="gap-2.5"
                    >
                      {budgetOptions.map(option => (
                        <label
                          key={option}
                          htmlFor={`budget-${option}`}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eceef5] px-4 py-2.5 text-sm text-[#151a35] transition-colors hover:border-[#8e31b5]/30 hover:bg-[#f5f6fa]"
                        >
                          <RadioGroupItem
                            id={`budget-${option}`}
                            value={option}
                            className="text-[#8e31b5]"
                          />
                          {option}
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>

                  {/* Subject + message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-[13px] font-medium text-[#151a35]"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={update('subject')}
                      placeholder="What's this about?"
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[13px] font-medium text-[#151a35]"
                    >
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell us where your brand is today, and where you want it to go."
                      className="min-h-[120px] rounded-xl border-[#e6e8f0] bg-white px-4 py-3 text-sm text-[#151a35] placeholder:text-[#7a8199] shadow-none focus-visible:ring-[#8e31b5]/40"
                    />
                  </div>

                  {/* Submit */}
                  <UiButton
                    type="submit"
                    className="h-auto w-full cursor-pointer rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(142,49,181,.22)] transition-transform duration-300 hover:scale-[1.01] sm:w-auto"
                    style={{ background: purpleGradient }}
                  >
                    Submit Form
                  </UiButton>

                  {submitted && (
                    <p
                      className="text-sm font-medium text-[#8e31b5]"
                      role="status"
                    >
                      Thanks — your request is in. We'll be in touch shortly.
                    </p>
                  )}
                </form>

                {/* Expectation-setting box under the submit. */}
                <div
                  className="mt-8 rounded-xl px-5 py-4"
                  style={{ backgroundColor: surface.tint }}
                >
                  <p className="text-[13px] font-medium text-[#151a35]">
                    You'll hear back within 48 hours if it's a fit.
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5c6178]">
                    <span>This helps us confirm:</span>
                    {[
                      'Good fit for you',
                      'Good fit for us',
                      'Ready to move forward',
                    ].map(item => (
                      <span key={item} className="inline-flex items-center gap-1.5">
                        <Check
                          size={13}
                          className="text-[#8e31b5]"
                          strokeWidth={2.5}
                        />
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* -------------------------------------------------------------- */}
            {/* Sidebar column                                                 */}
            {/* -------------------------------------------------------------- */}
            <div className="flex min-w-0 flex-col gap-8">
              {/* Support card */}
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-[#e6e8f0] bg-white p-7 soft-shadow">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8e31b5]/10 text-[#8e31b5]">
                    <LifeBuoy size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-[-.02em] text-[#151a35]">
                    Need Technical Support?
                  </h3>
                  <p className="mt-2 font-mono-custom text-[10px] font-bold uppercase tracking-[.18em] text-[#7a8199]">
                    Website · Campaigns · Reporting
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#5c6178]">
                    Existing client with an urgent issue on your site, ads, or
                    reporting dashboard?
                  </p>
                  <Button
                    href={`mailto:${contact.email}`}
                    variant="ink"
                    className="mt-6"
                  >
                    Get Support
                  </Button>
                </div>
              </Reveal>

              {/* Paid strategy call card */}
              <Reveal delay={0.16}>
                <div className="rounded-2xl border border-[#e6e8f0] bg-white p-7 soft-shadow">
                  <span
                    className="inline-flex items-center rounded-full px-3.5 py-1 font-mono-custom text-[10px] font-bold uppercase tracking-[.14em] text-white"
                    style={{ background: purpleGradient }}
                  >
                    Paid · Instant Access
                  </span>
                  <ul className="mt-5 space-y-2.5">
                    {[
                      '30-minute strategy session',
                      'Skip the queue — book instantly',
                    ].map(item => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm font-medium text-[#151a35]"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-[#8e31b5]"
                          strokeWidth={2.5}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 font-mono-custom text-[10px] font-bold uppercase tracking-[.18em] text-[#7a8199]">
                    What we cover:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {coverageItems.map(item => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#5c6178]"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-[#8e31b5]"
                          strokeWidth={2.5}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 rounded-xl bg-[#f5f6fa] px-4 py-3 text-xs leading-5 text-[#5c6178]">
                    This is a focused discovery call — we won't solve everything
                    in 30 minutes.
                  </p>

                  <p className="mt-5 font-display text-lg font-semibold tracking-[-.02em] text-[#151a35]">
                    Investment: 5,000 BDT
                  </p>

                  <Button href="#request-form" variant="ink" className="mt-5">
                    Book Now â†’
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
