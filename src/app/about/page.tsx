import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const contentSections = [
    {
      text: "Some of Johan's earliest memories as a young boy revolve around his captivation with cinema and storytelling. Following that passion, Johan worked for eight years in the television business, honing his skills by directing, writing, and producing some of the most successful award-winning comedy shows and documentaries for Danish Broadcasting, featuring fun and offbeat segments with Dolph Lundgren, Ice-T, and Arnold Schwarzenegger.",
      image: "/img/about/about-1.jpeg",
      imageAlt: "Johan Stahl early career",
    },
    {
      text: "Today, as a sought-after global commercial director, Johan displays an intuitive sense for creating a character-driven universe, often packed with VFX, and infused with a light comic touch. These qualities, combined with a strong visual sensibility and the ability to naturally tell emotional, fast-paced stories, make Johan a truly captivating and versatile director.",
      image: "/img/about/about-2.jpeg",
      imageAlt: "Johan Stahl directing",
    },
    {
      text: "His spot, \"The Power of Ideas,\" for the Newport Beach Film Festival was nominated for Shots' Best Online Commercial of the Year 2020 alongside work by other acclaimed directors, such as Spike Jonze, Martin de Thurah, Dougal Wilson, and Rupert Sanders. It went on to win a Gold Pencil at The One Club's One Screen Film Festival for Best Fiction Film of the year.",
      image: "/img/about/about-3.jpeg",
      imageAlt: "Newport Beach Film Festival",
    },
    {
      text: "Johan has directed seminal campaigns for Lexus, Kohler, IKEA, Cadbury's, Royal Bank of Canada, Shell, Orange, and Carlsberg. As a world traveler, Johan likes to call Copenhagen, Denmark home.",
      image: "/img/about/about-4.jpeg",
      imageAlt: "Johan Stahl campaigns",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: { xs: 12, md: 18 },
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        {/* Content Sections with Images */}
        {contentSections.map((section, index) => (
          <Grid
            container
            spacing={6}
            sx={{ mb: 6 }}
            key={index}
            alignItems="center"
            direction={{
              xs: "column",
              md: index % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            <Grid
              size={{ xs: 12, lg: 6 }}
              sx={{
                p: 8,
                animation: "fadeIn 0.8s 0.2s ease-in-out forwards",
                opacity: 0,
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: "0",
                  },
                  "100%": {
                    opacity: "1",
                  },
                },
              }}
            >
              <Image
                src={section.image}
                alt={section.imageAlt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // optional
              />
            </Grid>
            <Grid
              size={{ xs: 12, lg: 6 }}
              sx={{
                animation: "fadeIn 0.8s 0.4s ease-in-out forwards",
                opacity: 0,
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: "0",
                  },
                  "100%": {
                    opacity: "1",
                  },
                },
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "1.125rem" }}>
                {section.text}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {/* Download Button */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              component={Link}
              href="/uploads/2017/04/DIRECTOR-BIO-JOHAN-STAHL.pdf"
              variant="contained"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                color: "white",
                px: 3,
                py: 1.5,
                borderRadius: "50px",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Download Full Biography
            </Button>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
