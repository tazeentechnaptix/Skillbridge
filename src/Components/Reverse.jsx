import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material"
import {
  Lightbulb,
  TrendingUp,
  CheckCircle,
  HourglassEmpty,
  BarChart,
  Info,
  Bookmark,
  BookmarkBorder,
  Launch,
  ArrowForwardIos,
  Work,
//   Target,
} from "@mui/icons-material"
import Target from '@mui/icons-material/TrackChanges'; // ✅ This icon looks like a "target"

// Theme colors
const theme = {
  primary: "#2b6777",
  primaryLight: "#52ab98",
  primaryDark: "#1a3c48",
  secondary: "#c8d8e4",
  accent: "#f2a154",
  accentDark: "#e67e22",
  tertiary: "#7e57c2",
  background: "#c5e8e0",
  cardBg: "#2b6777",
  success: "#06d6a0",
  warning: "#ffd166",
  error: "#ef476f",
  text: "#ffffff",
  textLight: "#e0e0e0",
  white: "#ffffff",
}

// Mock Data
const dreamJobsData = [
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Analyze complex data to extract insights and inform business decisions.",
  },
  {
    id: "frontend-developer",
    name: "Frontend Developer",
    description: "Build interactive and responsive user interfaces for web applications.",
  },
  {
    id: "backend-developer",
    name: "Backend Developer",
    description: "Develop and maintain server-side logic, databases, and APIs.",
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    description: "Bridge the gap between development and operations, focusing on automation and infrastructure.",
  },
]

const jobSkillsMap = {
  "data-scientist": [
    { name: "Python", level: "advanced", hours: 120, category: "Programming" },
    { name: "SQL", level: "advanced", hours: 80, category: "Databases" },
    { name: "Machine Learning", level: "intermediate", hours: 150, category: "AI/ML" },
    { name: "Statistics", level: "intermediate", hours: 100, category: "Math/Stats" },
    { name: "Data Visualization", level: "intermediate", hours: 60, category: "Data Analysis" },
    { name: "Cloud Platforms", level: "beginner", hours: 40, category: "Cloud" },
  ],
  "frontend-developer": [
    { name: "HTML", level: "advanced", hours: 40, category: "Web Basics" },
    { name: "CSS", level: "advanced", hours: 60, category: "Web Basics" },
    { name: "JavaScript", level: "advanced", hours: 100, category: "Programming" },
    { name: "React", level: "advanced", hours: 120, category: "Frameworks" },
    { name: "TypeScript", level: "intermediate", hours: 80, category: "Programming" },
    { name: "State Management", level: "intermediate", hours: 50, category: "Frameworks" },
  ],
  "backend-developer": [
    { name: "Node.js", level: "advanced", hours: 100, category: "Programming" },
    { name: "Python", level: "intermediate", hours: 80, category: "Programming" },
    { name: "SQL", level: "advanced", hours: 70, category: "Databases" },
    { name: "MongoDB", level: "intermediate", hours: 60, category: "Databases" },
    { name: "API Design", level: "advanced", hours: 90, category: "Architecture" },
    { name: "Cloud Platforms", level: "beginner", hours: 50, category: "Cloud" },
  ],
  "devops-engineer": [
    { name: "Linux", level: "advanced", hours: 80, category: "OS/Admin" },
    { name: "Docker", level: "advanced", hours: 100, category: "Containerization" },
    { name: "Kubernetes", level: "intermediate", hours: 120, category: "Orchestration" },
    { name: "AWS/Azure/GCP", level: "intermediate", hours: 150, category: "Cloud" },
    { name: "CI/CD", level: "intermediate", hours: 90, category: "Automation" },
    { name: "Scripting", level: "advanced", hours: 70, category: "Programming" },
  ],
}

