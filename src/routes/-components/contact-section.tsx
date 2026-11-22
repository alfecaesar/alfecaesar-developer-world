
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import SectionShell from "@/components/section-shell.tsx";
import {
  CONTACT_DETAILS,
  CONTACT_FORM,
  type ContactItem,
} from "@/lib/contact.ts";
import { cn } from "@/lib/utils.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTACT_ICONS: Record<ContactItem["icon"], LucideIcon | typeof LinkedInIcon> = {
    mail: Mail,
    phone: Phone,
    "map-pin": MapPin,
    linkedin: LinkedInIcon,
  };

type FormStatus = "idle" | "loading" | "success" | "error";

function LinkedInIcon({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.46H4.95V9.03h2.98v9.43ZM6.44 7.74a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46Zm12.02 10.72h-2.98v-4.59c0-1.09-.02-2.49-1.52-2.49-1.52 0-1.75 1.18-1.75 2.41v4.67H9.23V9.03h2.86v1.29h.04c.4-.74 1.37-1.52 2.82-1.52 3.01 0 3.57 1.98 3.57 4.55v5.11Z" />
      </svg>
    );
  }

function GithubIcon({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.6 10.6 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    );
  }

function ContactCard({
  contact,
  index,
}: {
  contact: ContactItem;
  index: number;
}) {
  const Icon = CONTACT_ICONS[contact.icon];
  const isExternal = contact.icon === "linkedin" || contact.icon === "mail";
  const isClickable = Boolean(contact.href);

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background/70 text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
          <Icon className="size-5" strokeWidth={1.8} />
        </div>

        {isClickable && (
          <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        )}
      </div>

      <div className="pt-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {contact.label}
        </p>

        <p
          className={cn(
            "break-words pt-1.5 text-sm font-semibold tracking-tight text-foreground",
            contact.icon === "mail" && "break-all",
          )}
        >
          {contact.value}
        </p>
      </div>
    </>
  );

  const className = cn(
    "group flex min-h-[130px] flex-col rounded-2xl border bg-card/60 p-4 backdrop-blur transition-all duration-300 sm:p-5",
    isClickable &&
      "cursor-pointer hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: EASE,
      }}
    >
      {isClickable ? (
        <a
          href={contact.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          aria-label={`${contact.label}: ${contact.value}`}
          className={className}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </motion.div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch(CONTACT_FORM.action, {
        method: CONTACT_FORM.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClassName =
    "h-11 w-full rounded-xl border border-border bg-background/70 px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClassName =
    "mb-2 block text-xs font-semibold text-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="rounded-[1.75rem] border bg-card/60 p-5 backdrop-blur sm:p-7"
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Contact Form
        </div>

        <h3 className="pt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
          Send Me a Message
        </h3>

        <p className="pt-2 text-sm leading-6 text-muted-foreground">
          Have a project, opportunity, or question? Fill out the form and
          I'll get back to you.
        </p>
      </div>

      <form
        action={CONTACT_FORM.action}
        method={CONTACT_FORM.method}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClassName}>
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              required
              disabled={status === "loading"}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClassName}>
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="john@example.com"
              autoComplete="email"
              required
              disabled={status === "loading"}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClassName}>
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="How can I help you?"
            required
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClassName}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me a little about your project or inquiry..."
            rows={5}
            required
            disabled={status === "loading"}
            className="w-full resize-y rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* Honeypot field for basic spam protection */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>
              Your message has been sent successfully. Thanks for reaching
              out!
            </p>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>
              Something went wrong while sending your message. Please try
              again or email me directly.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              Sending Message
              <LoaderCircle className="size-4 animate-spin" />
            </>
          ) : status === "success" ? (
            <>
              Send Another Message
              <ArrowUpRight className="size-4" />
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="// get in touch"
      title="Let's Work Together"
      intro="Have a project in mind or looking for an experienced developer to join your team? I'd be happy to hear from you."
    >
      <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {CONTACT_DETAILS.map((contact, index) => (
              <ContactCard
                key={contact.label}
                contact={contact}
                index={index}
              />
            ))}
          </div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-5 rounded-2xl border bg-card/60 p-5 backdrop-blur"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Prefer Email?
            </p>

            <a
              href="mailto:alfecaesar@gmail.com"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              alfecaesar@gmail.com
              <ArrowUpRight className="size-3.5" />
            </a>
          </motion.div> */}
        </div>

        <ContactForm />
      </div>
    </SectionShell>
  );
}
