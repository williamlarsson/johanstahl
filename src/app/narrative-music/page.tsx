import Layout from "@/components/Layout";
import PortfolioGrid from "@/components/PortfolioGrid";
import narrativeMusicData from "@/data/narrative-music.json";
import { PortfolioItem } from "@/types/portfolio";

export default function NarrativeMusicPage() {
  const narrativeMusicItems: PortfolioItem[] =
    narrativeMusicData as PortfolioItem[];

  return (
    <Layout>
      <PortfolioGrid
        items={narrativeMusicItems}
        title="NARRATIVE & MUSIC VIDEOS"
      />
    </Layout>
  );
}
