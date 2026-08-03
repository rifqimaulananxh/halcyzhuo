import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you work with halcyzhuo on an engineering project.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "Agreement",
    body: [
      `By engaging halcyzhuo for a project, you agree to these terms. Each project is confirmed with a written proposal and statement of work that overrides any general terms in case of conflict.`,
    ],
  },
  {
    title: "What we deliver",
    body: [
      "We build, maintain, and operate software: frontend, backend, and infrastructure. Scope, milestones, and acceptance criteria are defined in the proposal before work starts.",
    ],
  },
  {
    title: "Client responsibilities",
    body: [
      "You agree to provide timely feedback, access, and decisions needed to keep the project moving. Delays on your side may shift the agreed timeline.",
    ],
  },
  {
    title: "Payments",
    body: [
      "Invoices are due within the period stated on each invoice. Work begins after the agreed deposit or first payment is received. Late payments may pause active work.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "Once the final invoice is paid in full, ownership of the deliverable code transfers to you. We retain the right to reuse generic, non-client-specific patterns and to list the project in our portfolio unless agreed otherwise.",
    ],
  },
  {
    title: "Confidentiality",
    body: [
      "We keep your business information, data, and strategy confidential. We don't share project details without written permission, except where required by law.",
    ],
  },
  {
    title: "Warranties & liability",
    body: [
      "We deliver work to the agreed specification using reasonable professional care. Our total liability for any claim is limited to the amount you paid for the relevant project in the preceding three months. We're not liable for indirect or consequential damages.",
    ],
  },
  {
    title: "Termination",
    body: [
      "Either party can end a project with written notice. You pay for work completed up to the termination date, and deliverables for paid work are handed over.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of Indonesia. Any disputes are resolved in the courts of Jakarta.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      label="Legal · terms"
      title={
        <>
          Terms<span className="text-accent">.</span>
        </>
      }
      intro={`The terms that apply when we build software together. In plain language, not legalese.`}
      sections={sections}
    />
  );
}