const learningPathsMap = {
  "data-scientist": [
    {
      step: 1,
      title: "Foundations of Programming (Python)",
      description: "Master Python basics, data structures, and algorithms.",
      estimatedHours: 60,
      skillsCovered: ["Python"],
    },
    {
      step: 2,
      title: "SQL for Data Analysis",
      description: "Learn to query and manipulate data in relational databases.",
      estimatedHours: 40,
      skillsCovered: ["SQL"],
    },
    {
      step: 3,
      title: "Statistics and Probability",
      description: "Understand statistical concepts essential for data science.",
      estimatedHours: 50,
      skillsCovered: ["Statistics"],
    },
    {
      step: 4,
      title: "Introduction to Machine Learning",
      description: "Explore core ML algorithms and concepts with Python libraries.",
      estimatedHours: 70,
      skillsCovered: ["Machine Learning", "Python"],
    },
    {
      step: 5,
      title: "Data Visualization & Communication",
      description: "Create compelling visualizations and present data insights.",
      estimatedHours: 30,
      skillsCovered: ["Data Visualization"],
    },
    {
      step: 6,
      title: "Cloud & Big Data Fundamentals",
      description: "Get familiar with cloud services and big data tools.",
      estimatedHours: 40,
      skillsCovered: ["Cloud Platforms"],
    },
  ],
  "frontend-developer": [
    {
      step: 1,
      title: "HTML & CSS Essentials",
      description: "Build semantic HTML structures and style them with modern CSS.",
      estimatedHours: 50,
      skillsCovered: ["HTML", "CSS"],
    },
    {
      step: 2,
      title: "JavaScript Fundamentals",
      description: "Master core JavaScript concepts, DOM manipulation, and ES6+ features.",
      estimatedHours: 70,
      skillsCovered: ["JavaScript"],
    },
    {
      step: 3,
      title: "React.js Basics",
      description: "Learn component-based architecture, props, state, and hooks.",
      estimatedHours: 60,
      skillsCovered: ["React", "JavaScript"],
    },
    {
      step: 4,
      title: "Advanced React & State Management",
      description: "Dive into advanced patterns, context API, and state management libraries.",
      estimatedHours: 60,
      skillsCovered: ["React", "State Management"],
    },
    {
      step: 5,
      title: "TypeScript Integration",
      description: "Add static typing to your React applications for better maintainability.",
      estimatedHours: 40,
      skillsCovered: ["TypeScript", "React"],
    },
    {
      step: 6,
      title: "Performance & Best Practices",
      description: "Optimize web apps for various devices and improve loading times.",
      estimatedHours: 30,
      skillsCovered: ["CSS"],
    },
  ],
  "backend-developer": [
    {
      step: 1,
      title: "Node.js & Express.js Basics",
      description: "Build server-side applications with Node.js and the Express framework.",
      estimatedHours: 50,
      skillsCovered: ["Node.js"],
    },
    {
      step: 2,
      title: "Database Fundamentals",
      description: "Learn to design and interact with relational and non-relational databases.",
      estimatedHours: 70,
      skillsCovered: ["SQL", "MongoDB"],
    },
    {
      step: 3,
      title: "API Design & Development",
      description: "Master building RESTful APIs and explore GraphQL concepts.",
      estimatedHours: 60,
      skillsCovered: ["API Design"],
    },
    {
      step: 4,
      title: "Authentication & Authorization",
      description: "Implement secure user authentication and authorization mechanisms.",
      estimatedHours: 40,
      skillsCovered: ["Node.js"],
    },
    {
      step: 5,
      title: "Testing & Deployment",
      description: "Write unit/integration tests and deploy your backend applications.",
      estimatedHours: 30,
      skillsCovered: ["Node.js"],
    },
    {
      step: 6,
      title: "Cloud Services Integration",
      description: "Understand how to deploy and manage backend services on cloud platforms.",
      estimatedHours: 50,
      skillsCovered: ["Cloud Platforms"],
    },
  ],
  "devops-engineer": [
    {
      step: 1,
      title: "Linux & Command Line Proficiency",
      description: "Become proficient with Linux operating systems and shell scripting.",
      estimatedHours: 60,
      skillsCovered: ["Linux", "Scripting"],
    },
    {
      step: 2,
      title: "Version Control with Git",
      description: "Master Git for collaborative development and code management.",
      estimatedHours: 30,
      skillsCovered: [],
    },
    {
      step: 3,
      title: "Containerization with Docker",
      description: "Learn to build, run, and manage applications using Docker containers.",
      estimatedHours: 70,
      skillsCovered: ["Docker"],
    },
    {
      step: 4,
      title: "Orchestration with Kubernetes",
      description: "Understand how to deploy, scale, and manage containerized applications.",
      estimatedHours: 80,
      skillsCovered: ["Kubernetes"],
    },
    {
      step: 5,
      title: "Cloud Infrastructure",
      description: "Gain hands-on experience with cloud provider services for infrastructure management.",
      estimatedHours: 100,
      skillsCovered: ["AWS/Azure/GCP"],
    },
    {
      step: 6,
      title: "CI/CD Pipelines",
      description: "Implement continuous integration and continuous delivery pipelines.",
      estimatedHours: 60,
      skillsCovered: ["CI/CD"],
    },
  ],
}

