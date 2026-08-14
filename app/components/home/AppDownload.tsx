"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { getAppDownloadLink, getPhoneTypeLinks } from "@/utils";
import { HomeContainer } from "./Section";

export default function AppDownload() {
  const stores = getPhoneTypeLinks();
  const [downloadUrl, setDownloadUrl] = useState("https://www.hoydoon.com/download");
  const [storeLink, setStoreLink] = useState(stores.iphone);

  useEffect(() => {
    setDownloadUrl(`${window.location.origin}/download`);
    setStoreLink(getAppDownloadLink());
  }, []);

  return (
    <section className="pb-16 md:pb-24" aria-labelledby="app-heading">
      <HomeContainer>
        <div className="overflow-hidden rounded-3xl bg-[#0e3d40] text-white">
          <div className="grid items-center gap-10 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Mobile app
              </p>
              <h2
                id="app-heading"
                className="mt-3 text-3xl font-semibold leading-tight md:text-4xl"
              >
                Get alerts the moment the right home appears
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                Save searches, follow listings, and hear from agents on iOS or
                Android, without refreshing a browser tab.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={stores.iphone}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200 hover:opacity-90"
                >
                  <Image
                    src="/app1.svg"
                    alt="Download on the App Store"
                    width={140}
                    height={42}
                    className="h-11 w-auto"
                  />
                </Link>
                <Link
                  href={stores.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200 hover:opacity-90"
                >
                  <Image
                    src="/app2.svg"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="h-11 w-auto"
                  />
                </Link>
                <Link
                  href={storeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-[#0e3d40] transition-colors duration-200 hover:bg-[#f3f3f3] md:hidden"
                >
                  Download the app
                </Link>
              </div>
            </div>

            <div className="hidden items-center justify-center gap-6 md:flex">
              <div className="rounded-2xl bg-white p-4">
                <QRCodeSVG
                  value={downloadUrl}
                  size={168}
                  level="H"
                  includeMargin={false}
                />
                <p className="sr-only">
                  QR code linking to the Hoydoon app download page
                </p>
              </div>
              <p className="max-w-[9rem] text-sm leading-relaxed text-white/70">
                Scan to open the download page on your phone.
              </p>
            </div>
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
