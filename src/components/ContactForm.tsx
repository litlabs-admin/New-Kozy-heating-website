"use client";

import { ChangeEvent, FocusEvent, FormEvent, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

type Status = "idle" | "loading" | "success" | "error";
type FieldName = "name" | "email" | "phone" | "postcode" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName | "captcha", string>>;

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "e4941a6c-fbb8-4371-9fea-266cdeafc1d7";

// Web3Forms' shared hCaptcha sitekey for the free plan.
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "postcode", "message"];
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;

const EMPTY: Values = { name: "", email: "", phone: "", postcode: "", message: "" };

const NAME_RE = /^[\p{L}][\p{L}\s'.-]*$/u;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const UK_MOBILE_RE = /^(?:\+44|0)7\d{9}$/;
const UK_LANDLINE_RE = /^(?:\+44|0)[1-3]\d{8,9}$/;
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

const COUNTRY_CODES = [
  { iso: "GB", flag: "🇬🇧", name: "United Kingdom", dial: "+44" },
  { iso: "IE", flag: "🇮🇪", name: "Ireland", dial: "+353" },
  { iso: "PL", flag: "🇵🇱", name: "Poland", dial: "+48" },
  { iso: "FR", flag: "🇫🇷", name: "France", dial: "+33" },
  { iso: "DE", flag: "🇩🇪", name: "Germany", dial: "+49" },
  { iso: "ES", flag: "🇪🇸", name: "Spain", dial: "+34" },
  { iso: "IT", flag: "🇮🇹", name: "Italy", dial: "+39" },
  { iso: "NL", flag: "🇳🇱", name: "Netherlands", dial: "+31" },
  { iso: "PT", flag: "🇵🇹", name: "Portugal", dial: "+351" },
  { iso: "RO", flag: "🇷🇴", name: "Romania", dial: "+40" },
  { iso: "LT", flag: "🇱🇹", name: "Lithuania", dial: "+370" },
  { iso: "IN", flag: "🇮🇳", name: "India", dial: "+91" },
  { iso: "PK", flag: "🇵🇰", name: "Pakistan", dial: "+92" },
  { iso: "US", flag: "🇺🇸", name: "United States / Canada", dial: "+1" },
  { iso: "AU", flag: "🇦🇺", name: "Australia", dial: "+61" },
] as const;

type CountryIso = (typeof COUNTRY_CODES)[number]["iso"];

function getDial(iso: CountryIso) {
  return COUNTRY_CODES.find((c) => c.iso === iso)?.dial ?? "+44";
}

function normalisePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}

/** Returns the full international number (e.g. +447123456789), or null if invalid. */
function toInternational(value: string, iso: CountryIso): string | null {
  let phone = normalisePhone(value);
  if (phone.startsWith("00")) phone = `+${phone.slice(2)}`;

  // Number typed with its own country code overrides the dropdown.
  if (!phone.startsWith("+")) {
    const national = iso === "IT" ? phone : phone.replace(/^0/, "");
    phone = `${getDial(iso)}${national}`;
  }

  if (!/^\+\d{8,15}$/.test(phone)) return null;
  if (phone.startsWith("+44")) {
    const uk = `0${phone.slice(3)}`;
    if (!UK_MOBILE_RE.test(uk) && !UK_LANDLINE_RE.test(uk)) return null;
  }
  return phone;
}

function formatPostcode(value: string) {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  return compact.length > 3
    ? `${compact.slice(0, -3)} ${compact.slice(-3)}`
    : compact;
}

function validateField(
  field: FieldName,
  raw: string,
  country: CountryIso,
): string | undefined {
  const value = raw.trim();

  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      if (value.length > 60) return "Name must be 60 characters or fewer.";
      if (!NAME_RE.test(value))
        return "Name can only contain letters, spaces, apostrophes, hyphens and full stops.";
      return;
    case "email":
      if (!value) return "Please enter your email address.";
      if (value.length > 254 || !EMAIL_RE.test(value))
        return "Please enter a valid email address, e.g. name@example.com.";
      return;
    case "phone": {
      if (!value) return "Please enter your phone number.";
      if (!toInternational(value, country))
        return country === "GB"
          ? "Please enter a valid UK phone number, e.g. 07123 456789."
          : "Please enter a valid phone number for the selected country.";
      return;
    }
    case "postcode":
      if (value && !UK_POSTCODE_RE.test(value))
        return "Please enter a valid UK postcode, e.g. SW1A 1AA.";
      return;
    case "message":
      if (!value) return "Please tell us how we can help.";
      if (value.length < MESSAGE_MIN)
        return `Message must be at least ${MESSAGE_MIN} characters.`;
      if (value.length > MESSAGE_MAX)
        return `Message must be ${MESSAGE_MAX} characters or fewer.`;
      return;
  }
}

