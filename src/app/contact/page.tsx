import { Box, Typography, Container, Grid } from "@mui/material";
import Link from "next/link";

export default function Contact() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pb: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: "100px" }}>
        {/* Main Title */}

        <Grid container spacing={8} alignItems="flex-start">
          {/* Representation Section */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                animation: "fadeIn 0.8s 0.4s ease-in-out forwards",
                opacity: 0,
                "@keyframes fadeIn": {
                  "0%": { opacity: "0" },
                  "100%": { opacity: "1" },
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                  mb: 4,
                  textTransform: "uppercase",
                  textDecoration: "underline",
                }}
              >
                REPRESENTED BY
              </Typography>

              {/* Thirsty Film */}
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", mb: 1, fontSize: "1.125rem" }}
                >
                  Niels Kau | Executive Producer
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: 1,
                    fontSize: "1.25rem",
                  }}
                >
                  THIRSTY FILM
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", mb: 1, fontSize: "1.125rem" }}
                >
                  COPENHAGEN | STOCKHOLM | HELSINKI | SHANGHAI
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", mb: 1, fontSize: "1.125rem" }}
                >
                  +45 28 45 04 03
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", fontSize: "1.125rem" }}
                >
                  <Link
                    href="mailto:niels@thirsty.film"
                    style={{
                      color: "inherit",
                      textDecoration: "underline",
                    }}
                  >
                    niels@thirsty.film
                  </Link>
                </Typography>
              </Box>

              {/* US Representation */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: 2,
                    fontSize: "1.25rem",
                  }}
                >
                  US Representation:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", mb: 1, fontSize: "1.125rem" }}
                >
                  Thibaut Estellon | Executive Producer
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: 1,
                    fontSize: "1.25rem",
                  }}
                >
                  REVERSE
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", mb: 1, fontSize: "1.125rem" }}
                >
                  <Link
                    href="mailto:thibaut@thisisreverse.com"
                    style={{
                      color: "inherit",
                      textDecoration: "underline",
                    }}
                  >
                    thibaut@thisisreverse.com
                  </Link>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.300", fontSize: "1.125rem" }}
                >
                  <Link
                    href="https://www.thisisreverse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                      textDecoration: "underline",
                    }}
                  >
                    www.Thisisreverse.com
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Contact Info Section */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                animation: "fadeIn 0.8s 0.6s ease-in-out forwards",
                opacity: 0,
                "@keyframes fadeIn": {
                  "0%": { opacity: "0" },
                  "100%": { opacity: "1" },
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                  mb: 4,
                  textTransform: "uppercase",
                  textDecoration: "underline",
                }}
              >
                CONTACT INFO
              </Typography>

              {/* Contact Details */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      mb: 1,
                      fontSize: "1.25rem",
                    }}
                  >
                    Website
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "grey.300", fontSize: "1.125rem" }}
                  >
                    <Link
                      href="https://www.johanstahl.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "inherit",
                        textDecoration: "underline",
                      }}
                    >
                      www.johanstahl.com
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      mb: 1,
                      fontSize: "1.25rem",
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "grey.300", fontSize: "1.125rem" }}
                  >
                    <Link
                      href="mailto:mail@johanstahl.com"
                      style={{
                        color: "inherit",
                        textDecoration: "underline",
                      }}
                    >
                      mail@johanstahl.com
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
