"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_ACCESS_KEY";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New enquiry from Kozy Heating website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your phone number"
          className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help you?"
          className="mt-2 w-full resize-y rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="animate-fade-in-up text-sm font-medium text-emerald-600">
          Thanks — your message has been sent. We&apos;ll get back to you
          shortly.
        </p>
      )}
      {status === "error" && (
        <p className="animate-fade-in-up text-sm font-medium text-red-600">
          Something went wrong sending your message. Please try again or
          contact us directly.
        </p>
      )}
    </form>
  );
}
