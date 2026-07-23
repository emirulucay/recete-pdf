"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuoteLogo } from "@/components/quote-logo";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  Coins,
  FileDown,
  Building2,
  CheckCircle2,
  ChevronDown,
  Coffee,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FEATURES = [
  {
    icon: Zap,
    title: "Zero Setup & Instant",
    description: "No signup, no passwords, no login walls. Create and download clean quotes in under 30 seconds.",
  },
  {
    icon: Globe,
    title: "Multi-Language & Currency",
    description: "Switch seamlessly between English & Turkish, and format totals in ₺ TRY, $ USD, € EUR, or £ GBP.",
  },
  {
    icon: FileDown,
    title: "Pixel-Perfect A4 PDFs",
    description: "Export crisp, vector-rendered A4 PDF documents optimized for single-page print and client sharing.",
  },
  {
    icon: Coins,
    title: "Custom Tax Rates",
    description: "Flexible tax management for any location — support for KDV, Sales Tax, GST, Stopaj, MwSt, and custom taxes.",
  },
  {
    icon: Building2,
    title: "Multi-Profile Storage",
    description: "Save multiple company or freelancer profiles, logos, and contact details directly inside your browser.",
  },
  {
    icon: ShieldCheck,
    title: "100% Private & Local",
    description: "Your financial data and client information never touch a server. All data stays strictly in your browser.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Set Language & Currency",
    description: "Choose your preferred locale, currency symbol, and custom tax rules.",
  },
  {
    number: "02",
    title: "Add Client & Line Items",
    description: "Enter your client's name, services, quantity, and unit prices with live preview.",
  },
  {
    number: "03",
    title: "Export & Share PDF",
    description: "Download your clean, professional A4 PDF invoice instantly with a single click.",
  },
];

const FAQS = [
  {
    q: "Is Quote completely free to use?",
    a: "Yes! Quote is 100% free and open-source. There are no hidden fees, paywalls, or subscription tiers.",
  },
  {
    q: "Do I need to create an account or log in?",
    a: "No registration is required. You can open the app and start generating invoices immediately.",
  },
  {
    q: "Is my financial and client data secure?",
    a: "Absolutely. All your data, saved profiles, and custom preferences are stored locally in your browser's LocalStorage. Nothing is sent to any external server.",
  },
  {
    q: "Can I add custom taxes for my country?",
    a: "Yes, you can add custom tax names and percentage rates (e.g. Sales Tax 8.875%, GST 5%, MwSt 19%, Stopaj 20%) and save them for future use.",
  },
];

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-primary font-plex selection:bg-accent/15 selection:text-accent">

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <QuoteLogo className="h-7 w-auto" />
            </Link>
          </div>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2.5">
            <a
              href="https://github.com/emirulucay/quote"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-border bg-surface hover:bg-muted transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Star on GitHub</span>
            </a>

            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              <span>Open App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-28 overflow-hidden border-b border-border/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold mb-5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast, Minimalist & 100% Free Quote Generator</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.2]"
          >
            Create Professional Quotes & Invoices <span className="text-accent underline decoration-accent/30 underline-offset-6 font-semibold">in Seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-normal"
          >
            No registration needed. Multi-language, multi-currency support with instant pixel-perfect A4 PDF exports.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Create Quote Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://github.com/emirulucay/quote"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface text-primary text-sm font-semibold hover:bg-muted transition-all"
            >
              <GithubIcon className="w-4 h-4 text-muted-foreground" />
              <span>View Source Code</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Registration Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Currency & Language
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Browser Storage Privacy
            </span>
          </motion.div>
        </div>

        {/* Interactive / Visual App Preview Mockup */}
        <div className="max-w-5xl mx-auto px-4 mt-14 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden p-2 sm:p-4 bg-linear-to-b from-surface to-muted/30"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/40 rounded-t-xl mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] opacity-70">quote.emirulucay.com/app</span>
              <div className="w-12" />
            </div>

            {/* Mock Quote Document Teaser */}
            <div className="p-6 sm:p-10 bg-white rounded-lg border border-border shadow-inner max-w-2xl mx-auto text-left font-plex">
              <div className="flex justify-between items-start border-b border-border pb-6 mb-6">
                <div>
                  <h2 className="text-xl font-bold tracking-widest text-primary">SERVICE SUMMARY</h2>
                  <p className="text-xs text-muted-foreground font-mono mt-1">23.07.2026</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">Recete Studio</p>
                  <p className="text-xs text-muted-foreground">contact@recetestudio.com</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold uppercase text-muted-foreground">ATTN</p>
                <p className="text-base font-semibold text-primary">Muhammet Bilal Apaydın</p>
              </div>

              <table className="w-full text-xs text-left mb-6">
                <thead>
                  <tr className="border-b-2 border-primary font-bold text-primary">
                    <th className="pb-2">SERVICE</th>
                    <th className="pb-2 text-center">QTY</th>
                    <th className="pb-2 text-right">PRICE</th>
                    <th className="pb-2 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2.5 font-medium">UI/UX Design & Branding Package</td>
                    <td className="py-2.5 text-center font-mono">1</td>
                    <td className="py-2.5 text-right font-mono">$1,500.00</td>
                    <td className="py-2.5 text-right font-mono font-bold">$1,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Frontend React & Next.js Development</td>
                    <td className="py-2.5 text-center font-mono">1</td>
                    <td className="py-2.5 text-right font-mono">$2,200.00</td>
                    <td className="py-2.5 text-right font-mono font-bold">$2,200.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end border-t border-primary pt-4 text-right">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">GRAND TOTAL</p>
                  <p className="text-xl font-bold font-mono text-primary">$3,700.00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 md:py-28 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Built for Speed & Simplicity
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Everything you need to send clean, professional quotes to your clients without cumbersome setup or subscription fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl border border-border bg-background hover:border-accent/40 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Three Simple Steps to Your PDF
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              No complex forms or bloated dashboards. Create and export clean documents in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-surface relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-mono font-bold text-accent mb-4 block opacity-80">{step.number}</span>
                  <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all cursor-pointer shadow-md"
            >
              <span>Try It Right Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Everything you need to know about Quote and how it handles your data.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-border rounded-xl bg-background overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-base text-primary cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-accent" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-foreground mb-4">
            Ready to Send Your Next Quote?
          </h2>
          <p className="text-base text-primary-foreground/80 max-w-xl mx-auto mb-8 font-normal">
            Create clean, professional PDF quotes in seconds. No credit card, no sign-up required.
          </p>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface text-primary font-semibold text-sm shadow-lg hover:bg-surface/90 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Open Generator App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <QuoteLogo className="h-5 w-auto" />
            <span>© {new Date().getFullYear()} Quote. Open-source & Free.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <a
              href="https://github.com/emirulucay/quote"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://buymeacoffee.com/emirulucay"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Coffee className="w-3.5 h-3.5" /> Buy Me a Coffee
            </a>
            <span>Crafted with care by Emir Uluçay</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
