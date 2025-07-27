import Layout from "@/components/Layout";
import PortfolioGrid from "@/components/PortfolioGrid";
import archiveData from "@/data/archive.json";
import { PortfolioItem } from "@/types/portfolio";

export default function ArchivePage() {
  const archiveItems: PortfolioItem[] = archiveData as PortfolioItem[];

  return (
    <Layout>
      <PortfolioGrid items={archiveItems} title="ARCHIVE" />
    </Layout>
  );
}
