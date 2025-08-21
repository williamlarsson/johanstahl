import Layout from "@/components/Layout";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Link as MuiLink,
  Container,
} from "@mui/material";
import Link from "next/link";

export default function Contact() {
  return (
    <Layout>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Representation */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                mb: 4,
              }}
            >
              Representation
            </Typography>

            <Box sx={{ color: "grey.300" }}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 600, color: "white", mb: 1 }}
                >
                  THIRSTY FILM
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <MuiLink
                    component={Link}
                    href="https://thirstyfilm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "primary.light",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    thirstyfilm.com
                  </MuiLink>
                </Typography>
              </Box>

              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 600, color: "white", mb: 1 }}
                >
                  REVERSE
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <MuiLink
                    component={Link}
                    href="https://reverse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "primary.light",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    reverse.com
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                mb: 4,
              }}
            >
              Contact
            </Typography>

            <Box sx={{ color: "grey.300" }}>
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    color: "grey.400",
                    fontWeight: 500,
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  Skype
                </Box>
                <Box sx={{ color: "white" }}>johanstahlw</Box>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    color: "grey.400",
                    fontWeight: 500,
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  Website
                </Box>
                <MuiLink
                  component={Link}
                  href="https://johanstahl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.light",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  johanstahl.com
                </MuiLink>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    color: "grey.400",
                    fontWeight: 500,
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  Email
                </Box>
                <MuiLink
                  component={Link}
                  href="mailto:johan@johanstahl.com"
                  sx={{
                    color: "primary.light",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  johan@johanstahl.com
                </MuiLink>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
