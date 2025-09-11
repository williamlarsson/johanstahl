"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  console.log("🔍 pathname → ", pathname);
  const [navOpacity, setNavOpacity] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    // Fade in navigation after 1 second
    const timer = setTimeout(() => {
      setNavOpacity(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { href: "/", label: "Featured Work" },
    { href: "/all-work", label: "All Work" },
    { href: "/narrative-music", label: "Narrative & Music Videos" },
    { href: "/about", label: "About" },
    // { href: "/contact", label: "Contact" },
  ];

  const navIsActive = (href: string) => {
    return pathname.replaceAll("/", "") === href.replaceAll("/", "");
  };

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          zIndex: 50,
          opacity: navOpacity,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3, pt: 0.5 }}>
          {/* Logo - Left side */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
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
            </Box>
          </Link>

          {/* Navigation - Right side */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    color: navIsActive(item.href) ? "white" : "grey.400",
                    borderBottom: navIsActive(item.href)
                      ? "2px solid white"
                      : "2px solid transparent",
                    borderRadius: 0,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "grey.300",
                      borderBottom: "2px solid grey.500",
                    },
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Mobile menu button - Right side */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={handleMobileMenuOpen} sx={{ color: "white" }}>
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(10px)",
            width: 280,
            border: "none",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
              Menu
            </Typography>
          </Box>

          <List sx={{ mt: 2 }}>
            {navItems.map((item) => (
              <ListItem
                key={item.href}
                component={Link}
                href={item.href}
                onClick={handleMobileMenuClose}
                sx={{
                  color: navIsActive(item.href) ? "white" : "grey.400",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  borderLeft: navIsActive(item.href)
                    ? "3px solid white"
                    : "3px solid transparent",
                  py: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderLeft: "3px solid grey.500",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main">{children}</Box>
    </Box>
  );
}
