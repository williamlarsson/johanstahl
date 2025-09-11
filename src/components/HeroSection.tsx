"use client";

import { useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function HeroSection() {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://player.vimeo.com/video/294533749?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.border = "none";
      iframe.allow = "autoplay; fullscreen";

      videoElement.appendChild(iframe);

      return () => {
        if (videoElement) {
          videoElement.innerHTML = "";
        }
      };
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <Box
        ref={videoRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", md: "4.5rem" },
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Johan Stahl
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            color: "grey.200",
            mb: 4,
          }}
        >
          Director & Creative Filmmaker
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            View Portfolio
          </Button>
        </Box>
      </Box>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateX(-50%) translateY(0)",
            },
            "40%": {
              transform: "translateX(-50%) translateY(-10px)",
            },
            "60%": {
              transform: "translateX(-50%) translateY(-5px)",
            },
          },
        }}
      >
        <KeyboardArrowDown sx={{ color: "white", fontSize: 24 }} />
      </Box>
    </Box>
  );
}
