import Layout from "@/components/Layout";
import PortfolioGrid from "@/components/PortfolioGrid";
import workData from "@/data/work.json";
import { PortfolioItem } from "@/types/portfolio";

export default function WorkPage() {
  const workItems: PortfolioItem[] = workData as PortfolioItem[];

  return (
    <Layout>
      <PortfolioGrid items={workItems} title="WORK" />
    </Layout>
  );
}
