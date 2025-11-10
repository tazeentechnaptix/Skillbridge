"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  Work,
  Add,
  Search,
  LocationOn,
  AttachMoney,
  People,
  Visibility,
  Edit,
  Delete,
  TrendingUp,
  Business,
  Assessment,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

// Theme object
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
  cardBackground: "#e0e7ee",
}

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, ${(props) => props.theme.background} 0%, #d8f3eb 100%);
    color: ${(props) => props.theme.text};
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`

const PageContainer = styled(motion.div)`
  padding: 3rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const DashboardHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.2);
  color: white;
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

const SectionContainer = styled(motion(Paper))`
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(43, 103, 119, 0.1);
  overflow: hidden;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid rgba(43, 103, 119, 0.2);
`

const SectionHeader = styled.div`
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`

const SectionContent = styled.div`
  padding: 2rem;
`

const StatCard = styled(motion(Card))`
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.gradient || 'rgba(43, 103, 119, 0.1) 0%, rgba(82, 171, 152, 0.15) 100%)'});
  border: 2px solid ${props => props.borderColor || props.theme.primaryLight};
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(43, 103, 119, 0.2);
  }
`

const JobCard = styled(motion(Card))`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  border: 1px solid rgba(43, 103, 119, 0.2);
  background-color: ${(props) => props.theme.cardBackground};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(43, 103, 119, 0.2);
    border-color: ${(props) => props.theme.primaryLight};
  }
`

const AddJobButton = styled(Button)`
  background: linear-gradient(135deg, ${props => props.theme.accent} 0%, ${props => props.theme.accentDark} 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 6px 20px rgba(242, 161, 84, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.accentDark} 0%, ${props => props.theme.accent} 100%);
    box-shadow: 0 8px 25px rgba(242, 161, 84, 0.4);
    transform: translateY(-2px);
  }
`

const ActionButton = styled(IconButton)`
  color: ${props => props.color || props.theme.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(43, 103, 119, 0.1);
  }
`

const SearchBar = styled(TextField)`
  & .MuiOutlinedInput-root {
    background-color: white;
    border-radius: 10px;
  }
`

// Company Information - Each HR belongs to one company
const companyInfo = {
  name: "TechSolutions Pakistan",
  logo: "TS",
  location: "Karachi, Pakistan",
  industry: "Information Technology",
  size: "100-500 employees",
  founded: "2015",
  website: "www.techsolutions.pk",
}

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: companyInfo.name,
    location: "Karachi, Pakistan",
    type: "Full-time",
    salary: "PKR 180,000 - 250,000",
    applicants: 45,
    posted: "2 days ago",
    status: "Active",
    skills: ["React", "TypeScript", "Redux"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: companyInfo.name,
    location: "Lahore, Pakistan",
    type: "Full-time",
    salary: "PKR 150,000 - 220,000",
    applicants: 32,
    posted: "5 days ago",
    status: "Active",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: companyInfo.name,
    location: "Islamabad, Pakistan",
    type: "Contract",
    salary: "PKR 120,000 - 180,000",
    applicants: 28,
    posted: "1 week ago",
    status: "Active",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 4,
    title: "Backend Developer",
    company: companyInfo.name,
    location: "Karachi, Pakistan",
    type: "Full-time",
    salary: "PKR 160,000 - 230,000",
    applicants: 38,
    posted: "3 days ago",
    status: "Active",
    skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: companyInfo.name,
    location: "Lahore, Pakistan",
    type: "Full-time",
    salary: "PKR 170,000 - 240,000",
    applicants: 22,
    posted: "4 days ago",
    status: "Active",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: companyInfo.name,
    location: "Islamabad, Pakistan",
    type: "Full-time",
    salary: "PKR 140,000 - 200,000",
    applicants: 35,
    posted: "1 week ago",
    status: "Active",
    skills: ["React Native", "Flutter", "Firebase"],
  },
]

