"use client";

import { useEffect } from "react";
import { PortfolioItem } from "@/types/portfolio";
import { Box, Typography, IconButton, Modal, Paper } from "@mui/material";
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

  if (!video) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -48,
            right: 0,
            color: "white",
            "&:hover": { color: "grey.300" },
            zIndex: 10,
          }}
        >
          <Close />
        </IconButton>

        <Paper
          sx={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            bgcolor: "transparent",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              position: "relative",
              aspectRatio: "16/9",
              bgcolor: "black",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: video.embed }}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 1, color: "white" }}
            >
              {video.title}
            </Typography>
            {video.client && (
              <Typography variant="h6" sx={{ color: "grey.400", mb: 2 }}>
                {video.client}
              </Typography>
            )}
            {video.info && (
              <Typography
                variant="body1"
                sx={{
                  color: "grey.300",
                  maxWidth: "md",
                  mx: "auto",
                }}
              >
                {video.info}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
