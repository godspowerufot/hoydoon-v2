import {
  LegalPageLayout,
  PRIVACY_CONTENT,
} from "../components/legal";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      content={PRIVACY_CONTENT}
      relatedHref="/terms"
      relatedLabel="Terms of use"
    />
  );
}
