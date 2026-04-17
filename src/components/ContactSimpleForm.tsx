import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLens } from '@/context/LensContext';
import { useSiteContent } from '@/data/siteContent';

const fieldClassName =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#A855F7]/60 focus:bg-white/[0.05]';

export function ContactSimpleForm() {
  const { isTyping } = useLens();
  const { siteContent } = useSiteContent();
  const { contact } = siteContent;
  const phoneCountryOptions = siteContent.phoneCountryOptions;
  const [selectedCountryPhone, setSelectedCountryPhone] = useState(phoneCountryOptions[0].code);

  if (isTyping) return null;

  const selectedCountry = phoneCountryOptions.find((country) => country.code === selectedCountryPhone) ?? phoneCountryOptions[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phoneCountry = String(formData.get('phoneCountry') ?? selectedCountry.dialCode).trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const fullPhone = phone ? `${phoneCountry} ${phone}` : 'Not provided';

    const subjectText = contact.mailto.subjectTemplate
      .replace('{firstName}', firstName)
      .replace('{lastName}', lastName);
    const bodyText = contact.mailto.bodyTemplate
      .replace('{firstName}', firstName)
      .replace('{lastName}', lastName)
      .replace('{email}', email)
      .replace('{phone}', fullPhone)
      .replace('{message}', message);

    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);

    window.location.href = `mailto:deekshithsistu@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="connect" className="relative z-10 px-4 py-20 text-white md:px-8 lg:pl-16">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,12,0.96),rgba(5,5,7,0.98))] px-5 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] md:px-8 md:py-8">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.24),_transparent_62%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.2),_transparent_72%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]"
            aria-hidden="true"
          />

          <div className="relative grid gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.38em] text-[#C084FC]">{contact.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl">
                {contact.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400 md:text-[15px]">
                {contact.intro}
              </p>

              <div className="mt-5 rounded-[1.25rem] border border-[#C084FC]/15 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">Direct</p>
                <a
                  href="mailto:deekshithsistu@gmail.com"
                  className="mt-2 block text-base font-medium text-[#E9D5FF] transition hover:text-white"
                >
                  deekshithsistu@gmail.com
                </a>
                <p className="mt-2 text-xs leading-5 text-zinc-500">{contact.helper}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 p-5">
              <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">{contact.fields.firstName.label}</span>
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder={contact.fields.firstName.placeholder}
                  className={fieldClassName}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">{contact.fields.lastName.label}</span>
                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder={contact.fields.lastName.placeholder}
                  className={fieldClassName}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">{contact.fields.email.label}</span>
              <input
                required
                name="email"
                type="email"
                placeholder={contact.fields.email.placeholder}
                className={fieldClassName}
              />
            </label>

            <div className="block">
              <span className="mb-2 block text-sm text-zinc-300">{contact.fields.phoneNumber.label}</span>
              <div className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)]">
                <label className="sr-only" htmlFor="phoneCountry">
                  {contact.fields.phoneCountryAria}
                </label>
                <select
                  id="phoneCountry"
                  name="phoneCountry"
                  value={selectedCountry.dialCode}
                  onChange={(event) => setSelectedCountryPhone(event.currentTarget.selectedOptions[0]?.dataset.countryCode ?? phoneCountryOptions[0].code)}
                  className={`${fieldClassName} appearance-none pr-10`}
                >
                  {phoneCountryOptions.map((country) => (
                    <option
                      key={country.code}
                      value={country.dialCode}
                      data-country-code={country.code}
                    >
                      {country.label} ({country.dialCode})
                    </option>
                  ))}
                </select>

                <label className="sr-only" htmlFor="phone">
                  {contact.fields.phoneAria}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={selectedCountry.placeholder}
                  className={fieldClassName}
                />
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">{contact.fields.message.label}</span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder={contact.fields.message.placeholder}
                className={`${fieldClassName} min-h-[120px] resize-y`}
              />
            </label>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-zinc-500">{contact.directEmailPrefix} deekshithsistu@gmail.com</p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7E22CE] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333EA] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/60"
                >
                  {contact.submitLabel} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
