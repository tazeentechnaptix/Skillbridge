"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  Card,
  CardContent,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Tabs,
  Tab,
  Grid,
  LinearProgress,
  Tooltip,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  Search,
  LinkedIn,
  Bookmark,
  BookmarkBorder,
  ArrowForward,
  Verified,
  TrendingUp,
  People,
  Work,
  ArrowBack,
  LocationOn,
  Language,
  Message,
  Share,
  FilterList,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

// Theme object with updated card background colors
const theme = {
  primary: "#2b6777",
  primaryLight: "#52ab98",
  primaryDark: "#1a3c48",
  secondary: "#c8d8e4",
  secondaryLight: "#f0f5f9",
  accent: "#f2a154",
  accentDark: "#e67e22",
  tertiary: "#7e57c2",
  tertiaryLight: "#b085f5",
  background: "#c5e8e0",
  white: "#ffffff",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  text: "#2b6777",
  textLight: "#52ab98",
  textDark: "#1a3c48",
  cardBackground: "#e8eef4", // Darker gray shade for cards
  cardBackgroundDark: "#e8eef4", // Even darker shade for some cards
  cardBackgroundLight: "#e8eef4", // Lighter shade for hover states
}

// Global styles with gradient background
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, ${(props) => props.theme.background} 0%, #d8f3eb 100%);
    color: ${(props) => props.theme.text};
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`

// Styled Components with enhanced styling
const PageContainer = styled(motion.div)`
  padding: 3rem 0;
  max-width: 1200px;
  margin: 0 auto;
`

const PageHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.2);
  color: ${(props) => props.theme.white};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
  }
`

const SectionTitle = styled(Typography)`
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.white};
  margin: 0;
`

const SectionContainer = styled(motion(Paper))`
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(43, 103, 119, 0.1);
  overflow: hidden;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  border: 1px solid rgba(43, 103, 119, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
  }
`

const SectionHeader = styled.div`
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SectionContent = styled.div`
  padding: 2rem;
`

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: ${(props) => props.theme.cardBackground};
    border-radius: 8px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.primary};
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.primary};
    }
  }
`

const FilterButton = styled(Button)`
  background-color: ${(props) => (props.active ? props.theme.primary : props.theme.cardBackground)};
  color: ${(props) => (props.active ? props.theme.white : props.theme.primary)};
  border: 1px solid ${(props) => (props.active ? props.theme.primary : "rgba(43, 103, 119, 0.2)")};
  text-transform: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    background-color: ${(props) => (props.active ? props.theme.primaryDark : "rgba(43, 103, 119, 0.1)")};
  }
`

const ProfileCard = styled(motion(Card))`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  border: 1px solid rgba(43, 103, 119, 0.2);
  background-color: ${(props) => props.theme.cardBackground};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 15px 30px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
    background-color: ${(props) => props.theme.cardBackgroundLight};
  }
`

const ProfileCoverImage = styled(Box)`
  height: 100px;
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  position: relative;
`

const ProfileAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  border: 4px solid ${(props) => props.theme.cardBackground};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: -40px;
  left: 20px;
`

const ProfileContent = styled(CardContent)`
  padding-top: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const ProfileName = styled(Typography)`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ProfileTitle = styled(Typography)`
  color: ${(props) => props.theme.textLight};
  margin-bottom: 0.5rem;
`

const ProfileStat = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  padding: 0.75rem;
  border-radius: 8px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`

const ProfileStatValue = styled(Typography)`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
`

const ProfileStatLabel = styled(Typography)`
  color: ${(props) => props.theme.textLight};
  font-size: 0.875rem;
`

const ProfileTags = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`

const ProfileTag = styled(Chip)`
  background-color: rgba(43, 103, 119, 0.1);
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  border: 1px solid rgba(43, 103, 119, 0.2);
  
  &:hover {
    background-color: rgba(43, 103, 119, 0.2);
  }
`

const ProfileActions = styled(Box)`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.primary ? "white" : props.theme.primary)};
  background: ${(props) => (props.primary ? props.theme.primary : "transparent")};
  border: ${(props) => (props.primary ? "none" : `1px solid ${props.theme.primary}`)};
  box-shadow: ${(props) => (props.primary ? "0 4px 15px rgba(43, 103, 119, 0.2)" : "none")};
  
  &:hover {
    background: ${(props) => (props.primary ? props.theme.primaryDark : "rgba(43, 103, 119, 0.1)")};
    box-shadow: ${(props) => (props.primary ? "0 6px 20px rgba(43, 103, 119, 0.3)" : "0 4px 10px rgba(43, 103, 119, 0.1)")};
  }
