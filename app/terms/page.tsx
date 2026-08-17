import {
  LegalPageLayout,
  TERMS_CONTENT,
} from "../components/legal";

export default function TermsPage() {
  return (
    <LegalPageLayout
      content={TERMS_CONTENT}
      relatedHref="/policy"
      relatedLabel="Privacy policy"
    />
  );
}
