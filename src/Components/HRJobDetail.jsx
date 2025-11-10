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
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  ArrowBack,
  LocationOn,
  AttachMoney,
  Work,
  AccessTime,
  People,
  Email,
  Phone,
  LinkedIn,
  Download,
  Star,
  CheckCircle,
  TrendingUp,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"

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

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.2);
  color: white;
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

const StudentCard = styled(motion(Card))`
  border-radius: 12px;
  background-color: ${(props) => props.theme.cardBackground};
  border: 2px solid ${(props) => (props.featured ? props.theme.accent : "rgba(43, 103, 119, 0.2)")};
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;

  ${(props) =>
    props.featured &&
    `
    &:before {
      content: 'Top Match';
      position: absolute;
      top: -12px;
      right: 20px;
      background: ${props.theme.accent};
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(242, 161, 84, 0.3);
    }
  `}

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(43, 103, 119, 0.2);
  }
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  box-shadow: 0 4px 15px rgba(43, 103, 119, 0.2);

  &:hover {
    box-shadow: 0 6px 20px rgba(43, 103, 119, 0.3);
  }
`

const MatchScore = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${(props) =>
    props.score >= 90
      ? `linear-gradient(135deg, ${props.theme.success} 0%, #66bb6a 100%)`
      : props.score >= 70
      ? `linear-gradient(135deg, ${props.theme.accent} 0%, ${props.theme.accentDark} 100%)`
      : `linear-gradient(135deg, ${props.theme.warning} 0%, #ffa726 100%)`};
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`

// Company Information
const companyInfo = {
  name: "TechSolutions Pakistan",
  logo: "TS",
  location: "Karachi, Pakistan",
}

const mockJobDetails = {
  1: {
    title: "Senior Frontend Developer",
    company: companyInfo.name,
    location: "Karachi, Pakistan",
    type: "Full-time",
    salary: "PKR 180,000 - 250,000",
    posted: "2 days ago",
    description: "We are looking for a Senior Frontend Developer to join our team and help build our next-generation web applications. You will be responsible for developing user-facing features, optimizing applications for maximum speed, and collaborating with backend developers and web designers.",
    requirements: [
      "5+ years of experience with React and JavaScript",
      "Strong understanding of TypeScript",
      "Experience with Redux or similar state management",
      "Proficiency in HTML5, CSS3, and responsive design",
      "Experience with RESTful APIs and GraphQL",
      "Knowledge of modern build tools (Webpack, Babel, etc.)",
    ],
    skills: ["React", "TypeScript", "Redux", "JavaScript", "HTML", "CSS"],
  },
  2: {
    title: "Full Stack Engineer",
    company: companyInfo.name,
    location: "Lahore, Pakistan",
    type: "Full-time",
    salary: "PKR 150,000 - 220,000",
    posted: "5 days ago",
    description: "Join our dynamic team as a Full Stack Engineer. You'll work on both client and server-side applications, collaborating with cross-functional teams to deliver high-quality software solutions.",
    requirements: [
      "4+ years of full-stack development experience",
      "Proficiency in React and Node.js",
      "Experience with MongoDB and SQL databases",
      "Knowledge of RESTful API design",
      "Understanding of cloud services (AWS/Azure)",
    ],
    skills: ["React", "Node.js", "MongoDB", "JavaScript", "Express", "AWS"],
  },
  3: {
    title: "UI/UX Designer",
    company: companyInfo.name,
    location: "Islamabad, Pakistan",
    type: "Contract",
    salary: "PKR 120,000 - 180,000",
    posted: "1 week ago",
    description: "We're seeking a talented UI/UX Designer to create engaging and intuitive user experiences for our digital products. You'll work closely with product managers and developers to bring designs to life.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma and Adobe XD",
      "Strong portfolio demonstrating design skills",
      "Understanding of user-centered design principles",
      "Experience with prototyping and user testing",
    ],
    skills: ["Figma", "Adobe XD", "Prototyping", "UI Design", "UX Research"],
  },
  4: {
    title: "Backend Developer",
    company: companyInfo.name,
    location: "Karachi, Pakistan",
    type: "Full-time",
    salary: "PKR 160,000 - 230,000",
    posted: "3 days ago",
    description: "Looking for an experienced Backend Developer to build robust and scalable server-side applications. You'll work on designing database schemas, creating APIs, and ensuring optimal performance.",
    requirements: [
      "4+ years of backend development experience",
      "Strong proficiency in Python and Django",
      "Experience with PostgreSQL or MySQL",
      "Knowledge of API design and microservices",
      "Understanding of cloud infrastructure",
    ],
    skills: ["Python", "Django", "PostgreSQL", "REST API", "Docker"],
  },
  5: {
    title: "DevOps Engineer",
    company: companyInfo.name,
    location: "Lahore, Pakistan",
    type: "Full-time",
    salary: "PKR 170,000 - 240,000",
    posted: "4 days ago",
    description: "Join our team as a DevOps Engineer to help streamline our development and deployment processes. You'll work on automation, CI/CD pipelines, and infrastructure management.",
    requirements: [
      "3+ years of DevOps experience",
      "Expertise in Docker and Kubernetes",
      "Experience with AWS or Azure",
      "Knowledge of CI/CD tools (Jenkins, GitLab CI)",
      "Strong scripting skills (Bash, Python)",
    ],
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Linux"],
  },
  6: {
    title: "Mobile App Developer",
    company: companyInfo.name,
    location: "Islamabad, Pakistan",
    type: "Full-time",
    salary: "PKR 140,000 - 200,000",
    posted: "1 week ago",
    description: "We're looking for a Mobile App Developer to create innovative mobile applications for iOS and Android platforms. You'll work with cross-functional teams to deliver exceptional user experiences.",
    requirements: [
      "3+ years of mobile app development experience",
      "Proficiency in React Native or Flutter",
      "Experience with mobile UI/UX best practices",
      "Knowledge of mobile app deployment",
      "Understanding of backend integration",
    ],
    skills: ["React Native", "Flutter", "Firebase", "iOS", "Android"],
  },
}

const mockStudents = [
  {
    id: 1,
    name: "Tazeen Shaikh",
    avatar: "TS",
    email: "tazeen@skillbridge.com",
    phone: "+92 300 1234567",
    linkedin: "linkedin.com/in/tazeen",
    location: "Karachi, Pakistan",
    skills: ["React", "TypeScript", "Redux", "JavaScript", "HTML", "CSS"],
    experience: "4 years",
    education: "B.S. Computer Science, FAST-NUCES",
    matchScore: 95,
    projects: 12,
    certifications: 5,
  },
  {
    id: 2,
    name: "Ahmed Ali",
    avatar: "AA",
    email: "ahmed.ali@skillbridge.com",
    phone: "+92 321 2345678",
    linkedin: "linkedin.com/in/ahmedali",
    location: "Lahore, Pakistan",
    skills: ["React", "JavaScript", "Redux", "HTML", "CSS", "Node.js"],
    experience: "5 years",
    education: "M.S. Software Engineering, LUMS",
    matchScore: 92,
    projects: 15,
    certifications: 7,
  },
  {
    id: 3,
    name: "Ayesha Khan",
    avatar: "AK",
    email: "ayesha.khan@skillbridge.com",
    phone: "+92 333 3456789",
    linkedin: "linkedin.com/in/ayeshakhan",
    location: "Islamabad, Pakistan",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "GraphQL"],
    experience: "3 years",
    education: "B.S. Computer Science, NUST",
    matchScore: 88,
    projects: 10,
    certifications: 4,
  },
  {
    id: 4,
    name: "Fatima Malik",
    avatar: "FM",
    email: "fatima.malik@skillbridge.com",
    phone: "+92 300 4567890",
    linkedin: "linkedin.com/in/fatimamalik",
    location: "Karachi, Pakistan",
    skills: ["React", "JavaScript", "HTML", "CSS", "Vue.js"],
    experience: "4 years",
    education: "B.S. Information Technology, UET Lahore",
    matchScore: 85,
    projects: 11,
    certifications: 3,
  },
  {
    id: 5,
    name: "Hassan Raza",
    avatar: "HR",
    email: "hassan.raza@skillbridge.com",
    phone: "+92 321 5678901",
    linkedin: "linkedin.com/in/hassanraza",
    location: "Islamabad, Pakistan",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    experience: "3 years",
    education: "B.S. Computer Science, COMSATS",
    matchScore: 82,
    projects: 9,
    certifications: 4,
  },
  {
    id: 6,
    name: "Zainab Ahmed",
    avatar: "ZA",
    email: "zainab.ahmed@skillbridge.com",
    phone: "+92 333 6789012",
    linkedin: "linkedin.com/in/zainabahmed",
    location: "Karachi, Pakistan",
    skills: ["React", "JavaScript", "Redux", "HTML", "CSS", "Material-UI"],
    experience: "3 years",
    education: "B.S. Software Engineering, IBA Karachi",
    matchScore: 79,
    projects: 8,
    certifications: 3,
  },
]

function HRJobDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const jobDetails = mockJobDetails[id] || mockJobDetails[1]
  const [students] = useState(mockStudents)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Header with Company Info */}
        <Header>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/hr-dashboard")}
              sx={{ 
                color: "white", 
                textTransform: "none",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                px: 2,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                }
              }}
            >
              Back to Dashboard
            </Button>
            <Avatar
              sx={{
                bgcolor: "white",
                color: theme.primary,
                width: 50,
                height: 50,
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {companyInfo.logo}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {jobDetails.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                  {jobDetails.company}
                </Typography>
                <Chip
                  icon={<LocationOn sx={{ fontSize: 16 }} />}
                  label={jobDetails.location}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 500,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Chip
            icon={<CheckCircle sx={{ fontSize: 18 }} />}
            label="Active"
            sx={{
              bgcolor: theme.success,
              color: "white",
              fontWeight: 600,
              px: 2,
              py: 2.5,
              fontSize: "0.95rem",
              "& .MuiChip-icon": { color: "white" },
            }}
          />
        </Header>

        {/* Job Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              bgcolor: "linear-gradient(135deg, rgba(43, 103, 119, 0.1) 0%, rgba(82, 171, 152, 0.15) 100%)",
              border: "2px solid rgba(43, 103, 119, 0.3)",
              borderRadius: 2,
            }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <LocationOn sx={{ fontSize: 40, color: theme.primary, mb: 1 }} />
                <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                  Location
                </Typography>
                <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600 }}>
                  {jobDetails.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              bgcolor: "linear-gradient(135deg, rgba(242, 161, 84, 0.1) 0%, rgba(230, 126, 34, 0.15) 100%)",
              border: "2px solid rgba(242, 161, 84, 0.3)",
              borderRadius: 2,
            }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <AttachMoney sx={{ fontSize: 40, color: theme.accent, mb: 1 }} />
                <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                  Salary Range
                </Typography>
                <Typography variant="h6" sx={{ color: theme.accent, fontWeight: 600 }}>
                  {jobDetails.salary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              bgcolor: "linear-gradient(135deg, rgba(126, 87, 194, 0.1) 0%, rgba(176, 133, 245, 0.15) 100%)",
              border: "2px solid rgba(126, 87, 194, 0.3)",
              borderRadius: 2,
            }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <AccessTime sx={{ fontSize: 40, color: theme.tertiary, mb: 1 }} />
                <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                  Job Type
                </Typography>
                <Typography variant="h6" sx={{ color: theme.tertiary, fontWeight: 600 }}>
                  {jobDetails.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              bgcolor: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.15) 100%)",
              border: "2px solid rgba(76, 175, 80, 0.3)",
              borderRadius: 2,
            }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <People sx={{ fontSize: 40, color: theme.success, mb: 1 }} />
                <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                  Total Applicants
                </Typography>
                <Typography variant="h6" sx={{ color: theme.success, fontWeight: 600 }}>
                  {students.length} Candidates
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Job Details Section */}
          <Grid item xs={12} md={8}>
            <SectionContainer>
              <SectionHeader>
                <Work sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Job Details
                </Typography>
              </SectionHeader>
              <SectionContent>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600, mb: 2 }}>
                    Job Description
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.text, lineHeight: 1.8 }}>
                    {jobDetails.description}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600, mb: 2 }}>
                    Requirements
                  </Typography>
                  <List>
                    {jobDetails.requirements.map((req, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <CheckCircle sx={{ fontSize: 20, color: theme.success, mr: 1.5 }} />
                        <ListItemText primary={req} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                  <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600, mb: 2 }}>
                    Required Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {jobDetails.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{
                          bgcolor: "rgba(43, 103, 119, 0.1)",
                          color: theme.primary,
                          border: "1px solid rgba(43, 103, 119, 0.2)",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </SectionContent>
            </SectionContainer>
          </Grid>

          {/* Job Info Sidebar */}
          <Grid item xs={12} md={4}>
            <SectionContainer>
              <SectionHeader>
                <TrendingUp sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Quick Stats
                </Typography>
              </SectionHeader>
              <SectionContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                    Posted
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600 }}>
                    {jobDetails.posted}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                    Applications
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 600 }}>
                    {students.length} candidates
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                    Average Match Score
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.success, fontWeight: 600 }}>
                    87%
                  </Typography>
                </Box>
              </SectionContent>
            </SectionContainer>
          </Grid>
        </Grid>

        {/* Top Students Section */}
        <SectionContainer>
          <SectionHeader>
            <Star sx={{ fontSize: 28 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Top Matching Candidates from SkillBridge
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Sorted by match score • Showing {students.length} candidates
              </Typography>
            </Box>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={3}>
              {students.map((student, index) => (
                <Grid item xs={12} key={student.id}>
                  <StudentCard featured={index === 0} whileHover={{ y: -5 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3} alignItems="center">
                        {/* Rank & Avatar Section */}
                        <Grid item xs={12} md={2}>
                          <Box sx={{ textAlign: "center", position: "relative" }}>
                            {index < 3 && (
                              <Chip
                                label={`#${index + 1}`}
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: -10,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  bgcolor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
                                  color: "white",
                                  fontWeight: 700,
                                  zIndex: 1,
                                }}
                              />
                            )}
                            <Avatar
                              sx={{
                                bgcolor: index === 0 ? theme.accent : theme.primary,
                                width: 90,
                                height: 90,
                                fontSize: "2rem",
                                fontWeight: 700,
                                margin: "0 auto",
                                mb: 1.5,
                                border: index === 0 ? "3px solid #FFD700" : "3px solid rgba(43, 103, 119, 0.3)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              }}
                            >
                              {student.avatar}
                            </Avatar>
                            <MatchScore score={student.matchScore}>
                              {student.matchScore}%
                            </MatchScore>
                            {index === 0 && (
                              <Chip
                                icon={<Star sx={{ fontSize: 16 }} />}
                                label="Best Match"
                                size="small"
                                sx={{
                                  mt: 1,
                                  bgcolor: theme.accent,
                                  color: "white",
                                  fontWeight: 600,
                                  "& .MuiChip-icon": { color: "white" },
                                }}
                              />
                            )}
                          </Box>
                        </Grid>

                        {/* Student Info Section */}
                        <Grid item xs={12} md={5}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Typography variant="h5" sx={{ color: theme.primary, fontWeight: 700 }}>
                              {student.name}
                            </Typography>
                            {student.matchScore >= 90 && (
                              <CheckCircle sx={{ color: theme.success, fontSize: 24 }} />
                            )}
                          </Box>
                          <Typography variant="body1" sx={{ color: theme.text, mb: 0.5, fontWeight: 500 }}>
                            🎓 {student.education}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.textLight, mb: 2 }}>
                            💼 {student.experience} experience
                          </Typography>

                          <Typography variant="subtitle2" sx={{ color: theme.primary, fontWeight: 600, mb: 1 }}>
                            Skills & Expertise:
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
                            {student.skills.slice(0, 5).map((skill, idx) => (
                              <Chip
                                key={idx}
                                label={skill}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(43, 103, 119, 0.12)",
                                  color: theme.primary,
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                  border: "1px solid rgba(43, 103, 119, 0.2)",
                                }}
                              />
                            ))}
                            {student.skills.length > 5 && (
                              <Chip
                                label={`+${student.skills.length - 5} more`}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(242, 161, 84, 0.12)",
                                  color: theme.accent,
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                  border: "1px solid rgba(242, 161, 84, 0.3)",
                                }}
                              />
                            )}
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Box sx={{ 
                                textAlign: "center", 
                                p: 1.5, 
                                borderRadius: 2, 
                                bgcolor: "rgba(43, 103, 119, 0.05)",
                                border: "1px solid rgba(43, 103, 119, 0.1)",
                              }}>
                                <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 700 }}>
                                  {student.projects}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.textLight }}>
                                  Projects
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ 
                                textAlign: "center", 
                                p: 1.5, 
                                borderRadius: 2, 
                                bgcolor: "rgba(242, 161, 84, 0.05)",
                                border: "1px solid rgba(242, 161, 84, 0.1)",
                              }}>
                                <Typography variant="h6" sx={{ color: theme.accent, fontWeight: 700 }}>
                                  {student.certifications}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.textLight }}>
                                  Certificates
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ 
                                textAlign: "center", 
                                p: 1.5, 
                                borderRadius: 2, 
                                bgcolor: "rgba(76, 175, 80, 0.05)",
                                border: "1px solid rgba(76, 175, 80, 0.1)",
                              }}>
                                <Typography variant="h6" sx={{ color: theme.success, fontWeight: 700 }}>
                                  {student.matchScore}%
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.textLight }}>
                                  Match
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* Contact & Actions Section */}
                        <Grid item xs={12} md={5}>
                          <Card sx={{ 
                            bgcolor: "rgba(43, 103, 119, 0.03)", 
                            border: "1px solid rgba(43, 103, 119, 0.1)",
                            height: "100%",
                          }}>
                            <CardContent>
                              <Typography variant="subtitle2" sx={{ color: theme.primary, fontWeight: 600, mb: 2 }}>
                                📞 Contact Information
                              </Typography>
                              
                              <Box sx={{ mb: 3 }}>
                                <Box sx={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  gap: 1.5, 
                                  mb: 1.5,
                                  p: 1,
                                  borderRadius: 1,
                                  bgcolor: "white",
                                }}>
                                  <LocationOn sx={{ fontSize: 20, color: theme.primary }} />
                                  <Box>
                                    <Typography variant="caption" sx={{ color: theme.textLight, display: "block" }}>
                                      Location
                                    </Typography>
                                    <Typography variant="body2" fontWeight="600">
                                      {student.location}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  gap: 1.5, 
                                  mb: 1.5,
                                  p: 1,
                                  borderRadius: 1,
                                  bgcolor: "white",
                                }}>
                                  <Email sx={{ fontSize: 20, color: theme.primary }} />
                                  <Box>
                                    <Typography variant="caption" sx={{ color: theme.textLight, display: "block" }}>
                                      Email
                                    </Typography>
                                    <Typography variant="body2" fontWeight="600">
                                      {student.email}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  gap: 1.5, 
                                  mb: 1.5,
                                  p: 1,
                                  borderRadius: 1,
                                  bgcolor: "white",
                                }}>
                                  <Phone sx={{ fontSize: 20, color: theme.primary }} />
                                  <Box>
                                    <Typography variant="caption" sx={{ color: theme.textLight, display: "block" }}>
                                      Phone
                                    </Typography>
                                    <Typography variant="body2" fontWeight="600">
                                      {student.phone}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  gap: 1.5,
                                  p: 1,
                                  borderRadius: 1,
                                  bgcolor: "white",
                                }}>
                                  <LinkedIn sx={{ fontSize: 20, color: "#0077b5" }} />
                                  <Box>
                                    <Typography variant="caption" sx={{ color: theme.textLight, display: "block" }}>
                                      LinkedIn
                                    </Typography>
                                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: "0.85rem" }}>
                                      {student.linkedin}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              <Divider sx={{ my: 2 }} />

                              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  size="medium"
                                  startIcon={<Download />}
                                  sx={{
                                    bgcolor: theme.primary,
                                    color: "white",
                                    fontWeight: 600,
                                    py: 1.2,
                                    "&:hover": { 
                                      bgcolor: theme.primaryDark,
                                      transform: "translateY(-2px)",
                                      boxShadow: "0 4px 12px rgba(43, 103, 119, 0.3)",
                                    },
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  Download Resume
                                </Button>
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  size="medium"
                                  sx={{
                                    borderColor: theme.primary,
                                    borderWidth: 2,
                                    color: theme.primary,
                                    fontWeight: 600,
                                    py: 1.2,
                                    "&:hover": { 
                                      borderWidth: 2,
                                      borderColor: theme.primaryDark, 
                                      bgcolor: "rgba(43, 103, 119, 0.08)",
                                      transform: "translateY(-2px)",
                                    },
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  View Full Profile
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(43, 103, 119, 0.1)" }}>
                        <Typography variant="body2" sx={{ color: theme.textLight, mb: 1 }}>
                          Skills Match
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={student.matchScore}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            bgcolor: "rgba(43, 103, 119, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor:
                                student.matchScore >= 90
                                  ? theme.success
                                  : student.matchScore >= 70
                                  ? theme.accent
                                  : theme.warning,
                              borderRadius: 5,
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                  </StudentCard>
                </Grid>
              ))}
            </Grid>
          </SectionContent>
        </SectionContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default HRJobDetail
