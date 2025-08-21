"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";
import VideoPlayer from "./VideoPlayer";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

interface PortfolioGridProps {
  items: PortfolioItem[];
  title?: string;
}

export default function PortfolioGrid({ items, title }: PortfolioGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(
    null
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [loadingVideos, setLoadingVideos] = useState<Set<number>>(new Set());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVideoClick = (item: PortfolioItem) => {
    setSelectedVideo(item);
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setSelectedVideo(null);
  };

  // Create short preview video URL (3 seconds)
  const createPreviewUrl = (vimeoId: number): string => {
    return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&color=92948e&title=0&byline=0&portrait=0&controls=0&duration=3`;
  };

  // Handle hover start with delay
  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(index);
      setLoadingVideos((prev) => new Set([...prev, index]));
    }, 300); // 300ms delay before loading preview
  };

  // Handle hover end
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredItem(null);
    setLoadingVideos(new Set());
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Container sx={{ px: { lg: 4 }, maxWidth: "none !important" }}>
        <Grid container spacing={4}>
          {items.map((item, index) => {
            // Calculate grid size based on position in the pattern
            const patternIndex = index % 3; // 0 = full, 1 = half, 2 = half
            const isFull = patternIndex === 0;
            const isHovered = hoveredItem === index;
            const isLoading = loadingVideos.has(index);
            const videoId = item.vimeoId || null;

            return (
              <Grid
                key={`${item.title}-${index}`}
                size={{
                  xs: 12,
                  md: isFull ? 12 : 6,
                  lg: isFull ? 12 : 6,
                }}
              >
                <Card
                  sx={{
                    bgcolor: "grey.900",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      background:
                        "linear-gradient(0deg, black -50%, transparent)",
                    },
                  }}
                  onClick={() => handleVideoClick(item)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Box sx={{ position: "relative", aspectRatio: "16/9" }}>
                    {/* Use our own image instead of Vimeo thumbnail */}
                    <CardMedia
                      component="img"
                      image={`/img/${item.image}`}
                      alt={item.title}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    {/* Short video preview on hover */}
                    {isHovered && videoId && !isLoading && (
                      <Box
                        component="iframe"
                        src={createPreviewUrl(videoId)}
                        sx={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          display: "block",
                        }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        onLoad={() => {
                          // Remove from loading state when iframe loads
                          setLoadingVideos((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(index);
                            return newSet;
                          });
                        }}
                      />
                    )}

                    {/* Text overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                          "linear-gradient(0, black -50%, transparent)",
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        textAlign: "center",
                        p: 2,
                        zIndex: 2,
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          mb: 1,
                          fontSize: { xs: "1.5rem", md: "2.25rem" },
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </Typography>
                      {item.client && (
                        <Typography
                          variant="h6"
                          sx={{
                            color: "grey.300",
                            fontSize: { xs: "1.5rem", md: "2rem" },
                          }}
                        >
                          {item.client}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <VideoPlayer
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        video={selectedVideo}
      />
    </Box>
  );
}
