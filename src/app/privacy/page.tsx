import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How halcyzhuo handles your data — what we collect, why, and how long we keep it.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Who we are",
    body: [
      `halcyzhuo is an engineering studio based in Jakarta, Indonesia. The site is operated by us — reachable at ${SITE.email}.`,
    ],
  },  {
    title: "Data we collect",
    body: [
      "We only collect what you choose to share with us: your name, email address, and message when you reach out about a project or an inquiry.",
      "The site doesn't require an account, so we don't process personal data just to serve the pages.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Contact details are used solely to respond to your inquiry, prepare a proposal, or communicate about ongoing work. We never sell or rent personal data to anyone.",
    ],
  },
  {
    title: "Cookies & analytics",
    body: [
      "If analytics is enabled, we use a privacy-friendly, cookieless setup to understand aggregate page views and performance. No personal data is collected through it, and we don't run third-party ad trackers.",
    ],
  },
  {
    title: "Retention & your rights",
    body: [
      `We keep inquiry emails only as long as needed for the conversation or as required by law. You can ask us to review, correct, or delete your data at any time — email ${SITE.email}.`,
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update this policy from time to time. Material changes will be noted on this page with an updated date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      label="Legal · privacy"
      title={
        <>
          Privacy<span className="text-accent">.</span>
        </>
      }
      intro={`What we collect, why we collect it, and how long we keep it. Short version: only what you send us, only to answer you.`}
      sections={sections}
    />
  );
}
