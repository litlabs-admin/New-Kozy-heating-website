import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CookieNoticeReset } from "@/components/CookieNoticeReset";
import { SectionNav } from "./SectionNav";
import {
  STORAGE_REGISTRY,
  controller,
  type LegalBlock,
  type LegalSection,
} from "@/lib/legal-content";

function ContactAddress() {
  return (
    <address className="my-5 block border-l-2 border-primary pl-5 not-italic text-sm leading-relaxed text-muted">
      <span className="font-semibold text-foreground">
        {controller.legalName}
      </span>{" "}
      trading as {controller.tradingName}
      <br />
      <span className="text-muted">{controller.address}</span>
      <br />
      <a
        href={controller.phoneHref}
        className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
      >
        {controller.phone}
      </a>
      <br />
      <a
        href={controller.emailHref}
        className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
      >
        {controller.email}
      </a>
    </address>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full divide-y divide-border text-left">
        <thead className="bg-surface-alt">
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-heading text-[11px] font-semibold uppercase tracking-wider text-foreground"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white align-top">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-sm leading-relaxed text-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {block.text}
        </p>
      );

    case "h3":
      return (
        <h3 className="mt-7 font-heading text-base font-semibold text-foreground">
          {block.text}
        </h3>
      );

    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-6 text-sm leading-relaxed text-muted sm:text-base"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-primary"
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "note":
      return (
        <p className="mt-5 rounded-xl border border-border bg-primary-light/60 px-5 py-4 text-sm leading-relaxed text-foreground/80">
          {block.text}
        </p>
      );

    case "link":
      return (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {block.text}
          <Link
            href={block.href}
            className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-dark"
          >
            {block.label}
          </Link>
          .
        </p>
      );

    case "address":
      return <ContactAddress />;

    case "table":
      return <DataTable head={block.head} rows={block.rows} />;

    case "cookieTable":
      return (
        <DataTable
          head={["Name", "Set by", "Type", "Purpose", "How long"]}
          rows={STORAGE_REGISTRY.map((c) => [
            c.name,
            c.provider,
            c.type,
            c.purpose,
            c.duration,
          ])}
        />
      );

    case "cookieReset":
      return (
        <div className="mt-5">
          <CookieNoticeReset variant="link" />
        </div>
      );
  }
}

type Props = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  /** Optional control rendered beneath the side navigation. */
  sidebarFooter?: ReactNode;
};

export function LegalPageShell({
  title,
  intro,
  lastUpdated,
  sections,
  sidebarFooter,
}: Props) {
  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,rgba(255,255,255,0.22),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-primary-light sm:text-base">
            {intro}
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-wider text-white/70">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <SectionNav sections={sections} footer={sidebarFooter} />
            </aside>

            <article className="rounded-2xl border border-border bg-white p-7 shadow-sm sm:p-10 lg:col-span-9 lg:p-12">
              {sections.map((section, i) => (
                <Reveal
                  key={section.id}
                  as="section"
                  delay={Math.min(i, 3) * 60}
                  className={i === sections.length - 1 ? "" : "mb-10"}
                >
                  <div id={section.id} className="scroll-mt-24">
                    <h2 className="border-b border-border pb-3 font-heading text-xl font-bold text-foreground sm:text-2xl">
                      {section.title}
                    </h2>
                    {section.blocks.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                  </div>
                </Reveal>
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
