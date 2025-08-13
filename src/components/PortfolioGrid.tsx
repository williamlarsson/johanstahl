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

  // Extract video ID from iframe embed string
  const extractVideoId = (embed: string): string | null => {
    const match = embed.match(/video\/(\d+)/);
    return match ? match[1] : null;
  };

  // Create Vimeo poster image URL
  const createPosterUrl = (videoId: string): string => {
    return `https://vumbnail.com/${videoId}_large.jpg`;
  };

  // Create short preview video URL (3 seconds)
  const createPreviewUrl = (videoId: string): string => {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&color=92948e&title=0&byline=0&portrait=0&controls=0&duration=3`;
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
      {title && (
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "white" }}>
            {title}
          </Typography>
        </Box>
      )}

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {items.map((item, index) => {
            // Calculate grid size based on position in the pattern
            const patternIndex = index % 3; // 0 = full, 1 = half, 2 = half
            const isFull = patternIndex === 0;
            const isHovered = hoveredItem === index;
            const isLoading = loadingVideos.has(index);
            const videoId = item.embed ? extractVideoId(item.embed) : null;

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
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                  onClick={() => handleVideoClick(item)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Box sx={{ position: "relative", aspectRatio: "16/9" }}>
                    {/* Vimeo poster image as thumbnail */}
                    {videoId && (!isHovered || isLoading) && (
                      <CardMedia
                        component="img"
                        height={isFull ? 400 : 300}
                        image={createPosterUrl(videoId)}
                        alt={item.title}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}

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

                    {/* Fallback to original image if no video */}
                    {!videoId && (
                      <CardMedia
                        component="img"
                        height={isFull ? 400 : 300}
                        image={`/img/${item.image}`}
                        alt={item.title}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
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
                        bgcolor: isHovered
                          ? "transparent"
                          : "rgba(0, 0, 0, 0.7)",
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
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </Typography>
                      {item.client && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "grey.300",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          {item.client}
                        </Typography>
                      )}
                    </Box>

                    {/* Play button overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0, 0, 0, 0.3)",
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          backdropFilter: "blur(4px)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.3)",
                          },
                        }}
                      >
                        <PlayArrow sx={{ color: "white", fontSize: 32 }} />
                      </IconButton>
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
