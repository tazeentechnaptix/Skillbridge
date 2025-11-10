"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { ArrowBack, Save, Work, Add as AddIcon } from "@mui/icons-material"
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
  max-width: 1000px;
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

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background-color: white;
  }
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  box-shadow: 0 4px 15px rgba(43, 103, 119, 0.2);
  font-size: 1rem;

  &:hover {
    box-shadow: 0 6px 20px rgba(43, 103, 119, 0.3);
    transform: translateY(-2px);
  }
`

const skillOptions = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "Redux",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "Git",
  "Agile",
  "Figma",
  "Adobe XD",
]

function HRAddJob() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    skills: [],
  })

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleSkillsChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, skills: typeof value === "string" ? value.split(",") : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Job Posted:", formData)
    navigate("/hr-dashboard")
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <Header>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/hr-dashboard")}
              sx={{ color: "white", textTransform: "none" }}
            >
              Back to Dashboard
            </Button>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Post New Job
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Fill in the details to create a new job posting
              </Typography>
            </Box>
          </Box>
        </Header>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <SectionContainer>
            <SectionHeader>
              <Work sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Job Information
              </Typography>
            </SectionHeader>
            <SectionContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Job Title"
                    placeholder="e.g., Senior Frontend Developer"
                    value={formData.title}
                    onChange={handleChange("title")}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Company Name"
                    placeholder="e.g., TechCorp"
                    value={formData.company}
                    onChange={handleChange("company")}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange("location")}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      value={formData.type}
                      onChange={handleChange("type")}
                      label="Job Type"
                      sx={{ bgcolor: "white" }}
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <StyledTextField
                    fullWidth
                    label="Min Salary"
                    placeholder="e.g., 100000"
                    type="number"
                    value={formData.salaryMin}
                    onChange={handleChange("salaryMin")}
                    InputProps={{
                      startAdornment: "$",
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <StyledTextField
                    fullWidth
                    label="Max Salary"
                    placeholder="e.g., 150000"
                    type="number"
                    value={formData.salaryMax}
                    onChange={handleChange("salaryMax")}
                    InputProps={{
                      startAdornment: "$",
                    }}
                    required
                  />
                </Grid>
              </Grid>
            </SectionContent>
          </SectionContainer>

          {/* Job Description */}
          <SectionContainer>
            <SectionHeader>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Job Description & Requirements
              </Typography>
            </SectionHeader>
            <SectionContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Job Description"
                    placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                    value={formData.description}
                    onChange={handleChange("description")}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Requirements"
                    placeholder="List the requirements, qualifications, and experience needed (one per line)..."
                    value={formData.requirements}
                    onChange={handleChange("requirements")}
                    required
                    helperText="Enter each requirement on a new line"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Required Skills</InputLabel>
                    <Select
                      multiple
                      value={formData.skills}
                      onChange={handleSkillsChange}
                      input={<OutlinedInput label="Required Skills" sx={{ bgcolor: "white" }} />}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              sx={{
                                bgcolor: "rgba(43, 103, 119, 0.1)",
                                color: theme.primary,
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {skillOptions.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </SectionContent>
          </SectionContainer>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <ActionButton
              variant="outlined"
              onClick={() => navigate("/hr-dashboard")}
              sx={{
                borderColor: theme.primary,
                color: theme.primary,
                "&:hover": {
                  borderColor: theme.primaryDark,
                  bgcolor: "rgba(43, 103, 119, 0.05)",
                },
              }}
            >
              Cancel
            </ActionButton>
            <ActionButton
              type="submit"
              variant="contained"
              startIcon={<Save />}
              sx={{
                bgcolor: theme.primary,
                color: "white",
                "&:hover": {
                  bgcolor: theme.primaryDark,
                },
              }}
            >
              Post Job
            </ActionButton>
          </Box>
        </form>
      </PageContainer>
    </ThemeProvider>
  )
}

export default HRAddJob
