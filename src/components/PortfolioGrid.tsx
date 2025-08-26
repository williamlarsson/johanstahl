"use client";

import { useState } from "react";
import { PortfolioItem } from "@/types/portfolio";
import VideoPlayer from "./VideoPlayer";
import { Typography, Box, Card, CardMedia, Container } from "@mui/material";

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
        {/* CSS Grid Container */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2 },
            gridAutoRows: "minmax(250px, auto)",
          }}
        >
          {items.map((item, index) => {
            // Create a pattern for visual variety
            // Mix of different sizes: 2×2, 2×1, 1×2, and 1×1
            const patternIndex = index % 8;
            let gridArea;
            if (patternIndex === 0 || patternIndex === 4) {
              // Large items: 2 columns × 2 rows
              gridArea = {
                // border: "1px solid red",
                animationDelay: "0.2s",
                gridColumn: {
                  xs: "span 1",
                  sm: "span 2",
                  md: "span 2",
                  lg: "span 2",
                },
                gridRow: {
                  xs: "span 1",
                  sm: "span 2",
                  md: "span 2",
                  lg: "span 3",
                },
              };
            } else if (patternIndex === 1 || patternIndex === 5) {
              // Wide items: 2 columns × 1 row (landscape)
              gridArea = {
                // border: "1px solid yellow",
                animationDelay: "0.1s",
                gridColumn: {
                  xs: "span 1",
                  sm: "span 2",
                  md: "span 2",
                  lg: "span 2",
                },
                gridRow: "span 2",
              };
            } else if (patternIndex === 2 || patternIndex === 6) {
              // Tall items: 1 column × 2 rows (portrait)
              gridArea = {
                // border: "1px solid green",
                animationDelay: "0.3s",
                gridColumn: "span 2",
                gridRow: {
                  xs: "span 1",
                  sm: "span 2",
                  md: "span 2",
                  lg: "span 3",
                },
              };
            } else {
              // Small items: 1 column × 1 row
              gridArea = {
                // border: "1px solid blue",
                animationDelay: "0.2s",
                gridColumn: "span 2",
                gridRow: "span 3",
              };
            }

            return (
              <Card
                key={`${item.title}-${index}`}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  // borderRadius: 2,
                  opacity: 0,
                  animation: "fadeIn 0.5s ease-in-out forwards",
                  "@keyframes fadeIn": {
                    "0%": {
                      opacity: "0",
                    },
                    "100%": {
                      opacity: "1",
                    },
                  },
                  ...gridArea,
                }}
                onClick={() => handleVideoClick(item)}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`/img/${item.image}`}
                    alt={item.title}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      minHeight: "200px",
                      flex: 1,
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
                        mb: 1,
                        fontSize: {
                          xs: "1.25rem",
                          sm: "1.5rem",
                          md: "1.75rem",
                          lg: "2rem",
                        },
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.title}
                    </Typography>
                    {item.client && (
                      <Typography
                        variant="h6"
                        sx={{
                          color: "grey.300",
                          fontSize: {
                            xs: "1rem",
                            sm: "1.25rem",
                            md: "1.5rem",
                            lg: "1.75rem",
                          },
                          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {item.client}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Container>

      <VideoPlayer
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        video={selectedVideo}
      />
    </Box>
  );
}
