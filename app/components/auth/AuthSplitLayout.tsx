"use client";

import SplitScreenLayout from "@/app/components/common/SplitScreenLayout";

type AuthSplitLayoutProps = {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  quote?: string;
  children: React.ReactNode;
};

export default function AuthSplitLayout(props: AuthSplitLayoutProps) {
  return <SplitScreenLayout {...props} />;
}
