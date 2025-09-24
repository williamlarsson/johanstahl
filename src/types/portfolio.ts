export interface PortfolioItem {
  title: string;
  client: string;
  image: string;
  video?: string;
  vimeoId?: number;
  embed?: string;
  info: string;
}

export interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  video: PortfolioItem | null;
}
