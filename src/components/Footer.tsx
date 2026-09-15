import Link from "next/link";
import { Logo } from "./Logo";
import { siteConfig, footerQuickLinks, footerLegalLinks } from "@/lib/site-config";
import { controller } from "@/lib/legal-content";

export function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-muted transition-all duration-200 hover:translate-x-1 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Phone / WhatsApp / text: {siteConfig.phone}</li>
              <li>Email: {siteConfig.email}</li>
              <li>Address: {siteConfig.address}</li>
              <li>Service area: {siteConfig.serviceArea}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted">
            {controller.tradingName} is a trading name of {controller.legalName},{" "}
            {controller.legalForm}. Business address: {controller.address}. Gas
            Safe registered business {controller.gasSafe}. Telephone:{" "}
            {controller.phone}. Email: {controller.email}.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
