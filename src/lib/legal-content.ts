/**
 * Single source of truth for the /privacy and /cookies pages.
 *
 * The table of contents, the page body and the cookie tables all render from
 * these arrays, so the side navigation can never drift from the content.
 */

export const PRIVACY_LAST_UPDATED = "15 September 2026";
export const COOKIES_LAST_UPDATED = "15 September 2026";

/** Controller / business identity. Confirmed facts only. */
export const controller = {
  legalName: "Kenneth Kozak",
  tradingName: "Kozy Heating Solutions",
  legalForm: "sole trader",
  address: "6 Bressay, East Kilbride, Glasgow, G74 4RZ",
  phone: "07971 956315",
  phoneHref: "tel:+447971956315",
  smsHref: "sms:+447971956315",
  email: "heat.team@kozyheating.co.uk",
  emailHref: "mailto:heat.team@kozyheating.co.uk",
  gasSafe: "217028",
  serviceArea: "Scotland's Central Belt",
};

/* -------------------------------------------------------------------------- */
/* Content blocks                                                             */
/* -------------------------------------------------------------------------- */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "note"; text: string }
  | { kind: "link"; text: string; href: string; label: string }
  | { kind: "address" }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "cookieTable" }
  | { kind: "cookieReset" };

export type LegalSection = {
  id: string;
  /** Short label for the side navigation. */
  label: string;
  /** Full heading shown in the article. */
  title: string;
  blocks: LegalBlock[];
};

/* -------------------------------------------------------------------------- */
/* Cookie / storage registry                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Everything this website actually stores on a visitor's device.
 *
 * This list is the honest inventory the cookie policy publishes. If a new
 * technology is added to the site it MUST be added here at the same time.
 */
export const STORAGE_REGISTRY = [
  {
    name: "kozy_cookie_notice",
    provider: "Kozy Heating Solutions (this website)",
    type: "Local storage",
    purpose:
      "Remembers that you have seen and dismissed the cookie notice, so it is not shown on every page.",
    duration: "Until you clear your browser storage",
  },
  {
    name: "__cf_bm",
    provider: "hCaptcha, via Cloudflare (hcaptcha.com)",
    type: "Third-party cookie",
    purpose:
      "Set only on the contact page when the spam-protection check loads. Helps tell real visitors from automated bots.",
    duration: "30 minutes",
  },
] as const;

/**
 * Third parties that receive data, but which do not set cookies or storage on
 * this website. Listed separately so the policy does not overstate what runs
 * in your browser.
 */
export const PROCESSORS = [
  {
    name: "Web3Forms",
    role: "Delivers messages sent through the contact form to our email inbox.",
    data: "The name, email address, phone number, optional postcode and message you type into the form, plus the page it was sent from and the time.",
    note: "Only receives data at the moment you press send. It sets no cookies on this site.",
  },
  {
    name: "hCaptcha (Intuition Machines, Inc.)",
    role: "Checks that contact form submissions come from a real person, to block spam.",
    data: "IP address, browser and device information, and how you interact with the captcha.",
    note: "Only loads on the contact page. Governed by hCaptcha's own privacy policy.",
  },
  {
    name: "Website host",
    role: "Serves the website and keeps short-term server and security logs.",
    data: "IP address, browser type, requested page, date and time.",
    note: "Standard technical logging required to run the site securely.",
  },
];

