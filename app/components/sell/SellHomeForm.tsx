"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

const fieldClass =
  "w-full rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-3 text-sm text-[#2a2a33] outline-none transition-colors focus:border-primary focus:bg-white md:text-base";

const labelClass = "mb-2 block text-sm font-medium text-[#2a2a33]";

type SellHomeFormProps = {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SellHomeForm({
  fullName,
  setFullName,
  email,
  setEmail,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  description,
  setDescription,
  submitting,
  onSubmit,
}: SellHomeFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)] md:p-8"
    >
      <h2 className="font-heading text-xl font-semibold text-[#111] md:text-2xl">
        Tell us about your property
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#5c5c66] md:text-base">
        Share a few details and we&apos;ll connect you with local agents who
        know your market. Free consultation, no obligation.
      </p>

      <div className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="sell-name" className={labelClass}>
              Full name
            </label>
            <input
              id="sell-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="First and last name"
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="sell-email" className={labelClass}>
              Email address
            </label>
            <input
              id="sell-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="sell-address" className={labelClass}>
            Property address
          </label>
          <input
            id="sell-address"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city, state"
            autoComplete="street-address"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="sell-phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="sell-phone"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Your phone number"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="sell-notes" className={labelClass}>
            Additional details
          </label>
          <textarea
            id="sell-notes"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Timeline, property type, preferred contact method, or anything else that will help an agent assist you."
            className={`${fieldClass} resize-none`}
          />
        </div>

        <p className="text-xs leading-relaxed text-[#8a8a8a]">
          By submitting, you agree that Hoydoon, its affiliates, or associated
          third parties may contact you. See our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60 md:w-auto md:min-w-[220px]"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Get matched with an agent"
          )}
        </button>
      </div>
    </form>
  );
}