const mockJobOpenings = [
  {
    id: 1,
    title: "Senior Data Scientist",
    company: "DataInsights Inc.",
    location: "Remote",
    domain: ["Python", "Machine Learning", "SQL"],
    description: "Lead data science initiatives, build predictive models, and deliver actionable insights.",
    salary: "$130,000 - $160,000",
    posted: "5 days ago",
    externalLink: "https://example.com/jobs/data-scientist-1",
    requiredSkills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
    targetJob: "data-scientist",
  },
  {
    id: 2,
    title: "Junior Frontend Developer",
    company: "WebSolutions Co.",
    location: "New York, NY",
    domain: ["React", "JavaScript", "CSS"],
    description: "Join our team to develop and maintain user-facing features using modern frontend technologies.",
    salary: "$70,000 - $90,000",
    posted: "2 days ago",
    externalLink: "https://example.com/jobs/frontend-dev-1",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React"],
    targetJob: "frontend-developer",
  },
  {
    id: 3,
    title: "Backend Engineer (Node.js)",
    company: "API Builders",
    location: "San Francisco, CA",
    domain: ["Node.js", "MongoDB", "API"],
    description: "Design and implement robust backend services and APIs for our growing platform.",
    salary: "$110,000 - $140,000",
    posted: "1 week ago",
    externalLink: "https://example.com/jobs/backend-dev-1",
    requiredSkills: ["Node.js", "SQL", "MongoDB", "API Design"],
    targetJob: "backend-developer",
  },
  {
    id: 4,
    title: "Cloud DevOps Engineer",
    company: "CloudOps Inc.",
    location: "Remote",
    domain: ["AWS", "Docker", "Kubernetes"],
    description: "Automate infrastructure and deployment processes in a cloud-native environment.",
    salary: "$120,000 - $150,000",
    posted: "3 days ago",
    externalLink: "https://example.com/jobs/devops-1",
    requiredSkills: ["Linux", "Docker", "Kubernetes", "AWS/Azure/GCP", "CI/CD"],
    targetJob: "devops-engineer",
  },
]

const mockUserSkills = ["React", "JavaScript", "HTML", "CSS", "SQL", "Python"]

