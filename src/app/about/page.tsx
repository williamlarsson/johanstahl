import Layout from "@/components/Layout";
import Image from "next/image";
import { Box, Typography, Grid, Button, Paper, Container } from "@mui/material";
import Link from "next/link";

export default function About() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="flex-start">
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ position: "relative", mb: 4 }}>
              <Image
                src="/img/johan.jpeg"
                alt="Johan Stahl"
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ color: "grey.300", lineHeight: 1.8 }}>
              <Typography variant="body1" sx={{ mb: 3, fontSize: "1.125rem" }}>
                Johan Stahl is a Danish director and creative force in the world
                of advertising and filmmaking. With over two decades of
                experience, Johan has established himself as one of the most
                sought-after directors in the industry, known for his unique
                visual style and ability to tell compelling stories.
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, fontSize: "1.125rem" }}>
                His work spans across commercials, music videos, and branded
                content, collaborating with major brands and artists worldwide.
                Johan&apos;s distinctive approach combines cinematic
                storytelling with innovative visual techniques, creating
                memorable and impactful content that resonates with audiences.
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, fontSize: "1.125rem" }}>
                Based in Copenhagen, Johan continues to push creative boundaries
                and inspire the next generation of filmmakers and creatives in
                the industry.
              </Typography>

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
        </Grid>
      </Container>
    </Box>
  );
}
