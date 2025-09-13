"use client";

import { useState } from "react";
import { PortfolioItem } from "@/types/portfolio";
import VideoPlayer from "./VideoPlayer";
import { Typography, Box, CardMedia, Container, Grid } from "@mui/material";

interface PortfolioGridProps {
  items: PortfolioItem[];
  title?: string;
}

export default function PortfolioGrid({ items, title }: PortfolioGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(
    null
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoClick = (item: PortfolioItem) => {
    setSelectedVideo(item);
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Box sx={{ py: { xs: 12, lg: 18 } }}>
      <Container sx={{ px: { lg: 4 }, maxWidth: "none !important" }}>
        <Grid container spacing={4}>
          {items.map((item, index) => {
            // Simple pattern: full width, then half-half
            const patternIndex = index % 3;
            const isFull = patternIndex === 0;

            return (
              <Grid
                key={`${item.title}-${index}`}
                size={{
                  xs: 12,
                  md: isFull ? 12 : 6,
                }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    aspectRatio: "16/9",
                  }}
                  onClick={() => handleVideoClick(item)}
                >
                  {item.video ? (
                    <Box
                      component="video"
                      src={`/short_videos/${item.video}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
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
                      gap: 1,
                      background: "linear-gradient(0, black -50%, transparent)",
                      opacity: { xs: 0.8, md: 0.5 },
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

                        fontSize: {
                          xs: "1.25rem",
                          sm: "1.5rem",
                        },
                        letterSpacing: "4px",
                        fontWeight: 100,
                      }}
                    >
                      {item.title.toUpperCase()}
                    </Typography>

                    {item.client && (
                      <Typography
                        variant="h6"
                        sx={{
                          color: "grey.300",
                          fontSize: {
                            xs: "1rem",
                            sm: "1.25rem",
                          },
                          letterSpacing: "4px",
                          fontWeight: 100,
                        }}
                      >
                        {item.client.toUpperCase()}
                      </Typography>
                    )}
                  </Box>
                </Box>
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
