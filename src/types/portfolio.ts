export interface PortfolioItem {
  title: string;
  client: string;
  image: string;
  embed: string;
  info: string;
  size: "full" | "half";
}

export interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  video: PortfolioItem | null;
}
