import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", md: "5rem" },
            fontWeight: "bold",
            color: "white",
            mb: 4,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 600,
            color: "grey.300",
            mb: 4,
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "grey.400",
            mb: 6,
            maxWidth: "md",
            mx: "auto",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist. It might have
          been moved, deleted, or you entered the wrong URL.
        </Typography>
        <Button
          component={Link}
          href="/"
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
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}
