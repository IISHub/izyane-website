export type LegalTabId =
  | "privacy"
  | "terms"
  | "data-protection"
  | "cookies"
  | "acceptable-use";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocument {
  id: LegalTabId;
  label: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "privacy",
    label: "Privacy Policy",
    lastUpdated: "May 17, 2026",
    intro:
      "iZyane InovSolutions & Payments Limited respects your privacy and is committed to protecting the personal information you share with us.",
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "We may collect basic contact details, business information, transaction-related information, device information, and service usage data when you interact with our website, platforms, payment services, merchant portals, or support channels.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: ["We use this information to provide our services, process transactions, support merchants and partners, improve system performance, meet regulatory obligations, prevent fraud, and communicate important service updates. We do not sell your personal information. Where required, information may be shared with banks, mobile network operators, payment processors, regulators, technology partners, or service providers for the purpose of delivering and securing our services.",
        
          "We apply reasonable technical and organisational safeguards to protect your information against unauthorised access, loss, misuse, or alteration.",
        ],
      },
      
    ],
  },
  {
    id: "terms",
    label: "Terms and Conditions",
    lastUpdated: "May 17, 2026",
    intro:
      "These Terms and Conditions govern your access to and use of the iZyane InovSolutions website and related services. By using our site, you agree to these terms.",
    sections: [
      {
        title: "Use of the Website and Other Services",
        paragraphs: [
          "By accessing or using iZyane’s website, systems, platforms, applications, payment services, or related solutions, you agree to use them only for lawful and authorised purposes. All content, systems, software, documentation, designs, trademarks, and technical materials made available by iZyane remain the property of iZyane or its authorised partners unless otherwise stated.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All content on this website—including text, graphics, logos, software, and design—is owned by or licensed to iZyane InovSolutions and is protected by applicable intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express permission.",
        ],
      },
      {
        title: "Clients and Partners",
        paragraphs: [
          "Users, merchants, partners, and clients are responsible for ensuring that all information provided to iZyane is accurate, complete, and up to date. iZyane may update, suspend, restrict, or discontinue access to any service where required for security, compliance, maintenance, operational improvement, or regulatory reasons.",
        ],
      },
      {
        title: "Disclaimer and Limitation of Liability",
        paragraphs: [
          "iZyane shall not be liable for service interruptions caused by third-party networks, banks, mobile money providers, internet service providers, force majeure events, or circumstances outside its reasonable control.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "These terms are governed by the laws of the Republic of Zambia, without regard to conflict-of-law principles. Disputes shall be subject to the exclusive jurisdiction of the courts of Zambia, unless otherwise required by mandatory law.",
        ],
      },
    ],
  },
  {
    id: "data-protection",
    label: "Data Protection",
    lastUpdated: "May 17, 2026",
    intro:
      "iZyane InovSolutions is committed to protecting personal data in line with applicable data protection principles and regional expectations for fintech and technology services.",
    sections: [
      {
        title: "Our Commitment",
        paragraphs: [
          "iZyane processes personal data in accordance with applicable data protection laws, including Zambia’s Data Protection Act No. 3 of 2021, which regulates the lawful, fair, and secure processing of personal data. The Act provides for the protection of personal data and regulates its collection, use, transmission, storage, and processing. ",
        ],
      },
      {
        title: "Lawful Processing",
        paragraphs: [
          "We only collect and process data for specific business, operational, contractual, security, and regulatory purposes. This may include merchant onboarding, payment processing, transaction monitoring, customer support, fraud prevention, reporting, compliance checks, and service improvement.",
        "Data subjects may have rights relating to access, correction, deletion, objection, restriction of processing, and data portability, subject to applicable legal and contractual requirements.  Requests relating to personal data may be submitted through iZyane’s official contact channels.",
        ],
      },
      
    ],
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    lastUpdated: "May 17, 2026",
    intro:
      "This Cookie Policy explains how iZyane InovSolutions uses cookies and similar technologies on our website.",
    sections: [
      {
        title: "What Are Cookies",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website. They help the site remember preferences, understand usage, and improve performance.",
        ],
      },
      {
        title: "Why We Use Cookies",
        paragraphs: ["The iZyane website may use cookies and similar technologies to improve user experience, monitor website performance, remember user preferences, enhance security, and understand how visitors interact with our online services.",
          "Cookies may include essential cookies required for the website to function, analytics cookies used to measure performance, and preference cookies used to improve usability. Users may disable or manage cookies through their browser settings; however, some website features may not function properly if cookies are disabled."
        ],
      },
      {
        title: "Managing Cookies",
        paragraphs: [
          "You can control cookies through your browser settings. Disabling certain cookies may affect site functionality. Where required, we will request your consent before placing non-essential cookies.",
        ],
      },
      {
        title: "Third-Party Cookies",
        paragraphs: [
          "Some cookies may be set by third-party services we use for analytics, embedded content, or hosting. Those providers have their own privacy policies governing their use of data.",
          "By continuing to use our website, you consent to the use of cookies in accordance with this Cookie Policy, unless you disable them through your browser or device settings."
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    label: "Acceptable Use Policy",
    lastUpdated: "May 17, 2026",
    intro:
      "This Acceptable Use Policy sets out the rules for using iZyane InovSolutions websites, platforms, and related services. Violations may result in suspension or termination of access.",
    sections: [
      {
        title: "Permitted Use",
        paragraphs: [
          "Users must use iZyane’s website, systems, applications, payment platforms, merchant portals, and related services responsibly, lawfully, and only for authorized business purposes. Users must not attempt to gain unauthorized access to any system, interfere with service availability, upload malicious code, misuse payment infrastructure, conduct fraudulent transactions, or use iZyane’s services for illegal, abusive, harmful, or misleading activities.",
        ],
      },
      {
        title: "Prohibited Conduct",
        paragraphs: ["Users are also prohibited from reverse engineering, copying, modifying, attacking, overloading, or bypassing security controls on any iZyane system or platform. Any suspected misuse, fraud, security breach, or unauthorised activity may result in access restriction, suspension, investigation, reporting to relevant authorities, or termination of service.",
          "You must not:"],
        list: [
          "Upload or transmit malware, spam, or harmful code",
          "Attempt to gain unauthorized access to systems or data",
          "Harass, defame, or discriminate against others",
          "Infringe intellectual property or privacy rights",
          "Use our services for fraudulent, illegal, or abusive financial activity",
          "Circumvent security controls or rate limits",
        ],
      },
      {
        title: "Enforcement",
        paragraphs: [
          "iZyane reserves the right to monitor system activity where necessary for security, compliance, fraud prevention, and service protection.",
          "We may investigate suspected violations and take appropriate action, including restricting access, reporting to authorities, or terminating accounts. We cooperate with law enforcement where legally required.",
        ],
      },
    ],
  },
];

export const defaultLegalTab: LegalTabId = "privacy";

export function isLegalTabId(value: string | null): value is LegalTabId {
  return legalDocuments.some((doc) => doc.id === value);
}

export function getLegalTabFromParam(tab: string | undefined): LegalTabId {
  return tab && isLegalTabId(tab) ? tab : defaultLegalTab;
}