function validateAll(values: Values, country: CountryIso): Errors {
  const errors: Errors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field], country);
    if (error) errors[field] = error;
  }
  return errors;
}

const inputClass =
  "mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function fieldClass(hasError: boolean) {
  return `${inputClass} ${hasError ? "border-red-500" : "border-border"}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [country, setCountry] = useState<CountryIso>("GB");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const captchaRef = useRef<HCaptcha>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as FieldName;
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value, country) }));
    }
  }

  function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as CountryIso;
    setCountry(next);
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validateField("phone", values.phone, next) }));
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    let value = event.target.value;
    if (field === "postcode" && value.trim()) {
      value = formatPostcode(value);
      setValues((prev) => ({ ...prev, postcode: value }));
    }
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value, country) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const nextErrors = validateAll(values, country);
    if (!captchaToken) {
      nextErrors.captcha = "Please complete the captcha to confirm you're not a robot.";
    }
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, postcode: true, message: true });

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    if (nextErrors.captcha) return;

    // Honeypot: real users never see or tick this.
    const botcheck = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheck) return;

    setStatus("loading");
    setServerError("");

    const name = values.name.trim().replace(/\s+/g, " ");
    const email = values.email.trim();
    const submitted = new Date().toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/London",
    });

    // Keys become the row labels in the Web3Forms notification email.
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New enquiry from ${name} – Kozy Heating website`,
      from_name: "Kozy Heating Website",
      replyto: email,
      "h-captcha-response": captchaToken,
      "Full Name": name,
      "Email Address": email,
      "Phone Number": toInternational(values.phone, country) ?? values.phone.trim(),
      Postcode: values.postcode.trim() ? formatPostcode(values.postcode) : "Not provided",
      Message: values.message.trim(),
      Submitted: submitted,
      Page: window.location.href,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        formRef.current?.reset();
      } else {
        setServerError(typeof result.message === "string" ? result.message : "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  }

  const messageLength = values.message.trim().length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={60}
          placeholder="Your full name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          placeholder="Your email address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-2">
          <select
            aria-label="Country code"
            value={country}
            onChange={handleCountryChange}
            className="mt-2 shrink-0 cursor-pointer rounded-lg border border-border bg-white px-3 py-3 text-sm text-foreground transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.iso} value={c.iso} title={c.name}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={20}
            placeholder={country === "GB" ? "07123 456789" : "Phone number"}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${fieldClass(Boolean(errors.phone))} min-w-0 flex-1`}
          />
        </div>
        <FieldError id="phone-error" message={errors.phone} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="postcode" className="text-sm font-medium text-foreground">
            Postcode <span className="text-xs font-normal text-muted">(optional)</span>
          </label>
          <input
            id="postcode"
            name="postcode"
            type="text"
            autoComplete="postal-code"
            autoCapitalize="characters"
            maxLength={8}
            placeholder="e.g. SW1A 1AA"
            value={values.postcode}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.postcode)}
            aria-describedby={errors.postcode ? "postcode-error" : undefined}
            className={fieldClass(Boolean(errors.postcode))}
          />
          <FieldError id="postcode-error" message={errors.postcode} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder="How can we help you?"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`message-count${errors.message ? " message-error" : ""}`}
          className={`${fieldClass(Boolean(errors.message))} resize-y`}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <FieldError id="message-error" message={errors.message} />
          <p id="message-count" className="ml-auto shrink-0 text-xs text-muted">
            {messageLength}/{MESSAGE_MAX}
          </p>
        </div>
      </div>

      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITEKEY}
          reCaptchaCompat={false}
          onVerify={(token) => {
            setCaptchaToken(token);
            setErrors((prev) => ({ ...prev, captcha: undefined }));
          }}
          onExpire={() => setCaptchaToken(null)}
          onError={() => setCaptchaToken(null)}
        />
        <FieldError id="captcha-error" message={errors.captcha} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs leading-relaxed text-muted">
        We use your details only to reply to your enquiry. See our{" "}
        <a href="/privacy" className="text-primary underline underline-offset-2 hover:text-primary-dark">
          privacy policy
        </a>{" "}
        for how we handle them.
      </p>

      {status === "success" && (
        <p role="status" className="animate-fade-in-up text-sm font-medium text-emerald-600">
          Thanks — your message has been sent. We&apos;ll get back to you
          shortly.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="animate-fade-in-up text-sm font-medium text-red-600">
          {serverError
            ? `Sorry, your message couldn't be sent: ${serverError}`
            : "Something went wrong sending your message. Please try again or contact us directly."}
        </p>
      )}
    </form>
  );
}
