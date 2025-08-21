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
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

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
                  color: pathname === item.href ? "white" : "grey.400",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  py: 2,
                  "&:hover": {
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.05)",
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
