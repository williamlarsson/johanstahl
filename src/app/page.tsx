"use client";
import frontpageData from "@/data/frontpage.json";
import { PortfolioItem } from "@/types/portfolio";
import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import VideoPlayer from "@/components/VideoPlayer";

const videoTransitionTimer = 2000;
const slideDuration = 5000;
const introDuration = 1700;

const VideoContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: `opacity ${videoTransitionTimer}ms ease, filter ${videoTransitionTimer}ms ease, transform ${videoTransitionTimer}ms ease`,
});

const VideoElement = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const CarouselSection = styled(Box)({
  position: "relative",
  height: "100dvh",
  width: "100%",
});

const CarouselContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
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
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0]));
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(
    null
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isInitialLoad = useRef(true);
  const [showIntro, setShowIntro] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1000,
    height: 400,
  });
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  // Add CSS keyframes for text animation
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInScale {
        0% {
          opacity: 0;
          transform: scale(0.9);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleVideoClick = (index: number) => {
    console.log("=== VIDEO CLICK DEBUG ===");
    console.log("Clicked index:", index);
    console.log("Selected video:", frontpageItems[index]);
    console.log("Video title:", frontpageItems[index]?.title);
    console.log("Video client:", frontpageItems[index]?.client);
    console.log("Video vimeoId:", frontpageItems[index]?.vimeoId);
    console.log("========================");
    setSelectedVideo(frontpageItems[index]);
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setSelectedVideo(null);
  };

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
    // Hide intro after introDuration and start video carousel
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, introDuration);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || showIntro) return; // Don't start carousel while intro is showing

    const interval = setInterval(() => {
      setCurrentIndex((prevCurrentIndex) => {
        const newIndex =
          prevCurrentIndex === frontpageItems.length - 1
            ? 0
            : prevCurrentIndex + 1;
        console.log("Auto-advancing from", prevCurrentIndex, "to", newIndex);
        // Update prevIndex state
        setPrevIndex(prevCurrentIndex);
        // Mark that initial load is complete after first auto-advance
        if (isInitialLoad.current) {
          isInitialLoad.current = false;
        }
        return newIndex;
      });
    }, slideDuration); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, showIntro, frontpageItems.length]); // Added showIntro to dependencies

  // Handle video playback when current index changes
  useEffect(() => {
    console.log("Current index changed to:", currentIndex);

    // Skip video manipulation on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Play the current video immediately
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
    // Delay video manipulation to coordinate with CSS transitions
    const videoTimer = setTimeout(() => {
      // Reset the previous video
      if (prevIndex !== currentIndex) {
        const prevVideo = videoRefs.current[prevIndex];
        if (prevVideo) {
          prevVideo.pause();
          prevVideo.currentTime = 0; // Reset to beginning
        }
      }
    }, videoTransitionTimer); // Use the transition timer for coordination

    // Load the next video when current index changes
    const nextIndex = (currentIndex + 1) % frontpageItems.length;
    if (!loadedVideos.has(nextIndex)) {
      setLoadedVideos((prev) => new Set([...prev, nextIndex]));
    }

    return () => clearTimeout(videoTimer);
  }, [currentIndex, prevIndex, frontpageItems.length, loadedVideos]);

  // Load videos progressively - only run once
  useEffect(() => {
    const loadVideosProgressively = async () => {
      // Start with first video already loaded
      const videosToLoad = [];
      for (let i = 1; i < frontpageItems.length; i++) {
        videosToLoad.push(i);
      }

      // Load videos one by one with delay
      for (const index of videosToLoad) {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 second delay
        setLoadedVideos((prev) => new Set([...prev, index]));
      }
    };

    loadVideosProgressively();
  }, [frontpageItems.length]); // Run when frontpageItems.length changes

  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        // iOS-specific: prevent bottom navigation from expanding
        height: "-webkit-fill-available",
        minHeight: "-webkit-fill-available",
        overflow: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
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
            src={`/featured_videos/${frontpageItems[0].video}`}
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
                y={
                  windowDimensions.height / 2 -
                  Math.min(
                    windowDimensions.width * 0.08,
                    windowDimensions.height * 0.12
                  )
                }
                textAnchor="middle"
                fontSize={Math.min(
                  windowDimensions.width * 0.08,
                  windowDimensions.height * 0.14
                )}
                fontWeight="400"
                fill="black"
                style={{
                  opacity: 0,
                  transformOrigin: "center",
                  animation: "fadeInScale 0.6s ease-out 0.2s forwards",
                  fontFamily: "var(--font-playfair-display), serif",
                  letterSpacing: "0.05em",
                }}
              >
                DIRECTOR
              </text>
              <text
                x={windowDimensions.width / 2}
                y={
                  windowDimensions.height / 2 +
                  Math.min(
                    windowDimensions.width * 0.08,
                    windowDimensions.height * 0.12
                  )
                }
                textAnchor="middle"
                fontSize={Math.min(
                  windowDimensions.width * 0.14,
                  windowDimensions.height * 0.22
                )}
                fontWeight="400"
                fill="black"
                style={{
                  opacity: 0,
                  transformOrigin: "center",
                  animation: "fadeInScale 0.6s ease-out 0.4s forwards",
                  fontFamily: "var(--font-bebas-neue), sans-serif",
                  letterSpacing: "0.05em",
                }}
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
          {/* Only render videos that are loaded or needed */}
          <Box>
            {frontpageItems.map((item, index) => {
              // Always render current video, and next video if loaded
              const shouldRender =
                index === currentIndex ||
                (loadedVideos.has(index) &&
                  index === (currentIndex + 1) % frontpageItems.length);

              if (!shouldRender) return null;

              return (
                <VideoContainer
                  key={index}
                  sx={{
                    opacity: index === currentIndex ? 1 : 0,
                    filter: index === currentIndex ? "blur(0px)" : "blur(20px)",
                    cursor: "pointer",
                    transition: "all 1s ease",
                  }}
                  onClick={() => handleVideoClick(index)}
                >
                  <VideoElement
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={`/featured_videos/${item.video}`}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    autoPlay={index === 0}
                    onCanPlay={() => {
                      // Ensure first video plays when ready
                      if (index === 0 && currentIndex === 0) {
                        const video = videoRefs.current[index];
                        if (video && video.paused) {
                          video.play().catch((error) => {
                            console.log("First video autoplay failed:", error);
                          });
                        }
                      }
                    }}
                  />
                </VideoContainer>
              );
            })}
          </Box>
          {/* Video Info - All items rendered but conditionally visible */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 32, md: 48 },
              left: { xs: 32, md: 48 },
              width: { xs: "calc(100vw - 64px)", md: "50%" },
              height: { xs: 80, md: 200 },
              zIndex: 10,
            }}
          >
            {frontpageItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  color: "white",
                  zIndex: 10,
                  "&.fade-out": {
                    opacity: 0,
                    filter: "blur(8px)",
                  },
                  "&.fade-in": {
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  opacity: index === currentIndex ? 1 : 0,
                  filter: index === currentIndex ? "blur(0px)" : "blur(8px)",
                  transition: "opacity 1.4s ease, filter 1.4s ease",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 300,
                    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                    mb: 1,
                    fontFamily: "var(--font-playfair-display), serif",
                  }}
                >
                  {item.client}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Number Indicator */}

          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              position: "absolute",
              bottom: { xs: 112, md: 48 },
              right: { xs: "auto", md: 48 },
              left: { xs: 32, md: "auto" },
              color: "white",
              zIndex: 10,
            }}
          >
            {frontpageItems.map((_, index) => (
              <Typography
                key={index}
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
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
                  setPrevIndex(currentIndex);
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
              >
                {(index + 1).toString().padStart(2, "0")}
              </Typography>
            ))}
          </Stack>
        </CarouselContainer>
      </CarouselSection>

      {/* Video Player */}
      <VideoPlayer
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        video={selectedVideo}
      />
    </Box>
  );
}
