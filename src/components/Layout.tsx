"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/archive", label: "Archive" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black", color: "white" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 50,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  cursor: "pointer",
                }}
              >
                <Box sx={{ position: "relative", width: 48, height: 48 }}>
                  <Image
                    src="/img/logo.png"
                    alt="Johan Stahl"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "grey.400",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Director
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Johan Stahl
                  </Typography>
                </Box>
              </Box>
            </Link>

            {/* Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      color: pathname === item.href ? "white" : "grey.400",
                      borderBottom:
                        pathname === item.href ? "1px solid white" : "none",
                      "&:hover": {
                        color: "grey.300",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Button sx={{ color: "white" }}>
                <Box component="span" sx={{ fontSize: 24 }}>
                  ☰
                </Box>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ pt: 10 }}>
        {children}
      </Box>
    </Box>
  );
}