/* -------------------------------------------------------------------------- */
/* Privacy policy                                                             */
/* -------------------------------------------------------------------------- */

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    label: "1. Who we are",
    title: "1. Who we are",
    blocks: [
      {
        kind: "p",
        text: `${controller.tradingName} is a trading name of ${controller.legalName}, a ${controller.legalForm} providing boiler, heating and gas services across ${controller.serviceArea}. ${controller.legalName} is the data controller responsible for the personal information described in this notice.`,
      },
      { kind: "address" },
      {
        kind: "p",
        text: `Gas Safe registered business ${controller.gasSafe}. As a sole trader, ${controller.tradingName} does not have a company number or registered office.`,
      },
    ],
  },
  {
    id: "information-website-collects",
    label: "2. What the website collects",
    title: "2. What this website collects",
    blocks: [
      {
        kind: "p",
        text: "This website is deliberately simple. It does not use analytics, advertising or tracking technologies, and it does not build a profile of you.",
      },
      {
        kind: "p",
        text: "A few things happen automatically when you visit, and all are necessary to run the site securely:",
      },
      {
        kind: "ul",
        items: [
          "Our hosting provider keeps short-term technical logs — your IP address, browser type, the page you requested and the time you requested it. These are used to keep the website available and secure, and to investigate faults or abuse.",
          "Your browser stores a small flag once you dismiss the cookie notice, so we do not show it to you again. This stays on your device and is never sent to us.",
          "On the contact page only, hCaptcha loads a spam-protection check. It receives your IP address and browser and device details, and sets a short-lived security cookie, so it can tell real people from bots.",
        ],
      },
      {
        kind: "link",
        text: "The complete inventory of what we store is on our ",
        href: "/cookies",
        label: "cookie policy",
      },
    ],
  },
  {
    id: "information-you-give-us",
    label: "3. What you give us",
    title: "3. Information you give us directly",
    blocks: [
      {
        kind: "p",
        text: "Most of our contact with customers happens by phone, text or email rather than through this website. When you get in touch, you choose what to tell us — typically your name, contact number, address and a description of the heating problem or work you need.",
      },
      {
        kind: "h3",
        text: "Contact form",
      },
      {
        kind: "p",
        text: "If you use the contact form, we ask for your name, email address, phone number, an optional postcode and your message. When you press send, these details, together with the page you sent it from and the time, are delivered to our email inbox through Web3Forms. Before the form sends, hCaptcha checks the submission is not from a bot. We only ask for what we need to reply to you.",
      },
      {
        kind: "h3",
        text: "Calls, texts and email",
      },
      {
        kind: "p",
        text: "If you call or text us, your phone number and any message you send will be on the device and with the mobile network operator in the ordinary way. We use those details to answer your enquiry, arrange a visit and carry out the work.",
      },
      {
        kind: "note",
        text: "An ordinary call, text or enquiry about a job is not marketing consent. We do not add you to a marketing list on the strength of contacting us.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    label: "4. How we use it",
    title: "4. How we use your information",
    blocks: [
      {
        kind: "table",
        head: ["What we do", "Why", "Lawful basis"],
        rows: [
          [
            "Answer your enquiry and give you a quote",
            "You have asked us about work on your property",
            "Steps taken at your request before entering a contract",
          ],
          [
            "Arrange, carry out and invoice the work",
            "To deliver the service you have asked for",
            "Performance of a contract",
          ],
          [
            "Keep records of gas work, certificates and safety documents",
            "Gas safety and registration requirements apply to this work",
            "Legal obligation",
          ],
          [
            "Keep job records for warranty, follow-up and dispute purposes",
            "To stand behind our work and answer later questions",
            "Legitimate interests",
          ],
          [
            "Keep the website available and secure",
            "To run the site and prevent abuse",
            "Legitimate interests",
          ],
        ],
      },
      {
        kind: "p",
        text: "We do not sell your information, and we do not use it for automated decision-making or profiling.",
      },
    ],
  },
  {
    id: "who-we-share-with",
    label: "5. Who we share it with",
    title: "5. Who we share your information with",
    blocks: [
      {
        kind: "p",
        text: "We keep the list of people who handle your information deliberately short. We share it with:",
      },
      {
        kind: "ul",
        items: [
          "Our website host, which serves this site and keeps the technical logs described above.",
          "Web3Forms, which delivers contact form messages to our email inbox.",
          "hCaptcha, which checks that contact form submissions are not spam.",
          "Our email and mobile providers, in the ordinary course of you contacting us.",
          "Our IT and website support provider, which maintains this website on our behalf.",
          "Suppliers and merchants, where a part or appliance has to be ordered for your job.",
          "Our accountant and, where required, HMRC or a regulator, to meet legal and tax obligations.",
        ],
      },
      {
        kind: "p",
        text: "We will also disclose information where we are legally required to do so, or where it is necessary to establish, exercise or defend a legal claim.",
      },
      {
        kind: "note",
        text: "The exact list of providers is being finalised before launch and will be kept accurate here.",
      },
    ],
  },
  {
    id: "transfers",
    label: "6. Transfers outside the UK",
    title: "6. Transfers outside the UK",
    blocks: [
      {
        kind: "p",
        text: "Some of the service providers we rely on may process data on servers outside the United Kingdom. In particular, hCaptcha is operated by Intuition Machines, Inc. in the United States, and form delivery through Web3Forms and our email provider may also involve servers abroad.",
      },
      {
        kind: "p",
        text: "Where that happens, we rely on the provider transferring data either to a country the UK has decided offers adequate protection, or under the UK International Data Transfer Agreement or Addendum to the EU Standard Contractual Clauses. You can ask us for details of the safeguards that apply.",
      },
    ],
  },
  {
    id: "retention",
    label: "7. How long we keep it",
    title: "7. How long we keep your information",
    blocks: [
      {
        kind: "p",
        text: "We keep information only as long as we need it, then delete it.",
      },
      {
        kind: "table",
        head: ["Information", "How long we keep it"],
        rows: [
          [
            "Enquiries that do not become a job",
            "12 months from your last contact with us",
          ],
          [
            "Customer and job records, invoices and gas safety documents",
            "Six years from the end of the tax year in which the work was completed, to meet HMRC record-keeping rules and allow for any warranty or legal claims",
          ],
          [
            "Website server and security logs",
            "Up to 30 days, unless needed longer to investigate a security issue",
          ],
          [
            "The cookie notice flag in your browser",
            "Until you clear your browser storage",
          ],
        ],
      }
    ],
  },
  {
    id: "your-rights",
    label: "8. Your rights",
    title: "8. Your rights",
    blocks: [
      {
        kind: "p",
        text: "Under UK data protection law you have the right to:",
      },
      {
        kind: "ul",
        items: [
          "Ask what personal information we hold about you, and get a copy of it.",
          "Ask us to correct information that is wrong or incomplete.",
          "Ask us to delete information, where we do not have a legal reason to keep it.",
          "Ask us to restrict how we use your information while a concern is resolved.",
          "Object to us using your information where we rely on legitimate interests.",
          "Ask for a copy of information you gave us in a portable format, where that right applies.",
          "Withdraw consent at any time, where we relied on your consent.",
        ],
      },
      {
        kind: "p",
        text: "To exercise any of these rights, call or email us using the details below. We will respond within one month. We may ask you to confirm your identity first so we do not disclose information to the wrong person.",
      },
    ],
  },
  {
    id: "complaints",
    label: "9. Complaints",
    title: "9. How to complain",
    blocks: [
      {
        kind: "p",
        text: "If you are unhappy with how we have handled your information, please tell us first so we have the chance to put it right.",
      },
      {
        kind: "p",
        text: "You also have the right to complain to the Information Commissioner's Office, the UK supervisory authority for data protection, at ico.org.uk or on 0303 123 1113.",
      },
    ],
  },
  {
    id: "changes",
    label: "10. Changes",
    title: "10. Changes to this notice",
    blocks: [
      {
        kind: "p",
        text: `We review this notice when the way we run the website or the business changes. The date at the top of this page tells you when it was last updated. This version was published on ${PRIVACY_LAST_UPDATED}.`,
      },
    ],
  },
  {
    id: "contact",
    label: "11. Contact us",
    title: "11. Contact us",
    blocks: [
      {
        kind: "p",
        text: "For anything in this notice, including a request about your information, contact:",
      },
      { kind: "address" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Cookie policy                                                              */
/* -------------------------------------------------------------------------- */

export const cookieSections: LegalSection[] = [
  {
    id: "summary",
    label: "1. The short version",
    title: "1. The short version",
    blocks: [
      {
        kind: "p",
        text: "This website does not use analytics, advertising, social media or tracking cookies.",
      },
      {
        kind: "p",
        text: "On most pages, the only thing stored on your device is a single flag that remembers you have dismissed the cookie notice. It lives in your browser's local storage and never leaves your device. The one exception is the contact page, where our spam-protection provider, hCaptcha, sets a short-lived security cookie so the form cannot be flooded by bots.",
      },
      {
        kind: "note",
        text: "Both are strictly necessary: one stops the notice reappearing, the other protects a form you have chosen to use. Nothing optional runs on this site, so there is nothing for you to switch off. If that ever changes, we will ask for your consent before it loads — and this page will say so.",
      },
    ],
  },
  {
    id: "what-are-cookies",
    label: "2. Cookies and storage",
    title: "2. What cookies and browser storage are",
    blocks: [
      {
        kind: "p",
        text: "A cookie is a small text file a website asks your browser to save, which is then sent back to that website on later visits. Local storage is similar, but the information stays on your device and is not sent anywhere.",
      },
      {
        kind: "p",
        text: "Both are commonly used to remember preferences. They are also widely used to measure traffic and to target advertising — which is the use that requires your consent, and which we do not do.",
      },
    ],
  },
  {
    id: "what-we-store",
    label: "3. What we store",
    title: "3. What we store on your device",
    blocks: [
      {
        kind: "p",
        text: "This is the complete inventory. If we add anything to the site, we add it here at the same time.",
      },
      { kind: "cookieTable" },
      {
        kind: "p",
        text: "Strictly necessary storage like this does not require consent, because it is needed to provide what you have asked for or to keep the site secure. We still tell you about it. The hCaptcha cookie is set by a third party and is covered by hCaptcha's own privacy policy.",
      },
    ],
  },
  {
    id: "third-parties",
    label: "4. Third parties",
    title: "4. Third parties and embedded content",
    blocks: [
      {
        kind: "p",
        text: "A few services help us run the site. Only hCaptcha sets anything in your browser, and only on the contact page:",
      },
      {
        kind: "table",
        head: ["Service", "What it does", "What it receives"],
        rows: PROCESSORS.map((p) => [p.name, p.role, p.data]),
      },
      {
        kind: "h3",
        text: "Facebook",
      },
      {
        kind: "p",
        text: "We link to our Facebook page rather than embedding a live feed. A plain link means Facebook does not receive anything about you unless you choose to click through — at which point Facebook's own privacy policy and cookies apply.",
      },
      {
        kind: "h3",
        text: "Maps and video",
      },
      {
        kind: "p",
        text: "We do not embed maps or video players on this site. If we ever do, they will be blocked behind a click-to-load placeholder so nothing third-party runs until you choose to load it.",
      },
    ],
  },
  {
    id: "managing",
    label: "5. Managing storage",
    title: "5. Managing cookies and storage",
    blocks: [
      {
        kind: "p",
        text: "Every major browser lets you view and delete cookies and site data, usually under Privacy and Security in its settings. Clearing site data for this website will remove the cookie notice flag, and the notice will appear again on your next visit.",
      },
      {
        kind: "p",
        text: "You can also bring the notice back at any time:",
      },
      { kind: "cookieReset" },
      {
        kind: "p",
        text: "Blocking storage for this site will not stop the pages working, but the cookie notice will not remember your dismissal. Blocking third-party cookies may stop the spam check on the contact form from completing. If that happens, you can always call, text or email us instead.",
      },
    ],
  },
  {
    id: "changes-cookies",
    label: "6. Changes",
    title: "6. Changes to this policy",
    blocks: [
      {
        kind: "p",
        text: `We keep this page matched to what the website actually does. If we add analytics or any other optional technology, we will update this page and ask for your consent before that technology loads. This version was published on ${COOKIES_LAST_UPDATED}.`,
      },
    ],
  },
  {
    id: "cookies-contact",
    label: "7. Contact us",
    title: "7. Contact us",
    blocks: [
      {
        kind: "p",
        text: "If you have a question about how this website uses cookies or storage, get in touch:",
      },
      { kind: "address" },
      {
        kind: "link",
        text: "For everything else we do with personal information, see our ",
        href: "/privacy",
        label: "privacy policy",
      },
    ],
  },
];