const CareerGoalMappingPage = () => {
  const [selectedJobId, setSelectedJobId] = useState("")
  const [requiredSkills, setRequiredSkills] = useState([])
  const [learningRoadmap, setLearningRoadmap] = useState([])
  const [matchedJobOpenings, setMatchedJobOpenings] = useState([])
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    if (selectedJobId) {
      setRequiredSkills(jobSkillsMap[selectedJobId] || [])
      setLearningRoadmap(learningPathsMap[selectedJobId] || [])
      setMatchedJobOpenings(mockJobOpenings.filter((job) => job.targetJob === selectedJobId))
    } else {
      setRequiredSkills([])
      setLearningRoadmap([])
      setMatchedJobOpenings([])
    }
  }, [selectedJobId])

  const handleJobChange = (event) => {
    setSelectedJobId(event.target.value)
  }

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const calculateOverallProgress = () => {
    if (!selectedJobId) return 0
    const totalRequiredSkills = requiredSkills.length
    if (totalRequiredSkills === 0) return 100

    const acquiredSkillsCount = requiredSkills.filter((skill) => 
      mockUserSkills.includes(skill.name)
    ).length
    return Math.round((acquiredSkillsCount / totalRequiredSkills) * 100)
  }

  const getSkillMatchPercentage = (skillName) => {
    return mockUserSkills.includes(skillName) ? 100 : 0
  }

  const getMatchColor = (match) => {
    if (match >= 80) return theme.success
    if (match >= 40) return theme.warning
    return theme.error
  }

  const totalLearningHours = requiredSkills.reduce((sum, skill) => sum + skill.hours, 0)

  const learningHoursByCategory = requiredSkills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + skill.hours
    return acc
  }, {})

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: `linear-gradient(135deg, ${theme.background} 0%, #a3d5cb 100%)`,
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          sx={{
            mb: 4,
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
            color: theme.white,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              right: "-50%",
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              transform: "rotate(30deg)",
            }
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Target sx={{ fontSize: 40, color: theme.accent }} />
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Career Goal Reverse Mapping
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 3 }}>
              Select your dream job, and we'll map out the skills, learning path, and relevant opportunities.
            </Typography>
            <FormControl sx={{ minWidth: 300, bgcolor: "rgba(255,255,255,0.1)", borderRadius: 1 }}>
              <InputLabel sx={{ color: "white" }}>Select Dream Job</InputLabel>
              <Select
                value={selectedJobId}
                onChange={handleJobChange}
                label="Select Dream Job"
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.5)" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.accent },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {dreamJobsData.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {selectedJobId && (
          <>
            {/* Overall Progress */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: theme.cardBg, color: theme.white, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                  <BarChart sx={{ color: theme.accent }} />
                  Overall Goal Progress
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.accent }}>
                  {calculateOverallProgress()}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculateOverallProgress()}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getMatchColor(calculateOverallProgress()),
                    borderRadius: 6,
                  },
                }}
              />
            </Paper>

            {/* Key Insights */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, bgcolor: theme.cardBg, color: theme.white, textAlign: "center", borderRadius: 2 }}>
                  <Info sx={{ fontSize: 48, color: theme.accent, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Dream Job
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.textLight }}>
                    {dreamJobsData.find((job) => job.id === selectedJobId)?.name}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, bgcolor: theme.cardBg, color: theme.white, textAlign: "center", borderRadius: 2 }}>
                  <Lightbulb sx={{ fontSize: 48, color: theme.primaryLight, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Skills to Acquire
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.textLight }}>
                    {requiredSkills.length} unique skills
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, bgcolor: theme.cardBg, color: theme.white, textAlign: "center", borderRadius: 2 }}>
                  <HourglassEmpty sx={{ fontSize: 48, color: theme.tertiary, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Estimated Learning
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.textLight }}>
                    {totalLearningHours} hours
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Required Skills */}
            <Paper sx={{ mb: 3, bgcolor: theme.cardBg, color: theme.white, borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ p: 3, bgcolor: theme.primary }}>
                <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                  <Lightbulb sx={{ color: theme.accent }} />
                  Required Skills for {dreamJobsData.find((job) => job.id === selectedJobId)?.name}
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ mb: 3, color: theme.textLight }}>
                  These are the core competencies you'll need to master for this role, along with your current proficiency.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {requiredSkills.map((skill, index) => {
                    const proficiency = getSkillMatchPercentage(skill.name)
                    return (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ width: 150, textAlign: "right", fontWeight: 500 }}>
                          {skill.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={proficiency}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "rgba(0, 0, 0, 0.4)",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: getMatchColor(proficiency),
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                        <Typography sx={{ width: 50, fontWeight: 600, color: getMatchColor(proficiency) }}>
                          {proficiency}%
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Paper>

            {/* Learning Hours Breakdown */}
            <Paper sx={{ mb: 3, bgcolor: theme.cardBg, color: theme.white, borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ p: 3, bgcolor: theme.primary }}>
                <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                  <BarChart sx={{ color: theme.accent }} />
                  Learning Hours Breakdown
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ mb: 3, color: theme.textLight }}>
                  A breakdown of estimated learning hours by skill category.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {Object.entries(learningHoursByCategory).map(([category, hours], index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography sx={{ width: 150, textAlign: "right", fontWeight: 500 }}>
                        {category}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(hours / totalLearningHours) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: theme.primaryLight,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                      <Typography sx={{ width: 60, fontWeight: 600, color: theme.primaryLight }}>
                        {hours} hrs
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>

            {/* Learning Roadmap */}
            <Paper sx={{ mb: 3, bgcolor: theme.cardBg, color: theme.white, borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ p: 3, bgcolor: theme.primary }}>
                <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUp sx={{ color: theme.accent }} />
                  Suggested Learning Roadmap
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ mb: 3, color: theme.textLight }}>
                  Follow this structured path to acquire the necessary skills efficiently.
                </Typography>
                <Box>
                  {learningRoadmap.map((step, index) => (
                    <Box key={step.step} sx={{ display: "flex", gap: 2, mb: 3 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            bgcolor: theme.accent,
                            color: theme.white,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 18,
                          }}
                        >
                          {step.step}
                        </Box>
                        {index < learningRoadmap.length - 1 && (
                          <Box
                            sx={{
                              width: 2,
                              height: 60,
                              bgcolor: theme.primaryLight,
                              mt: 1,
                            }}
                          />
                        )}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.primaryLight, mb: 1 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.textLight, mb: 2 }}>
                          {step.description}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {step.skillsCovered.map((skill, sIndex) => (
                            <Chip
                              key={sIndex}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.1)",
                                color: theme.white,
                                border: `1px solid ${theme.primaryLight}`,
                              }}
                            />
                          ))}
                          <Chip
                            label={`${step.estimatedHours} hours`}
                            size="small"
                            sx={{
                              bgcolor: theme.accent + "33",
                              color: theme.accentDark,
                              border: `1px solid ${theme.accent}`,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        bgcolor: theme.success,
                        color: theme.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircle />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.success, mb: 1 }}>
                        Goal Achieved!
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.textLight }}>
                        You're now ready to pursue your dream job.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Real Job Openings */}
            <Paper sx={{ mb: 3, bgcolor: theme.cardBg, color: theme.white, borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ p: 3, bgcolor: theme.primary }}>
                <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                  <Work sx={{ color: theme.accent }} />
                  Real Job Openings
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ mb: 3, color: theme.textLight }}>
                  Explore current job opportunities that align with your chosen career path.
                </Typography>
                {matchedJobOpenings.length > 0 ? (
                  <Grid container spacing={3}>
                    {matchedJobOpenings.map((job) => (
                      <Grid item xs={12} md={6} key={job.id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            bgcolor: theme.cardBg,
                            color: theme.white,
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: 2,
                          }}
                        >
                          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {job.title}
                              </Typography>
                              <Typography variant="subtitle1" sx={{ color: theme.textLight }}>
                                {job.company}
                              </Typography>
                              <Typography variant="caption" sx={{ color: theme.textLight }}>
                                {job.location} • Posted {job.posted}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={() => toggleSaveJob(job.id)}
                              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                            >
                              {savedJobs.includes(job.id) ? <Bookmark /> : <BookmarkBorder />}
                            </IconButton>
                          </Box>
                          <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                            <Typography variant="h6" sx={{ color: theme.accent, fontWeight: 600, mb: 2 }}>
                              {job.salary}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              {job.domain.map((domain, index) => (
                                <Chip
                                  key={index}
                                  label={domain}
                                  size="small"
                                  sx={{
                                    mr: 0.5,
                                    mb: 0.5,
                                    bgcolor: "rgba(255, 255, 255, 0.15)",
                                    color: theme.white,
                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                  }}
                                />
                              ))}
                            </Box>
                            <Divider sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />
                            <Typography variant="body2" sx={{ color: theme.textLight, mb: 2 }}>
                              {job.description}
                            </Typography>
                            
                            {/* Skills Match */}
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  Skills Match
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {Math.round(
                                    (job.requiredSkills.filter((skill) => 
                                      requiredSkills.some((rs) => rs.name === skill)
                                    ).length / job.requiredSkills.length) * 100
                                  )}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={Math.round(
                                  (job.requiredSkills.filter((skill) => 
                                    requiredSkills.some((rs) => rs.name === skill)
                                  ).length / job.requiredSkills.length) * 100
                                )}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: (() => {
                                      const match = Math.round(
                                        (job.requiredSkills.filter((skill) => 
                                          requiredSkills.some((rs) => rs.name === skill)
                                        ).length / job.requiredSkills.length) * 100
                                      )
                                      return match > 70 ? theme.success : match > 40 ? theme.warning : theme.error
                                    })(),
                                    borderRadius: 4,
                                  },
                                }}
                              />
                            </Box>
                          </CardContent>
                          <CardActions sx={{ p: 2, pt: 0 }}>
                            <Button
                              variant="contained"
                              component="a"
                              href={job.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              endIcon={<Launch />}
                              sx={{
                                mr: 1,
                                bgcolor: theme.accent,
                                "&:hover": { bgcolor: theme.accentDark },
                                textTransform: "none",
                                fontWeight: 600,
                              }}
                            >
                              Apply Now
                            </Button>
                            <Button
                              variant="outlined"
                              endIcon={<ArrowForwardIos />}
                              sx={{
                                color: theme.white,
                                borderColor: "rgba(255, 255, 255, 0.3)",
                                "&:hover": { borderColor: "rgba(255, 255, 255, 0.5)" },
                                textTransform: "none",
                              }}
                            >
                              Details
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1" sx={{ color: theme.textLight, textAlign: "center", py: 4 }}>
                    No job openings found for this career goal yet.
                  </Typography>
                )}
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  )
}

export default CareerGoalMappingPage