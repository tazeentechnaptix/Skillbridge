"use client"

import { useState, useEffect, useRef } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Card,
} from "@mui/material"
import { styled, keyframes } from "@mui/system"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { FaRoad, FaRobot, FaLaptopCode, FaChartLine } from "react-icons/fa"

// Define custom font
const theme = createTheme({
  typography: {
    fontFamily: "Anaheim, Arial, sans-serif",
  },
})

// Inject @font-face rule
const GlobalStyles = styled("style")(() => ({
  "@font-face": {
    fontFamily: "Anaheim",
    src: "url('/Anaheim.ttf') format('truetype')",
  },
}))
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`
const parallax = keyframes`
  0% { background-position: center top; }
  // 100% { background-position: center bottom; }
`

// Full-height section with dynamic background image and parallax effect
const FullHeightSection = styled("section")(() => ({
  height: "100vh",
  width: "100%",
  backgroundImage: `url(/main.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  position: "relative",
  animation: `${parallax} 10s ease-in-out infinite alternate`,
  backgroundAttachment: "fixed", // This ensures the parallax effect works well
  display: "flex", // Flexbox to position content easily
  justifyContent: "center", // Horizontally center content
  alignItems: "center", // Vertically center content
  color: "#fff", // Default font color for text
  textAlign: "center", // Center align text
  "@media (max-width: 1200px)": {
    backgroundImage: `url(/main1.png)`,
    animation: `${parallax} 5s ease-in-out infinite alternate`,
  },
}))
const TextBox = styled("div")(() => ({
  position: "absolute", // Position the text box relative to the section
  left: "5%", // Default left position for large screens
  top: "60%", // Default top position (vertically centered for large screens)
  transform: "translateY(-50%)", // Adjust for vertical centering
  padding: "20px 40px", // Spacing inside the box
  borderRadius: "8px", // Rounded corners
  fontSize: "1.75rem", // Font size for better visibility
  fontWeight: "600", // Thicker font weight
  maxWidth: "40%", // Prevent the box from being too wide
  height: "auto", // Allow height to adjust based on content
  maxHeight: "80vh", // Maximum height to ensure it doesn't overflow the screen
  overflow: "hidden", // Hide any content that exceeds max height

  // Media queries for responsiveness
  "@media (max-width: 1200px)": {
    left: "10%", // Center the text box horizontally on smaller screens
    top: "10%", // Move the text box to the top
    transform: "none", // Remove transform to prevent centering
    maxWidth: "90%", // Wider box for smaller screens
    fontSize: "2.3rem", // Adjust font size for medium screens
  },

  "@media (max-width: 650px)": {
    left: "10%", // Center the text box horizontally on smaller screens
    top: "10%", // Move the text box to the top
    transform: "none", // Remove transform to prevent centering
    maxWidth: "90%", // Wider box for smaller screens
    fontSize: "1.3rem", // Smaller font size for better readability on smaller screens
  },

  "@media (max-width: 380px)": {
    left: "10%", // Keep the text box aligned
    top: "10%", // Position the text box near the top
    transform: "none", // No vertical centering on smaller screens
    maxWidth: "90%", // Take up more width for very small screens
    fontSize: "1rem", // Smaller font size for very small screens
  },
}))

// Styled components
const Navbar = styled(AppBar)(({ isTransparent }) => ({
  backgroundColor: isTransparent ? "transparent" : "#2b6777",
  transition: "background-color 0.3s ease-in-out",
  boxShadow: isTransparent ? "none" : "0px 4px 6px rgba(0, 0, 0, 0.1)",
}))

const LoginButton = styled(Button)(({ inHome }) => ({
  borderRadius: "20px",
  padding: "8px 20px",
  fontWeight: "bold",
  fontSize: "17px",
  backgroundColor: inHome ? "rgba(255, 255, 255, 0.8)" : "#f5f5f5",
  color: inHome ? "#2b6777" : "#2b6777",
  border: "1px solid #2b6777",
  "&:hover": {
    backgroundColor: "#2b6777",
    color: "#fff",
  },
}))

const Section = styled("section")(() => ({
  padding: "80px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #e1eef6, #ffffff)",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 1.2)",
}))

const SectionContent = styled(Container)(() => ({
  maxWidth: "1200px",
}))

const SectionHeading = styled(Typography)(() => ({
  fontSize: "4rem",
  fontWeight: "bold",
  marginBottom: "40px",
  color: "#2b6777",
  textAlign: "center",
}))

const ImageWrapper = styled("div")(() => ({
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
  borderRadius: "10px",
  overflow: "hidden",
}))

const Footer = styled("footer")(() => ({
  backgroundColor: "#2b6777",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
}))

