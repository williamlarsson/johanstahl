import Layout from "@/components/Layout";
import Image from "next/image";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import Link from "next/link";

export default function About() {
  // Sample image data - you can replace these with actual images from the REVERSE website
  const itemData = [
    {
      img: "/img/about/about-1.jpeg",
      title: "Newport Beach",
      cols: 2,
      rows: 2,
    },
    {
      img: "/img/about/about-2.jpeg",
      title: "RBC Bank",
      cols: 1,
      rows: 1,
    },
    {
      img: "/img/about/about-3.jpeg",
      title: "Röyksopp",
      cols: 1,
      rows: 1,
    },
    {
      img: "/img/about/about-4.jpeg",
      title: "Lexus",
      cols: 1,
      rows: 1,
    },
    {
      img: "/img/about/about-5.gif",
      title: "Stay Forever",
      cols: 1,
      rows: 1,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: { xs: 12, md: 8 }, // Extra top padding on small screens to avoid nav
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="flex-start">
          {/* Bio Column */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ color: "grey.300", lineHeight: 1.8 }}>
              <Typography
                variant="h3"
                sx={{ color: "white", mb: 4, fontWeight: 600 }}
              >
                Johan Stahl
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.125rem" }}>
                Some of Johan&apos;s earliest memories as a young boy revolve
                around his captivation with cinema and storytelling. Following
                that passion, Johan worked for eight years in the television
                business, honing his skills by directing, writing, and producing
                some of the most successful award-winning comedy shows and
                documentaries for Danish Broadcasting, featuring fun and offbeat
                segments with Dolph Lundgren, Ice-T, and Arnold Schwarzenegger.
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.125rem" }}>
                Today, as a sought-after global commercial director, Johan
                displays an intuitive sense for creating a character-driven
                universe, often packed with VFX, and infused with a light comic
                touch. These qualities, combined with a strong visual
                sensibility and the ability to naturally tell emotional,
                fast-paced stories, make Johan a truly captivating and versatile
                director.
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.125rem" }}>
                His spot, &quot;The Power of Ideas,&quot; for the Newport Beach
                Film Festival was nominated for Shots&apos; Best Online
                Commercial of the Year 2020 alongside work by other acclaimed
                directors, such as Spike Jonze, Martin de Thurah, Dougal Wilson,
                and Rupert Sanders. It went on to win a Gold Pencil at The One
                Club&apos;s One Screen Film Festival for Best Fiction Film of
                the year.
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.125rem" }}>
                Johan has directed seminal campaigns for Lexus, Kohler, IKEA,
                Cadbury&apos;s, Royal Bank of Canada, Shell, Orange, and
                Carlsberg. As a world traveler, Johan likes to call Copenhagen,
                Denmark home.
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

          {/* Notable Works Column */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ color: "grey.300" }}>
              <Typography
                variant="h4"
                sx={{ color: "white", mb: 4, fontWeight: 600 }}
              >
                Notable Works
              </Typography>

              <List
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="Newport Beach"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="RBC Bank"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="Röyksopp"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="Lexus"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="Stay Forever"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="Bravo Tours"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary="Chamber of Labour"
                    primaryTypographyProps={{
                      variant: "h6",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* Image List */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ color: "grey.300" }}>
              <ImageList
                sx={{
                  width: "100%",
                  height: 450,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
                variant="masonry"
                cols={3}
                gap={8}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={400}
                      height={300}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "auto",
                      }}
                      priority={false}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
