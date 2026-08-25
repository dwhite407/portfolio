import type { Metadata } from "next";
import { ContactCard } from "@/components/renderers/ContactCard";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~</span>
        <span className="text-term-text">$ contact</span>
      </div>
      <ContactCard />
    </div>
  );
}
