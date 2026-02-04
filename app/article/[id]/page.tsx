import GridLayout from "../../components/articles/layouts/GridLayout";
import HelpCenterLayout from "../../components/articles/layouts/HelpCenterLayout";

import { slugify } from "@/utils";
import articles from "../../data/articles.json"; // or fetch from API

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articles.find((a) => slugify(a.title) === id);

  if (!article) return <div>Article not found</div>;

  const { layoutType } = article;

  const renderLayout = () => {
    switch (layoutType) {
      case "general":
        return <GridLayout pageData={article} />;
      case "listing":
        return <HelpCenterLayout PageData={article} />;

      default:
        return <div>No layout defined</div>;
    }
  };

  return <>{renderLayout()}</>;
}
