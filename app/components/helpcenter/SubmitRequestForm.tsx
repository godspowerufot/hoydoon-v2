"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown, ChevronRight, Loader2, Paperclip, Sparkles, X } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "Select an issue type" },
  { value: "General Inquiry", label: "General inquiry" },
  {
    value: "I'm seeking to update my contact details",
    label: "Update my contact details",
  },
  { value: "Assistance", label: "Technical assistance" },
  {
    value: "I'm an agent and I'm unable to edit my listings",
    label: "Agent — can't edit listings",
  },
  {
    value: "My listing was flagged for review",
    label: "Listing flagged for review",
  },
];

const RELATED_ARTICLES = [
  {
    title: "How do I report a problem with a listing?",
    slug: "report-listing-problem",
  },
  {
    title: "Do I need a real estate agent to buy a home?",
    slug: "do-i-need-real-estate-agent",
  },
  {
    title: "Rental scams: how to spot and avoid them",
    slug: "avoid-rental-scams",
  },
  {
    title: "Common home-buying mistakes to avoid",
    slug: "avoid-home-buying-mistakes",
  },
  {
    title: "What to do if a listing has incorrect information",
    slug: "report-incorrect-listing",
  },
];

const fieldClass =
  "w-full rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-3 text-sm text-[#2a2a33] outline-none transition-colors focus:border-primary focus:bg-white md:text-base";

const labelClass = "mb-2 block text-sm font-medium text-[#2a2a33]";

export default function SubmitRequestForm() {
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [listingInfo, setListingInfo] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [browser, setBrowser] = useState("");
  const [listingLink, setListingLink] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const showForm = category && category !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showForm) {
      toast.error("Please choose an issue type.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("category", category);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("description", description);

    if (category === "I'm seeking to update my contact details") {
      formData.append("listingInfo", listingInfo);
    }
    if (category === "Assistance") {
      formData.append("appVersion", appVersion);
      formData.append("browser", browser);
    }
    if (category === "I'm an agent and I'm unable to edit my listings") {
      formData.append("listingLink", listingLink);
    }

    let totalSize = 0;
    attachments.forEach((file) => {
      totalSize += file.size;
      formData.append("attachments", file);
    });

    if (totalSize > 6 * 1024 * 1024) {
      toast.error("Total file size exceeds 6MB limit.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/submit-request", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Submission failed");

      toast.success("Request submitted successfully!");
      setCategory("");
      setEmail("");
      setSubject("");
      setDescription("");
      setListingInfo("");
      setAppVersion("");
      setBrowser("");
      setListingLink("");
      setAttachments([]);
    } catch {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const filtered = selected.filter((file) => allowedTypes.includes(file.type));
    const newAttachments = [...attachments, ...filtered];
    const totalSize = newAttachments.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > 6 * 1024 * 1024) {
      toast.error("Total file size exceeds 6MB.");
      return;
    }
    if (newAttachments.length > 10) {
      toast.error("You can upload a maximum of 10 files.");
      return;
    }
    setAttachments(newAttachments);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)] md:p-8"
      >
        <h2 className="font-heading text-xl font-semibold text-[#111] md:text-2xl">
          Tell us what you need
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#5c5c66] md:text-base">
          Choose your issue type and share as much detail as you can. Our team
          usually responds within one business day.
        </p>

        <div className="mt-8">
          <label htmlFor="issue-type" className={labelClass}>
            Issue type
          </label>
          <div className="relative">
            <select
              id="issue-type"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${fieldClass} appearance-none pr-10`}
              required
            >
              {CATEGORIES.map((item) => (
                <option key={item.value || "empty"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a8a]"
              aria-hidden="true"
            />
          </div>
        </div>

        {showForm ? (
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your request"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                Description
              </label>
              <textarea
                id="description"
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include any listing links, steps to reproduce, or other details that will help us assist you."
                className={`${fieldClass} resize-none`}
              />
            </div>

            {category === "I'm seeking to update my contact details" ? (
              <div>
                <label htmlFor="listing-info" className={labelClass}>
                  Listing address and name to verify ownership
                </label>
                <textarea
                  id="listing-info"
                  rows={4}
                  value={listingInfo}
                  onChange={(e) => setListingInfo(e.target.value)}
                  className={`${fieldClass} resize-none`}
                />
              </div>
            ) : null}

            {category === "Assistance" ? (
              <>
                <div>
                  <label htmlFor="app-version" className={labelClass}>
                    App version (iOS or Android)
                  </label>
                  <input
                    id="app-version"
                    type="text"
                    value={appVersion}
                    onChange={(e) => setAppVersion(e.target.value)}
                    placeholder="e.g. iOS 17.4 / Android 14"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="browser" className={labelClass}>
                    Browser (if on web)
                  </label>
                  <input
                    id="browser"
                    type="text"
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                    placeholder="e.g. Chrome, Safari"
                    className={fieldClass}
                  />
                </div>
              </>
            ) : null}

            {category === "I'm an agent and I'm unable to edit my listings" ? (
              <div>
                <label htmlFor="listing-link" className={labelClass}>
                  Listing address or link
                </label>
                <input
                  id="listing-link"
                  type="text"
                  value={listingLink}
                  onChange={(e) => setListingLink(e.target.value)}
                  placeholder="Paste the listing URL or address"
                  className={fieldClass}
                />
              </div>
            ) : null}

            <div>
              <label className={labelClass}>Attachments (optional)</label>
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8d8d8] bg-[#f7f7f8] px-4 py-8 text-center transition-colors hover:border-primary hover:bg-[#f3fbfb]"
              >
                <Paperclip className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="mt-2 text-sm font-medium text-[#2a2a33]">
                  Add files or drop them here
                </span>
                <span className="mt-1 text-xs text-[#8a8a8a]">
                  JPG, PNG, GIF, or PDF · Max 6MB total · Up to 10 files
                </span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>

              {attachments.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {attachments.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-[#ececec] bg-white px-3 py-2 text-sm text-[#5c5c66]"
                    >
                      <span className="truncate pr-2">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="shrink-0 text-[#8a8a8a] hover:text-[#111]"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60 md:w-auto md:min-w-[180px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit request"
              )}
            </button>
          </div>
        ) : null}
      </form>

      <aside className="lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)]">
          <div className="relative bg-[#0f3d40] px-6 py-7 md:px-7 md:py-8">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(9,133,141,0.35),transparent_55%)]"
              aria-hidden="true"
            />
            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  Before you submit
                </p>
                <h3 className="mt-1 font-heading text-xl font-semibold leading-snug text-white md:text-2xl">
                  Helpful articles
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Your answer might already be in the help center. Check these
                  guides first.
                </p>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-[#ececec] px-2 py-2">
            {RELATED_ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/article/${article.slug}`}
                  className="group flex items-start gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-[#f7f7f8]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3fbfb] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug text-[#2a2a33] transition-colors group-hover:text-primary md:text-[15px]">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-xs text-[#8a8a8a]">
                      3 min read
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-[#ececec] bg-[#f7f7f8] px-6 py-5">
            <Link
              href="/helpcenter"
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] bg-white text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
            >
              Browse all articles
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
