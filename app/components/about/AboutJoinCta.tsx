import Link from "next/link";
import Image from "next/image";
import { HomeContainer } from "../home/Section";

export default function AboutJoinCta() {
  return (
    <section className="pb-16 md:pb-24" aria-labelledby="about-join-heading">
      <HomeContainer>
        <div className="grid overflow-hidden rounded-3xl bg-[#0f3d40] md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
              Join the community
            </p>
            <h2
              id="about-join-heading"
              className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
            >
              Your next chapter starts here
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
              Download the app, create your account, and become part of a trusted
              community where real estate is built on honesty, ease, and human
              connection.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/sign-up"
                className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0f3d40] transition-colors hover:bg-white/90"
              >
                Create free account
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px] md:min-h-full">
            <Image
              src="/new-image/about-3.jpg"
              alt="Couple planning their move in a bright living room"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[50%_30%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0f3d40] via-transparent to-transparent md:from-[#0f3d40]/80"
              aria-hidden="true"
            />
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
