"use client";

import { useState } from "react";
import { PortfolioItem } from "@/types/portfolio";
import VideoPlayer from "./VideoPlayer";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";

interface PortfolioGridProps {
  items: PortfolioItem[];
  title?: string;
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
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
    <Box sx={{ py: 8 }}>
      <Container sx={{ px: { lg: 4 }, maxWidth: "none !important" }}>
        <Grid container spacing={4}>
          {items.map((item, index) => {
            // Calculate grid size based on position in the pattern
            const patternIndex = index % 3; // 0 = full, 1 = half, 2 = half
            const isFull = patternIndex === 0;

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
                    cursor: "pointer",
                  }}
                  onClick={() => handleVideoClick(item)}
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
