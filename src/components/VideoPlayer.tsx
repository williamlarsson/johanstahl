"use client";

import { useEffect } from "react";
import { PortfolioItem } from "@/types/portfolio";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  video: PortfolioItem | null;
}

export default function VideoPlayer({
  isOpen,
  onClose,
  video,
}: VideoPlayerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close video
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!video || !isOpen) return null;

  // Check if video has a vimeoId
  if (!video.vimeoId) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "black",
          zIndex: 1300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
            },
            zIndex: 10,
            width: 48,
            height: 48,
          }}
          aria-label="Close video player"
        >
          <Close sx={{ fontSize: 24 }} />
        </IconButton>

        <Typography variant="h5" sx={{ color: "white", textAlign: "center" }}>
          Video not available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "black",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Close button - top right */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bgcolor: "black",
          zIndex: 20,
          p: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
            },
            width: 48,
            height: 48,
          }}
          aria-label="Close video player"
        >
          <Close sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      {/* Video container - full screen */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0&color=92948e&dnt=1&transparent=0`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              zIndex: 3,
              position: "relative",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            data-webkitallowfullscreen="true"
            data-mozallowfullscreen="true"
          />
        </Box>
      </Box>

      {/* Video info - top left overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bgcolor: "transparent",
          p: 3,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Box sx={{ textAlign: "left", maxWidth: "lg" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: "white",
              fontSize: { xs: "1.5rem", md: "2.125rem" },
            }}
          >
            {video.title}
          </Typography>
          {video.client && (
            <Typography
              variant="h6"
              sx={{
                color: "grey.300",
                mb: 2,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              {video.client}
            </Typography>
          )}
          {video.info && (
            <Typography
              variant="body1"
              sx={{
                color: "grey.300",
                maxWidth: "md",
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              {video.info}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