`

const StyledTabs = styled(Tabs)`
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  border-radius: 8px;
  padding: 0.5rem;
  
  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.primary};
    height: 3px;
    border-radius: 3px;
  }
  
  .MuiTab-root {
    text-transform: none;
    font-weight: 500;
    color: ${(props) => props.theme.textLight};
    min-height: 48px;
    
    &.Mui-selected {
      color: ${(props) => props.theme.primary};
      font-weight: 600;
    }
  }
`

const ViewMoreButton = styled(Button)`
  margin-top: 1rem;
  background: ${(props) => props.theme.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(43, 103, 119, 0.2);
  
  &:hover {
    background: ${(props) => props.theme.primaryDark};
    box-shadow: 0 6px 20px rgba(43, 103, 119, 0.3);
  }
`

const BackButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const TrendingCard = styled(Card)`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 30px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
  }
`

const TrendingCardHeader = styled(Box)`
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  padding: 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const TrendingCardTitle = styled(Typography)`
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TrendingChip = styled(Chip)`
  justify-content: flex-start;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(43, 103, 119, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
    background-color: rgba(43, 103, 119, 0.15);
  }
  
  & .MuiChip-label {
    padding-left: 0;
  }
`

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(43, 103, 119, 0.15)",
    transition: { type: "spring", stiffness: 300 },
  },
}

// Mock data for LinkedIn profiles
const linkedInProfiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Frontend Developer at Google",
    avatar: "/placeholder.svg?height=80&width=80&text=SJ",
    coverImage: "/placeholder.svg?height=100&width=400&text=Cover",
    followers: 25800,
    connections: 3200,
    posts: 342,
    engagement: 87,
    experience: 12,
    verified: true,
    trending: true,
    location: "San Francisco, CA",
    skills: ["React", "JavaScript", "UI/UX", "TypeScript", "Frontend Architecture"],
    about:
      "Leading frontend development at Google. Passionate about creating intuitive user experiences and mentoring junior developers.",
    website: "sarahjohnson.dev",
    saved: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Full Stack Engineer at Microsoft",
    avatar: "/placeholder.svg?height=80&width=80&text=MC",
    coverImage: "/placeholder.svg?height=100&width=400&text=Cover",
    followers: 18500,
    connections: 2800,
    posts: 215,
    engagement: 92,
    experience: 8,
    verified: true,
    trending: false,
    location: "Seattle, WA",
    skills: ["Node.js", "React", "Azure", "TypeScript", "System Design"],
    about: "Building scalable applications at Microsoft. Open source contributor and tech blogger.",
    website: "michaelchen.io",
    saved: false,
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Senior UI/UX Designer at Airbnb",
    avatar: "/placeholder.svg?height=80&width=80&text=PP",
    coverImage: "/placeholder.svg?height=100&width=400&text=Cover",
    followers: 32100,
    connections: 2500,
    posts: 428,
    engagement: 95,
    experience: 10,
    verified: true,
    trending: true,
    location: "San Francisco, CA",
    skills: ["UI Design", "UX Research", "Figma", "Design Systems", "Prototyping"],
    about:
      "Creating beautiful and functional designs at Airbnb. Speaker at design conferences and mentor for aspiring designers.",
    website: "priyapatel.design",
    saved: true,
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Engineering Manager at Amazon",
    avatar: "/placeholder.svg?height=80&width=80&text=DW",
    coverImage: "/placeholder.svg?height=100&width=400&text=Cover",
    followers: 41200,
    connections: 3800,
    posts: 187,
    engagement: 83,
    experience: 15,
    verified: true,
    trending: false,
    location: "Seattle, WA",
    skills: ["Leadership", "System Design", "AWS", "Microservices", "Team Building"],
    about: "Leading engineering teams at Amazon. Focused on building scalable systems and growing engineering talent.",
    website: "davidwilson.tech",
    saved: false,
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    title: "Product Manager at Netflix",
    avatar: "/placeholder.svg?height=80&width=80&text=ER",
    coverImage: "/placeholder.svg?height=100&width=400&text=Cover",
    followers: 28700,
    connections: 2900,
    posts: 312,
    engagement: 89,
    experience: 9,
    verified: true,
    trending: true,
    location: "Los Angeles, CA",
    skills: ["Product Strategy", "A/B Testing", "User Research", "Agile", "Data Analysis"],
    about:
      "Driving product innovation at Netflix. Passionate about creating products that delight users and drive business growth.",
    website: "emilyrodriguez.com",
    saved: false,
  },
  {
    id: 6,
    name: "James Taylor",
    title: "CTO at Stripe",
    avatar: "/placeholder.svg?height=80&width=80&text=JT",
    coverImage: "/placeholder.svg?height=100&width=400&text=Cover",
    followers: 52300,
    connections: 4100,
    posts: 245,
    engagement: 91,
    experience: 18,
    verified: true,
    trending: true,
    location: "San Francisco, CA",
    skills: ["Technical Leadership", "Payments", "Scalability", "Security", "Engineering Culture"],
    about: "Leading technical strategy at Stripe. Previously engineering leader at Square and Twitter.",
    website: "jamestaylor.io",
    saved: true,
  },
]

// Job titles for filtering
const jobTitles = [
  "All Profiles",
  "Frontend Developer",
  "Full Stack Engineer",
  "UI/UX Designer",
  "Engineering Manager",
  "Product Manager",
  "CTO",
]

function LinkedInInfluencers() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)
  const [savedProfiles, setSavedProfiles] = useState([3, 6]) // IDs of initially saved profiles
  const [sortBy, setSortBy] = useState("followers") // Default sort by followers

  // Filter profiles based on search term and selected tab
  const filteredProfiles = linkedInProfiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    if (selectedTab === 0) return matchesSearch // All profiles
    return matchesSearch && profile.title.includes(jobTitles[selectedTab])
  })

  // Sort profiles based on selected sort option
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortBy === "followers") return b.followers - a.followers
    if (sortBy === "experience") return b.experience - a.experience
    if (sortBy === "engagement") return b.engagement - a.engagement
    return 0
  })

  const toggleSaveProfile = (profileId) => {
    if (savedProfiles.includes(profileId)) {
      setSavedProfiles(savedProfiles.filter((id) => id !== profileId))
    } else {
      setSavedProfiles([...savedProfiles, profileId])
    }
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  // Format large numbers with K/M suffix
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial="hidden" animate="visible" variants={containerVariants}>
        {/* Page Header */}
        <PageHeader variants={itemVariants}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BackButton startIcon={<ArrowBack />} onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </BackButton>
            <Box sx={{ ml: 3 }}>
              <SectionTitle variant="h4">
                <LinkedIn sx={{ fontSize: 32 }} /> LinkedIn Influencers
              </SectionTitle>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 1 }}>
                Discover top professionals in your field with the most followers and experience
              </Typography>
            </Box>
          </Box>
        </PageHeader>

        {/* Main Content */}
        <SectionContainer variants={itemVariants}>
          <SectionHeader>
            <People sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Top LinkedIn Profiles</SectionTitle>
          </SectionHeader>
          <SectionContent>
            {/* Search and Filter */}
            <SearchContainer>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1, position: "relative" }}>
                <StyledTextField
                  fullWidth
                  placeholder="Search by name, title, or skill..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchTerm("")}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              bgcolor: "rgba(0,0,0,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              color: "white",
                            }}
                          >
                            ×
                          </Box>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Tooltip title="Sort by followers">
                  <FilterButton
                    startIcon={<People />}
                    onClick={() => handleSortChange("followers")}
                    active={sortBy === "followers"}
                  >
                    Followers
                  </FilterButton>
                </Tooltip>
                <Tooltip title="Sort by experience">
                  <FilterButton
                    startIcon={<Work />}
                    onClick={() => handleSortChange("experience")}
                    active={sortBy === "experience"}
                  >
                    Experience
                  </FilterButton>
                </Tooltip>
                <Tooltip title="Sort by engagement">
                  <FilterButton
                    startIcon={<TrendingUp />}
                    onClick={() => handleSortChange("engagement")}
                    active={sortBy === "engagement"}
                  >
                    Engagement
                  </FilterButton>
                </Tooltip>
                <Tooltip title="More filters">
                  <IconButton
                    sx={{
                      bgcolor: theme.cardBackgroundDark,
                      color: theme.primary,
                      "&:hover": { bgcolor: "rgba(43, 103, 119, 0.15)" },
                    }}
                  >
                    <FilterList />
                  </IconButton>
                </Tooltip>
              </Box>
            </SearchContainer>

            {/* Job Title Tabs */}
            <StyledTabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="job title tabs"
            >
              {jobTitles.map((title, index) => (
                <Tab key={index} label={title} />
              ))}
            </StyledTabs>

            {/* Profile Cards */}
            <Grid container spacing={3}>
              {sortedProfiles.map((profile) => (
                <Grid item xs={12} md={6} lg={4} key={profile.id}>
                  <ProfileCard variants={cardVariants} whileHover="hover">
                    <ProfileCoverImage>
                      <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
                        {profile.verified && (
                          <Tooltip title="Verified Profile">
                            <Chip
                              icon={<Verified sx={{ color: theme.success + " !important" }} />}
                              label="Verified"
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                color: theme.success,
                                fontWeight: 600,
                              }}
                            />
                          </Tooltip>
                        )}
                        {profile.trending && (
                          <Tooltip title="Trending Profile">
                            <Chip
                              icon={<TrendingUp sx={{ color: theme.accent + " !important" }} />}
                              label="Trending"
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                color: theme.accent,
                                fontWeight: 600,
                              }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                      <ProfileAvatar src={profile.avatar} alt={profile.name} />
                    </ProfileCoverImage>
                    <ProfileContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box>
                          <ProfileName variant="h6">
                            {profile.name}
                            {profile.verified && (
                              <Tooltip title="Verified Profile">
                                <Verified fontSize="small" sx={{ color: theme.success }} />
                              </Tooltip>
                            )}
                          </ProfileName>
                          <ProfileTitle variant="body2">{profile.title}</ProfileTitle>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <LocationOn fontSize="small" sx={{ color: theme.textLight }} />
                            <Typography variant="body2" sx={{ color: theme.textLight }}>
                              {profile.location}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => toggleSaveProfile(profile.id)}
                          sx={{
                            color: savedProfiles.includes(profile.id) ? theme.accent : theme.textLight,
                            bgcolor: theme.cardBackgroundDark,
                            "&:hover": { bgcolor: "rgba(43, 103, 119, 0.15)" },
                          }}
                        >
                          {savedProfiles.includes(profile.id) ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                      </Box>

                      <Divider sx={{ my: 1.5, backgroundColor: "rgba(43, 103, 119, 0.1)" }} />

                      {/* Profile Stats */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                          <ProfileStat>
                            <People fontSize="small" sx={{ color: theme.primary }} />
                            <Box>
                              <ProfileStatValue variant="body2">{formatNumber(profile.followers)}</ProfileStatValue>
                              <ProfileStatLabel variant="caption">Followers</ProfileStatLabel>
                            </Box>
                          </ProfileStat>
                        </Grid>
                        <Grid item xs={4}>
                          <ProfileStat>
                            <Work fontSize="small" sx={{ color: theme.primary }} />
                            <Box>
                              <ProfileStatValue variant="body2">{profile.experience} yrs</ProfileStatValue>
                              <ProfileStatLabel variant="caption">Experience</ProfileStatLabel>
                            </Box>
                          </ProfileStat>
                        </Grid>
                        <Grid item xs={4}>
                          <ProfileStat>
                            <TrendingUp
                              fontSize="small"
                              sx={{ color: profile.engagement >= 90 ? theme.success : theme.primary }}
                            />
                            <Box>
                              <ProfileStatValue variant="body2">{profile.engagement}%</ProfileStatValue>
                              <ProfileStatLabel variant="caption">Engagement</ProfileStatLabel>
                            </Box>
                          </ProfileStat>
                        </Grid>
                      </Grid>

                      {/* Engagement Score */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Influence Score
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.primary }}>
                            {profile.engagement}/100
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={profile.engagement}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: "rgba(43, 103, 119, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                profile.engagement >= 90
                                  ? theme.success
                                  : profile.engagement >= 70
                                    ? theme.primary
                                    : theme.warning,
                              borderRadius: 5,
                            },
                          }}
                        />
                      </Box>

                      {/* Skills */}
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Top Skills
                      </Typography>
                      <ProfileTags>
                        {profile.skills.map((skill, index) => (
                          <ProfileTag key={index} label={skill} size="small" />
                        ))}
                      </ProfileTags>

                      {/* Website */}
                      {profile.website && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Language fontSize="small" sx={{ color: theme.textLight }} />
                          <Typography
                            variant="body2"
                            component="a"
                            href={`https://${profile.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: theme.primary,
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {profile.website}
                          </Typography>
                        </Box>
                      )}

                      {/* Actions */}
                      <ProfileActions>
                        <ActionButton
                          primary
                          startIcon={<LinkedIn />}
                          component="a"
                          href={`https://linkedin.com/in/${profile.name.toLowerCase().replace(" ", "-")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ flex: 1 }}
                        >
                          View Profile
                        </ActionButton>
                        <ActionButton startIcon={<Message />}>Message</ActionButton>
                        <IconButton
                          sx={{
                            color: theme.textLight,
                            bgcolor: theme.cardBackgroundDark,
                            "&:hover": { bgcolor: "rgba(43, 103, 119, 0.15)" },
                          }}
                        >
                          <Share />
                        </IconButton>
                      </ProfileActions>
                    </ProfileContent>
                  </ProfileCard>
                </Grid>
              ))}
            </Grid>

            {/* View More Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <ViewMoreButton
                endIcon={<ArrowForward />}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Profiles
              </ViewMoreButton>
            </Box>
          </SectionContent>
        </SectionContainer>

        {/* Trending Topics Section */}
        <SectionContainer variants={itemVariants}>
          <SectionHeader>
            <TrendingUp sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Trending in Your Industry</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TrendingCard>
                  <TrendingCardHeader>
                    <TrendingCardTitle variant="h6">
                      <TrendingUp fontSize="small" /> Top Hashtags
                    </TrendingCardTitle>
                  </TrendingCardHeader>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {[
                        "#FrontendDevelopment",
                        "#ReactJS",
                        "#TechCareers",
                        "#WebDevelopment",
                        "#SoftwareEngineering",
                      ].map((tag, index) => (
                        <TrendingChip
                          key={index}
                          label={tag}
                          icon={<TrendingUp sx={{ color: `${theme.primary} !important` }} />}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </TrendingCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <TrendingCard>
                  <TrendingCardHeader>
                    <TrendingCardTitle variant="h6">
                      <Work fontSize="small" /> Popular Skills
                    </TrendingCardTitle>
                  </TrendingCardHeader>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {[
                        { skill: "React", growth: "+24%" },
                        { skill: "TypeScript", growth: "+18%" },
                        { skill: "Next.js", growth: "+32%" },
                        { skill: "UI/UX Design", growth: "+15%" },
                        { skill: "System Design", growth: "+21%" },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: theme.cardBackgroundDark,
                            padding: "0.75rem",
                            borderRadius: "8px",
                            transition: "transform 0.2s ease",
                            "&:hover": { transform: "translateX(5px)" },
                          }}
                        >
                          <ProfileTag label={item.skill} />
                          <Typography variant="body2" sx={{ color: theme.success, fontWeight: 600 }}>
                            {item.growth}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </TrendingCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <TrendingCard>
                  <TrendingCardHeader>
                    <TrendingCardTitle variant="h6">
                      <People fontSize="small" /> Upcoming Events
                    </TrendingCardTitle>
                  </TrendingCardHeader>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {[
                        { title: "Frontend Developer Summit", date: "May 15-16, 2023", location: "Virtual" },
                        { title: "React Conference", date: "June 8-10, 2023", location: "San Francisco, CA" },
                        { title: "Tech Career Fair", date: "July 22, 2023", location: "New York, NY" },
                      ].map((event, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: theme.cardBackgroundDark,
                            padding: "1rem",
                            borderRadius: "8px",
                            transition: "transform 0.2s ease",
                            "&:hover": { transform: "translateY(-5px)" },
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.primary }}>
                            {event.title}
                          </Typography>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                            <Typography variant="body2" sx={{ color: theme.textLight }}>
                              {event.date}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.textLight }}>
                              {event.location}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </TrendingCard>
              </Grid>
            </Grid>
          </SectionContent>
        </SectionContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default LinkedInInfluencers
