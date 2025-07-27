import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import workData from "@/data/work.json";
import { PortfolioItem } from "@/types/portfolio";

export default function HomePage() {
  const workItems: PortfolioItem[] = workData as PortfolioItem[];

  return (
    <Layout>
      <HeroSection />
      <PortfolioGrid items={workItems} title="FEATURED WORK" />
    </Layout>
  );
}
