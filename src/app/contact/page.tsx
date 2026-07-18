import type { Metadata } from "next";
import { financeEmail } from "@/data/financing";
import { youtubeUrl } from "@/data/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="blueprint-grid">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Start the deployment."
            lede="Facility operators, robotics companies, and everyone in between — tell us what you're working with."
          />
          <div className="mt-12 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Financing inquiries</p>
              <a href={`mailto:${financeEmail}`} className="mt-1 block font-mono text-sm text-cardinal-600 hover:text-cardinal-700">
                {financeEmail}
              </a>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Watch the fleet</p>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-mono text-sm text-body hover:text-navy">
                YouTube ↗
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}><ContactForm /></Reveal>
      </div>
    </main>
  );
}