function HRDashboard() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [jobs, setJobs] = useState(mockJobs)

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0)
  const activeJobs = jobs.filter(job => job.status === "Active").length

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Dashboard Header with Company Info */}
        <DashboardHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                bgcolor: "white",
                color: theme.primary,
                width: 70,
                height: 70,
                fontWeight: "bold",
                fontSize: "1.8rem",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {companyInfo.logo}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "white", mb: 0.5 }}>
                {companyInfo.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.5 }}>
                <Chip
                  icon={<LocationOn sx={{ fontSize: 16 }} />}
                  label={companyInfo.location}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 500,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
                <Chip
                  icon={<Business sx={{ fontSize: 16 }} />}
                  label={companyInfo.industry}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 500,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.85)" }}>
                {companyInfo.size} • Founded {companyInfo.founded}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", color: "white" }}>
              <Notifications />
            </IconButton>
            <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", color: "white" }}>
              <Settings />
            </IconButton>
            <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", color: "white" }} onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Box>
        </DashboardHeader>

        {/* Statistics Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <StatCard
              gradient="linear-gradient(135deg, rgba(43, 103, 119, 0.1) 0%, rgba(82, 171, 152, 0.2) 100%)"
              borderColor={theme.primary}
              whileHover={{ scale: 1.05 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: theme.primary, fontWeight: 700 }}>
                      {activeJobs}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.textLight }}>
                      Active Jobs
                    </Typography>
                  </Box>
                  <Work sx={{ fontSize: 50, color: theme.primary, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              gradient="linear-gradient(135deg, rgba(242, 161, 84, 0.1) 0%, rgba(230, 126, 34, 0.2) 100%)"
              borderColor={theme.accent}
              whileHover={{ scale: 1.05 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: theme.accent, fontWeight: 700 }}>
                      {totalApplicants}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.textLight }}>
                      Total Applicants
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 50, color: theme.accent, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              gradient="linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.2) 100%)"
              borderColor={theme.success}
              whileHover={{ scale: 1.05 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: theme.success, fontWeight: 700 }}>
                      {Math.floor(totalApplicants / activeJobs)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.textLight }}>
                      Avg per Job
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 50, color: theme.success, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              gradient="linear-gradient(135deg, rgba(126, 87, 194, 0.1) 0%, rgba(176, 133, 245, 0.2) 100%)"
              borderColor={theme.tertiary}
              whileHover={{ scale: 1.05 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: theme.tertiary, fontWeight: 700 }}>
                      156
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.textLight }}>
                      Total Students
                    </Typography>
                  </Box>
                  <Assessment sx={{ fontSize: 50, color: theme.tertiary, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        </Grid>

        {/* Job Postings Section */}
        <SectionContainer>
          <SectionHeader>
            <Work sx={{ fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Job Postings
            </Typography>
            <Box sx={{ ml: "auto", display: "flex", gap: 2, alignItems: "center" }}>
              <AddJobButton
                startIcon={<Add />}
                onClick={() => navigate("/hr-add-job")}
              >
                Add New Job
              </AddJobButton>
            </Box>
          </SectionHeader>
          <SectionContent>
            <Box sx={{ mb: 3 }}>
              <SearchBar
                fullWidth
                placeholder="Search jobs by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: theme.textLight }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} md={6} lg={4} key={job.id}>
                  <JobCard
                    onClick={() => navigate(`/hr-job-detail/${job.id}`)}
                    whileHover={{ y: -8 }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600, mb: 0.5 }}>
                            {job.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                            <Business sx={{ fontSize: 16, color: theme.textLight }} />
                            <Typography variant="body2" sx={{ color: theme.textLight }}>
                              {job.company}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={job.status}
                          size="small"
                          sx={{
                            bgcolor: theme.success,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <LocationOn sx={{ fontSize: 16, color: theme.textLight }} />
                        <Typography variant="body2" sx={{ color: theme.text }}>
                          {job.location}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
                        <AttachMoney sx={{ fontSize: 16, color: theme.textLight }} />
                        <Typography variant="body2" sx={{ color: theme.text, fontWeight: 600 }}>
                          {job.salary}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                        {job.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: "rgba(43, 103, 119, 0.1)",
                              color: theme.primary,
                              border: "1px solid rgba(43, 103, 119, 0.2)",
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2, borderTop: "1px solid rgba(43, 103, 119, 0.1)" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <People sx={{ fontSize: 20, color: theme.primary }} />
                          <Typography variant="body2" sx={{ color: theme.primary, fontWeight: 600 }}>
                            {job.applicants} Applicants
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <ActionButton size="small" color={theme.primary}>
                            <Visibility />
                          </ActionButton>
                          <ActionButton size="small" color={theme.accent}>
                            <Edit />
                          </ActionButton>
                          <ActionButton size="small" color={theme.error}>
                            <Delete />
                          </ActionButton>
                        </Box>
                      </Box>

                      <Typography variant="caption" sx={{ color: theme.textLight, mt: 1, display: "block" }}>
                        Posted {job.posted}
                      </Typography>
                    </CardContent>
                  </JobCard>
                </Grid>
              ))}
            </Grid>
          </SectionContent>
        </SectionContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default HRDashboard