const App = () => {
  const [navbarTransparent, setNavbarTransparent] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setNavbarTransparent(sectionId === "Home")
          }
        })
      },
      { threshold: 0.7 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div>
        <Navbar position="fixed" isTransparent={navbarTransparent}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <img src="skillbridge.png" alt="Logo" style={{ height: "80px", objectFit: "contain" }} />
            </Typography>

            {isMobile ? (
              <>
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <MenuIcon sx={{ color: navbarTransparent ? "#fff" : "#f5f5f5" }} />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  <List>
                    {["Home", "dashboard", "courses", "job", "Outcome"].map((section) => (
                      <ListItem
                        button
                        key={section}
                        onClick={() => {
                          scrollToSection(section)
                          setDrawerOpen(false)
                        }}
                      >
                        <ListItemText primary={section.toUpperCase()} />
                      </ListItem>
                    ))}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Button sx={{ margin: "20px", background: "#2b6777", color: "#fff" }}>Login</Button>
                    </Link>
                  </List>
                </Drawer>
              </>
            ) : (
              <Box>
                {["Home", "dashboard", "courses", "job", "Outcome"].map((section) => (
                  <Button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    sx={{
                      color: navbarTransparent ? "#fff" : "#f5f5f5",
                      fontWeight: "bold",
                      marginRight: "20px",
                      fontSize: "18px",
                    }}
                  >
                    {section.toUpperCase()}
                  </Button>
                ))}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <LoginButton inHome={navbarTransparent}>Login</LoginButton>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Navbar>
        <FullHeightSection id="Home" ref={(el) => (sectionRefs.current[0] = el)}>
          <TextBox>
            {/* <h1>Welcome to Our Website</h1> */}
            <p>
              {" "}
              Unlock your potential with a smart solution that identifies skill gaps, guides your learning journey,
              verifies your strengths, and connects you to the right job opportunities—bridging the gap between talent
              and career success.
            </p>
          </TextBox>
        </FullHeightSection>

        {/* <Section id="Home" ref={(el) => (sectionRefs.current[0] = el)} /> */}
        {/* <FullHeightSection id="Home" ref={(el) => (sectionRefs.current[0] = el)} /> */}

        {["dashboard", "courses", "jobs"].map((id, index) => (
          <Section id={id} ref={(el) => (sectionRefs.current[index + 1] = el)} key={id}>
            <SectionContent>
              <Grid
                container
                spacing={4}
                alignItems="center"
                direction={isMobile ? "column-reverse" : id === "courses" ? "row-reverse" : "row"}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    animation: `${id === "courses" ? fadeInRight : fadeInLeft} 1s ease-in-out`,
                    textAlign: "center",
                  }}
                >
                  <ImageWrapper
                    sx={{
                      display: "flex",
                      justifyContent: id === "courses" ? "flex-end" : "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={id === "dashboard" ? "/dash.png" : id === "courses" ? "course.jpg" : "job.jpg"}
                      alt={`Section ${index + 2}`}
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        margin: "0 auto",
                      }}
                    />
                  </ImageWrapper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: "20px",
                      color: "#2b6777",
                      fontSize: { xs: "2rem", sm: "3rem", md: "3.1rem" },
                      fontWeight: "bold",
                      textAlign: { xs: "center", md: id === "courses" ? "right" : "left" },
                    }}
                  >
                    {id === "dashboard"
                      ? "Your dashboard"
                      : id === "courses"
                        ? "Recommended Courses"
                        : "Job Recommendation"}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.5rem", md: "1.75rem" },
                      color: "#2b6777",
                      fontStyle: "italic",
                      textAlign: { xs: "center", md: id === "courses" ? "right" : "left" },
                      maxWidth: "600px",
                      margin: id === "courses" ? "0 0 0 auto" : "0 auto 0 0",
                    }}
                  >
                    {id === "dashboard"
                      ? "Stay on top of your growth with an interactive dashboard that visualizes your progress, highlights achievements, and keeps you motivated with real-time insights and rankings."
                      : id === "courses"
                        ? "Get course recommendations tailored to your unique goals. Learn what matters most, track your progress, and keep leveling up with resources that match your learning path."
                        : "Discover job opportunities that match your verified skills and learning journey. From application to offer, get guidance every step of the way toward your next big role."}
                  </Typography>
                </Grid>
              </Grid>
            </SectionContent>
          </Section>
        ))}

        <Section
          id="Outcome"
          ref={(el) => (sectionRefs.current[3] = el)}
          style={{
            background: "linear-gradient(to right, #e1eef6, #ffffff)",
            padding: "50px 20px",
          }}
        >
          <SectionContent>
            <SectionHeading>Learning Outcome</SectionHeading>
            <Grid container spacing={4}>
              {[
                {
                  text: "Skill Gap Analysis",
                  icon: <FaChartLine size={30} color="#fff" />,
                  description:
                    "Identify and analyze gaps in skills, providing targeted training solutions to bridge them.",
                },
                {
                  text: "Personalized Learning Paths",
                  icon: <FaRoad size={30} color="#fff" />,
                  description:
                    "Create customized learning paths based on individual skills, goals, and career trajectories.",
                },
                {
                  text: "AI Job Matching",
                  icon: <FaRobot size={30} color="#fff" />,
                  description:
                    "Leverage AI to match users with relevant job opportunities based on their skills, preferences, and career paths.",
                },
                {
                  text: "AI Career Simulator",
                  icon: <FaLaptopCode size={30} color="#fff" />,
                  description:
                    "Simulate different career paths using AI, helping users visualize future job roles and the necessary skills.",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: "300px", // Ensuring consistent card height
                      display: "flex",
                      maxWidth: "250px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "16px",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 16px 30px rgba(0, 0, 0, 0.6)",
                      },
                      padding: "15px",
                      background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                        backgroundColor: "#2b6777",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#2b6777",
                      }}
                    >
                      {feature.text}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#555",
                        textAlign: "center",
                        marginTop: "8px",
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SectionContent>
        </Section>

        <Footer>
          <Typography variant="body2">© 2025 SkillsBridge. All rights reserved.</Typography>
        </Footer>
      </div>
    </ThemeProvider>
  )
}

export default App
