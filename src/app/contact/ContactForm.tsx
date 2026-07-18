"use client";
import { useState } from "react";
import { financeEmail } from "@/data/financing";

const INTERESTS = ["Rent robots", "Servicing", "Financing", "Other"];
const inputCls =
  "w-full rounded border border-line bg-panel px-4 py-3 text-sm text-navy placeholder:text-muted focus:border-cardinal-500 focus:outline-none transition-colors duration-150";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-line bg-panel p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-status">Message received</p>
        <p className="mt-4 text-navy">Thanks. We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={inputCls} />
        <input name="company" required placeholder="Company" aria-label="Company" className={inputCls} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Work email" aria-label="Work email" className={inputCls} />
        <input name="role" placeholder="Role" aria-label="Role" className={inputCls} />
      </div>
      <select name="interest" required defaultValue="" aria-label="I'm interested in" className={inputCls}>
        <option value="" disabled>I&apos;m interested in…</option>
        {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
      </select>
      <textarea name="message" required rows={5} placeholder="Tell us about your facility, fleet, or company." aria-label="Message" className={inputCls} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-cardinal-500 px-6 py-3.5 font-display text-sm font-medium text-navy transition-colors duration-150 hover:bg-cardinal-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-cardinal-600">
          Something went wrong sending your message. Email us directly at{" "}
          <a href={`mailto:${financeEmail}`} className="underline">{financeEmail}</a>.
        </p>
      )}
    </form>
  );
}
