import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLens } from '@/context/LensContext';
import { useSiteContent } from '@/data/siteContent';

const fieldClassName =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-500 focus:border-[#A855F7]/60 focus:bg-white/[0.05]';

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
    <section id="connect" className="relative z-10 px-4 py-24 text-white md:px-8 lg:pl-16">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-transparent px-6 py-12 shadow-none md:px-10 md:py-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.34),_transparent_62%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.24),_transparent_72%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-[#C084FC]">{contact.eyebrow}</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
              {contact.intro}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative mx-auto mt-14 flex max-w-2xl flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-sm text-zinc-300">{contact.fields.firstName.label}</span>
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder={contact.fields.firstName.placeholder}
                  className={fieldClassName}
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-sm text-zinc-300">{contact.fields.lastName.label}</span>
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
              <span className="mb-3 block text-sm text-zinc-300">{contact.fields.email.label}</span>
              <input
                required
                name="email"
                type="email"
                placeholder={contact.fields.email.placeholder}
                className={fieldClassName}
              />
            </label>

            <div className="block">
              <span className="mb-3 block text-sm text-zinc-300">{contact.fields.phoneNumber.label}</span>
              <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
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
              <span className="mb-3 block text-sm text-zinc-300">{contact.fields.message.label}</span>
              <textarea
                required
                name="message"
                rows={6}
                placeholder={contact.fields.message.placeholder}
                className={`${fieldClassName} min-h-[160px] resize-y`}
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7E22CE] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#9333EA] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/60"
            >
              {contact.submitLabel} <ArrowRight size={18} />
            </button>

            <p className="text-center text-xs text-zinc-500">
              {contact.helper}
            </p>

            <p className="text-center text-sm text-zinc-400">
              {contact.directEmailPrefix}{' '}
              <a
                href="mailto:deekshithsistu@gmail.com"
                className="text-[#C084FC] underline decoration-[#C084FC]/60 underline-offset-4 transition hover:text-white"
              >
                deekshithsistu@gmail.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
