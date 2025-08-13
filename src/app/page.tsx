"use client";
import frontpageData from "@/data/frontpage.json";
import { PortfolioItem } from "@/types/portfolio";
import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const VideoContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: "opacity 1.5s ease, filter 1.5s ease, transform 1.5s ease",
});

const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const CarouselSection = styled(Box)({
  position: "relative",
  height: "100vh",
  width: "100%",
});

const CarouselContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
});

const VideoInfo = styled(Box)({
  position: "absolute",
  bottom: 48,
  left: 48,
  color: "white",
  zIndex: 10,
  transition: "opacity 0.3s ease, filter 0.3s ease",
  "&.fade-out": {
    opacity: 0,
    filter: "blur(8px)",
  },
  "&.fade-in": {
    opacity: 1,
    filter: "blur(0px)",
  },
});

const NumberIndicator = styled(Box)({
  position: "absolute",
  bottom: 48,
  right: 48,
  color: "white",
  zIndex: 10,
});

const IntroOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  transition: "opacity 2s ease",
});

const MaskedVideo = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 15,
});

const IntroSVG = styled("svg")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 25,
  "& rect": {
    fill: "white",
  },
  "& > rect": {
    WebkitMask: "url(#mask)",
    mask: "url(#mask)",
  },
});

export default function HomePage() {
  const frontpageItems: PortfolioItem[] = useMemo(
    () => frontpageData as PortfolioItem[],
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isInitialLoad = useRef(true);
  const [showIntro, setShowIntro] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1000,
    height: 400,
  });
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Fade out overlay over 1 second
    const overlayTimer = setTimeout(() => {
      setOverlayOpacity(0);
    }, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(overlayTimer);
    };
  }, []);

  useEffect(() => {
    // Hide intro after 3 seconds
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          prevIndex === frontpageItems.length - 1 ? 0 : prevIndex + 1;
        console.log("Auto-advancing from", prevIndex, "to", newIndex);
        // Mark that initial load is complete after first auto-advance
        if (isInitialLoad.current) {
          isInitialLoad.current = false;
        }
        return newIndex;
      });
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, frontpageItems.length]);

  // Handle video playback when current index changes
  useEffect(() => {
    console.log("Current index changed to:", currentIndex);

    // Skip video manipulation on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Pause all videos first
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef && index !== currentIndex) {
        videoRef.pause();
        videoRef.currentTime = 0; // Reset to beginning
      }
    });

    // Play the current video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      // Only reset time if the video was paused (meaning it's a new selection)
      if (currentVideo.paused) {
        currentVideo.currentTime = 0; // Reset to beginning
      }
      currentVideo.play().catch((error) => {
        console.log("Autoplay failed:", error);
      });
    }

    // Load the next video when current index changes
    const nextIndex = (currentIndex + 1) % frontpageItems.length;
    if (!loadedVideos.has(nextIndex)) {
      setLoadedVideos((prev) => new Set([...prev, nextIndex]));
    }
  }, [currentIndex, frontpageItems.length, loadedVideos]);

  // Load all videos progressively
  useEffect(() => {
    const loadAllVideos = async () => {
      for (let i = 1; i < frontpageItems.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Load with 1 second delay
        setLoadedVideos((prev) => new Set([...prev, i]));
      }
    };

    loadAllVideos();
  }, [frontpageItems.length]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black", color: "white" }}>
      {/* Black overlay to hide flicker */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "black",
          opacity: overlayOpacity,
          transition: "opacity 1s ease-in-out",
          pointerEvents: "none",
          zIndex: 30,
        }}
      />

      {/* Intro Overlay with SVG Masking */}
      <IntroOverlay
        sx={{
          opacity: showIntro ? 1 : 0,
          pointerEvents: showIntro ? "auto" : "none",
          background: "transparent",
          filter: "invert(1)",
        }}
      >
        {/* Masked Video Background */}
        <MaskedVideo>
          <VideoElement
            src={`/videos/${frontpageItems[0].video}`}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </MaskedVideo>

        {/* SVG Mask */}
        <IntroSVG
          viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="mask" x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <text
                x={windowDimensions.width / 2}
                y={windowDimensions.height / 2}
                textAnchor="middle"
                fontSize="10vw"
                fontWeight="900"
                fill="black"
              >
                JOHAN STAHL
              </text>
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" />
        </IntroSVG>
      </IntroOverlay>

      {/* Video Carousel */}
      <CarouselSection>
        <CarouselContainer>
          {/* All Videos - rendered but conditionally visible */}
          {frontpageItems.map((item, index) => (
            <VideoContainer
              key={index}
              sx={{
                opacity: index === currentIndex ? 1 : 0,
                filter: index === currentIndex ? "blur(0px)" : "blur(12px)",
                zIndex: index === currentIndex ? 1 : 0,
                display: loadedVideos.has(index) ? "block" : "none",
              }}
            >
              <VideoElement
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={`/videos/${item.video}`}
                loop
                muted
                playsInline
                onLoadStart={() => {
                  if (index === 0) {
                    console.log("First video loading started");
                  }
                }}
                onCanPlay={() => {
                  console.log(`Video ${index + 1} can play`);
                  // Autoplay the first video when it's ready
                  if (index === 0 && currentIndex === 0) {
                    const video = videoRefs.current[index];
                    if (video) {
                      video.play().catch((error) => {
                        console.log("First video autoplay failed:", error);
                      });
                    }
                  }
                }}
              />
            </VideoContainer>
          ))}

          {/* Number Indicator */}
          <NumberIndicator>
            <Stack direction="row" spacing={2}>
              {frontpageItems.map((_, index) => (
                <Typography
                  key={index}
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: "3rem",
                    cursor: "pointer",
                    color:
                      index === currentIndex
                        ? "white"
                        : "rgba(255, 255, 255, 0.5)",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </Typography>
              ))}
            </Stack>
          </NumberIndicator>

          {/* Video Info - All items rendered but conditionally visible */}
          {frontpageItems.map((item, index) => (
            <VideoInfo
              key={index}
              sx={{
                opacity: index === currentIndex ? 1 : 0,
                filter: index === currentIndex ? "blur(0px)" : "blur(8px)",
                transition: "opacity 1.4s ease, filter 1.4s ease",
                zIndex: index === currentIndex ? 10 : 0,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: "3.5rem",
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {item.client}
              </Typography>
            </VideoInfo>
          ))}
        </CarouselContainer>
      </CarouselSection>
    </Box>
  );
}
