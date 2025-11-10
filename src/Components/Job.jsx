"use client"

import { useEffect, useRef, useState } from "react"
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  LinearProgress,
  Tooltip,
  Chip,
  Divider,
  Avatar,
} from "@mui/material"
import styled from "styled-components"
import { jsPDF } from "jspdf"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts"
import {
  Work,
  Assessment,
  Timeline,
  Description,
  Email,
  Download,
  Print,
  CheckCircle,
  Star,
  LocationOn,
  AttachMoney,
  BarChart,
} from "@mui/icons-material"

// Styled components with enhanced styling
const PageContainer = styled(Container)`
  padding: 3rem 0;
  background: linear-gradient(135deg, #c5e8e0 0%, #d8f3eb 100%);
  min-height: 100vh;
`

const SectionPaper = styled(Paper)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(43, 103, 119, 0.2);
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
  }
`

const SectionHeader = styled.div`
  background: linear-gradient(90deg, #2b6777, #52ab98);
  padding: 1.5rem 2rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SectionContent = styled.div`
  padding: 2rem;
  flex: 1;
  overflow: auto;
`

const PDFContainer = styled(Box)`
  width: 100%;
  height: 600px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const CoverLetterContainer = styled(Box)`
  white-space: pre-line;
  line-height: 1.8;
  height: 100%;
  overflow: auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  font-size: 1.05rem;
`

const PDFControls = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(43, 103, 119, 0.1);
  gap: 0.5rem;
`

const StyledButton = styled(Button)`
  background-color: ${(props) => (props.variant === "contained" ? "#2b6777" : "transparent")};
  color: ${(props) => (props.variant === "contained" ? "white" : "#2b6777")};
  border: ${(props) => (props.variant === "outlined" ? "1px solid #2b6777" : "none")};
  border-radius: 8px;
  padding: ${(props) => (props.size === "small" ? "0.5rem 1rem" : "0.75rem 1.5rem")};
  font-weight: 500;
  box-shadow: ${(props) => (props.variant === "contained" ? "0 4px 12px rgba(43, 103, 119, 0.2)" : "none")};
  
  &:hover {
    background-color: ${(props) => (props.variant === "contained" ? "#1e5564" : "rgba(43, 103, 119, 0.1)")};
    box-shadow: ${(props) => (props.variant === "contained" ? "0 6px 16px rgba(43, 103, 119, 0.3)" : "none")};
    transform: translateY(-2px);
  }
  
  transition: all 0.3s ease;
`

const SkillBar = styled(Box)`
  margin-bottom: 1.5rem;
`

const SkillScore = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const GraphContent = styled.div`
  padding: 2rem;
`

// Resume and Cover Letter container
const ResumeAndCoverLetterContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 2rem;
  
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const ResumeContainer = styled(Box)`
  flex: 1;
  min-width: 45%;
  display: flex;
  flex-direction: column;
`

const CoverLetterBox = styled(Box)`
  flex: 1;
  min-width: 55%;
  display: flex;
  flex-direction: column;
`

const JobInfoChip = styled(Chip)`
  background-color: rgba(43, 103, 119, 0.1);
  color: #2b6777;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid rgba(43, 103, 119, 0.2);
  
  .MuiChip-icon {
    color: #2b6777;
  }
`

const OverallMatchBox = styled(Box)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(43, 103, 119, 0.1);
  box-shadow: 0 4px 16px rgba(43, 103, 119, 0.05);
`

const SkillsContainer = styled(Box)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(43, 103, 119, 0.1);
  box-shadow: 0 4px 16px rgba(43, 103, 119, 0.05);
`

const AnalysisBox = styled(Box)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(43, 103, 119, 0.1);
  box-shadow: 0 4px 16px rgba(43, 103, 119, 0.05);
`

// Dummy data
const dummyJobDescription = {
  title: "Senior Frontend Developer",
  company: "Tech Innovations Inc.",
  location: "San Francisco, CA (Remote Available)",
  salary: "$120,000 - $150,000",
  description: `We are seeking a talented Senior Frontend Developer to join our growing team. The ideal candidate will have extensive experience with React, TypeScript, and modern frontend frameworks.

Key Responsibilities: 
• Develop and maintain responsive web applications using React and TypeScript
• Collaborate with designers to implement UI/UX designs
• Work with backend developers to integrate frontend with APIs
• Optimize applications for maximum speed and scalability
• Stay up-to-date with emerging trends and technologies

Requirements:
• 5+ years of experience in frontend development
• Strong proficiency in React, TypeScript, and state management libraries
• Experience with responsive design and cross-browser compatibility
• Knowledge of modern frontend build pipelines and tools
• Excellent problem-solving skills and attention to detail`,
}

const dummyResumeText = `
TAZEEN AMIR 
Karachi, Pakistan | tazeen.amir@example.com | WhatsApp: +92-555-123-4567 | LinkedIn | GitHub

EDUCATION  
Tech Valley University, California, USA  
B.Sc. in Computer Science   Sep 2021 - May 2025  
Concentrations: Data Science and Cloud Computing  
Related Coursework: Operating Systems, Computer Networks

EXPERIENCE  

CloudCore Labs | San Francisco, USA  
Software Intern  |  Jan 2024 - Apr 2024  
Worked on microservices using Node.js and MongoDB.  
Automated deployment pipelines for faster integration.

DeepVision AI | Remote  
AI Fellow  |  Jun 2023 - Aug 2023  
Worked on vision-based ML models using Python and OpenCV.  
Collaborated on LLM integration into web apps.

HealthSync Analytics | Boston, USA  
Data Analyst Intern  |  Mar 2023 - May 2023  
Performed data preprocessing and model training for health datasets.  
Created dashboards for real-time metric visualization.

ByteSpace Ltd. | Chicago, USA  
Backend Developer Intern  |  Jul 2022 - Sep 2022  
Developed APIs using Spring Boot.  
Assisted in bug fixing and version control tasks.

PROJECTS  

Smart Campus App  
Built a full-stack solution using React, Node.js, and Firebase for student services.

SkillTracker  
Developed a portal for tracking learning goals and progress using AI suggestions.

Crop Disease Classifier  
Created a CNN model in TensorFlow to detect plant diseases with 90% accuracy.

ResumeBoost  
A tool using GPT-4 API to generate resumes and job summaries.

StudyMate  
An AI-based platform to manage notes and create quizzes from text uploads.

HealthHero  
Built a MERN app for personalized fitness and diet planning.

SportsIQ  
Applied XGBoost and ensemble models to predict sports outcomes.

ACTIVITIES AND LEADERSHIP  

AI & Robotics Club | California, USA  
Vice President  |  Jan 2023 - Present  
Organized 3 campus-wide hackathons and weekly coding meetups.

SKILLS  
Programming: Python, Java, JavaScript, SQL, C++, React, Node.js, Flask, TensorFlow  
Tools: Git, VS Code, Postman, Docker, JIRA, MySQL, MongoDB, Figma, Linux  
`

const dummyCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the Senior Frontend Developer position at Tech Innovations Inc. With over 6 years of experience in frontend development, I believe my skills and background make me an excellent candidate for this role.

Throughout my career, I have focused on creating responsive, user-friendly web applications using React, TypeScript, and other modern frontend technologies. In my current role at Digital Solutions Inc., I've led the development of our flagship SaaS product, implementing state management solutions and optimizing performance to reduce load times by 40%.

I'm particularly drawn to Tech Innovations because of your commitment to pushing the boundaries of web technology and your collaborative approach to development. Your recent project implementing AI-driven user interfaces aligns perfectly with my interest in combining cutting-edge technology with exceptional user experiences.

My experience includes:
• Building and maintaining large-scale React applications
• Implementing responsive designs that work across all devices
• Optimizing applications for maximum speed and scalability
• Collaborating closely with designers and backend developers
• Mentoring junior developers and conducting code reviews

I am excited about the possibility of bringing my technical expertise and passion for frontend development to your team. I would welcome the opportunity to discuss how my background, skills, and experiences would benefit Tech Innovations Inc.

Thank you for considering my application. I look forward to the possibility of working with your team.

Sincerely,
Tazeen Amir`

// Skill match data
const skillMatchData = [
  { skill: "React", required: true, match: 85 },
  { skill: "TypeScript", required: true, match: 75 },
  { skill: "State Management", required: true, match: 80 },
  { skill: "Responsive Design", required: true, match: 90 },
  { skill: "Frontend Build Tools", required: true, match: 70 },
  { skill: "Problem Solving", required: true, match: 85 },
  { skill: "Cross-browser Compatibility", required: true, match: 65 },
]

// Career progression data for graph
const careerProgressionData = [
  { name: "Current", skillLevel: 65, potential: 65 },
  { name: "3 Months", skillLevel: 65, potential: 75 },
  { name: "6 Months", skillLevel: 65, potential: 82 },
  { name: "1 Year", skillLevel: 65, potential: 90 },
  { name: "2 Years", skillLevel: 65, potential: 95 },
]

export default function JobApplicationPage() {
  const [pdfUrl, setPdfUrl] = useState("")
  const [overallMatch, setOverallMatch] = useState(0)
  const iframeRef = useRef(null)

  // Calculate overall match score
  useEffect(() => {
    const totalScore = skillMatchData.reduce((acc, skill) => acc + skill.match, 0)
    const averageScore = Math.round(totalScore / skillMatchData.length)
    setOverallMatch(averageScore)
  }, [])

  // Generate PDF from resume text
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    doc.setFont("helvetica", "normal")
    let y = 20

    const lines = dummyResumeText.split("\n")

    lines.forEach((line, index) => {
      const trimmed = line.trim()

      // Name
      if (index === 0) {
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text(trimmed, 20, y)
        y += 10
      }
      // Contact info
      else if (index === 1) {
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(trimmed, 20, y)
        y += 8
      }
      // Section Headers
      else if (["EDUCATION", "EXPERIENCE", "PROJECTS", "ACTIVITIES AND LEADERSHIP", "SKILLS"].includes(trimmed)) {
        y += 5
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(trimmed, 20, y)
        y += 5
      }
      // Subheadings (like job titles, degrees)
      else if (/^\w.*\s–\s.*$/.test(trimmed) || /^[A-Z][A-Za-z\s]+(Intern|Fellow)/.test(trimmed)) {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text(trimmed, 20, y)
        y += 6
      }
      // Bullet points
      else if (trimmed.startsWith("")) {
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(trimmed, 25, y)
        y += 5
      }
      // General content
      else if (trimmed !== "") {
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(trimmed, 20, y)
        y += 5
      }
      // Blank line
      else {
        y += 3
      }

      // Avoid overflowing the page
      if (y > 280) {
        doc.addPage()
        y = 20
      }
    })

    return doc
  }

  // Generate PDF on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const doc = generatePDF()
      const pdfBlob = doc.output("blob")

      const blobUrl = URL.createObjectURL(pdfBlob)
      setPdfUrl(blobUrl)

      // Clean up the blob URL to avoid memory leaks
      return () => URL.revokeObjectURL(blobUrl)
    }
  }, [])

  // Handle print resume
  const handlePrintResume = () => {
    if (!iframeRef.current) {
      console.warn("Iframe not ready yet")
      return
    }

    const iframeWindow = iframeRef.current.contentWindow

    if (iframeWindow) {
      iframeWindow.focus()
      iframeWindow.print()
    } else {
      console.warn("Iframe window not available")
    }
  }

  // Handle download resume
  const handleDownloadResume = () => {
    const doc = generatePDF()
    doc.save("tazeen_amir_resume.pdf")
  }

  // Get color based on match percentage
  const getMatchColor = (match) => {
    if (match >= 80) return "#4caf50"
    if (match >= 60) return "#ff9800"
    return "#f44336"
  }

  // Custom tooltip for the graph
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #2b6777",
            p: 1.5,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography color="#2b6777" variant="body2" fontWeight="bold">
            {`Time: ${payload[0].payload.name}`}
          </Typography>
          {payload[0].dataKey === "potential" ? (
            <Typography color="#2b6777" variant="body2">
              {`Potential Skill Level: ${payload[0].value}%`}
            </Typography>
          ) : (
            <Typography color="#2b6777" variant="body2">
              {`Current Skill Level: ${payload[0].value}%`}
            </Typography>
          )}
        </Box>
      )
    }
    return null
  }

  return (
    <PageContainer maxWidth="lg">
      {/* Job Description Section */}
      <SectionPaper elevation={3}>
        <SectionHeader>
          <Work fontSize="large" />
          <Typography variant="h5" component="h2" fontWeight="600" sx={{ m: 0 }}>
            Job Description
          </Typography>
        </SectionHeader>
        <SectionContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#2b6777", fontWeight: 700 }}>
            {dummyJobDescription.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar sx={{ bgcolor: "#2b6777", mr: 2 }}>{dummyJobDescription.company.charAt(0)}</Avatar>
            <Typography variant="h6" sx={{ color: "#2b6777", fontWeight: 600 }}>
              {dummyJobDescription.company}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3, mb: 4 }}>
            <JobInfoChip icon={<LocationOn />} label={dummyJobDescription.location} />
            <JobInfoChip icon={<AttachMoney />} label={dummyJobDescription.salary} />
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Chip label="DESCRIPTION" sx={{ backgroundColor: "#2b6777", color: "white", fontWeight: "bold" }} />
          </Divider>

          <Typography variant="body1" sx={{ color: "#2b6777", fontSize: "1.05rem", lineHeight: 1.8 }}>
            {dummyJobDescription.description.split("\n").map((item, index) => (
              <span key={index}>
                {item}
                <br />
              </span>
            ))}
          </Typography>
        </SectionContent>
      </SectionPaper>

      {/* Skills Match Section */}
      <SectionPaper elevation={3}>
        <SectionHeader>
          <Assessment fontSize="large" />
          <Typography variant="h5" component="h2" fontWeight="600" sx={{ m: 0 }}>
            Skills Match Analysis
          </Typography>
        </SectionHeader>
        <SectionContent>
          <OverallMatchBox>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: getMatchColor(overallMatch), mr: 2, width: 60, height: 60 }}>
                <Typography variant="h5">{overallMatch}%</Typography>
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: "#2b6777", fontWeight: 600 }}>
                  Overall Match
                </Typography>
                <Typography variant="body2" sx={{ color: "#2b6777" }}>
                  Your profile matches {overallMatch}% of the job requirements
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={overallMatch}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(43, 103, 119, 0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getMatchColor(overallMatch),
                },
              }}
            />
          </OverallMatchBox>

          <Typography variant="body1" sx={{ color: "#2b6777", mb: 3, fontSize: "1.05rem" }}>
            Based on your resume and the job requirements, here's how your skills match up:
          </Typography>

          <SkillsContainer>
            {skillMatchData.map((skill) => (
              <SkillBar key={skill.skill}>
                <SkillScore>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ color: "#2b6777", fontWeight: "bold", mr: 1 }}>
                      {skill.skill}
                    </Typography>
                    {skill.required && (
                      <Chip
                        label="Required"
                        size="small"
                        sx={{
                          backgroundColor: "rgba(43, 103, 119, 0.1)",
                          color: "#2b6777",
                          height: 20,
                          fontSize: "0.7rem",
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ color: getMatchColor(skill.match), fontWeight: "bold", mr: 1 }}>
                      {skill.match}%
                    </Typography>
                    {skill.match >= 80 && <CheckCircle fontSize="small" sx={{ color: "#4caf50" }} />}
                  </Box>
                </SkillScore>
                <Tooltip title={`${skill.match}% match`} placement="top">
                  <LinearProgress
                    variant="determinate"
                    value={skill.match}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "rgba(43, 103, 119, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: getMatchColor(skill.match),
                      },
                    }}
                  />
                </Tooltip>
              </SkillBar>
            ))}
          </SkillsContainer>

          <AnalysisBox>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <BarChart sx={{ color: "#2b6777", mr: 1 }} />
              <Typography variant="h6" sx={{ color: "#2b6777", fontWeight: "bold" }}>
                Analysis
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "#2b6777", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Your profile shows a strong match ({overallMatch}%) with this position. Your experience with React and
              responsive design are particularly strong assets. To improve your candidacy, consider strengthening your
              skills in cross-browser compatibility and frontend build tools, which show lower match percentages
              compared to other required skills.
            </Typography>
          </AnalysisBox>
        </SectionContent>
      </SectionPaper>

      {/* Career Progression Graph */}
      <SectionPaper elevation={3}>
        <SectionHeader>
          <Timeline fontSize="large" />
          <Typography variant="h5" component="h2" fontWeight="600" sx={{ m: 0 }}>
            Career Progression Projection
          </Typography>
        </SectionHeader>
        <GraphContent>
          <Typography variant="body1" sx={{ color: "#2b6777", mb: 3, fontSize: "1.05rem", lineHeight: 1.8 }}>
            This graph shows your potential career progression if you focus on developing the required skills for this
            position:
          </Typography>

          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.7)",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 16px rgba(43, 103, 119, 0.05)",
              border: "1px solid rgba(43, 103, 119, 0.1)",
              mb: 3,
            }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={careerProgressionData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(43, 103, 119, 0.2)" />
                <XAxis dataKey="name" stroke="#2b6777" />
                <YAxis
                  stroke="#2b6777"
                  domain={[0, 100]}
                  label={{ value: "Skill Level (%)", angle: -90, position: "insideLeft", style: { fill: "#2b6777" } }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="skillLevel"
                  stroke="#2b6777"
                  strokeWidth={3}
                  name="Current Skills"
                  dot={{ stroke: "#2b6777", strokeWidth: 2, r: 6, fill: "#c5e8e0" }}
                />
                <Line
                  type="monotone"
                  dataKey="potential"
                  stroke="#52ab98"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Potential with New Skills"
                  dot={{ stroke: "#52ab98", strokeWidth: 2, r: 6, fill: "#c5e8e0" }}
                />
                <ReferenceDot
                  x="Current"
                  y={65}
                  r={8}
                  fill="#2b6777"
                  stroke="none"
                  label={{ value: "You are here", position: "top", fill: "#2b6777", fontSize: 14 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <AnalysisBox>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Star sx={{ color: "#2b6777", mr: 1 }} />
              <Typography variant="h6" sx={{ color: "#2b6777", fontWeight: "bold" }}>
                Growth Opportunities
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "#2b6777", fontSize: "1.05rem", lineHeight: 1.8 }}>
              By focusing on improving your TypeScript, frontend build tools, and cross-browser compatibility skills,
              you could significantly enhance your career prospects within 6-12 months. This position offers excellent
              growth potential aligned with your current skill trajectory.
            </Typography>
          </AnalysisBox>
        </GraphContent>
      </SectionPaper>

      {/* Resume and Cover Letter Section - using custom flex container */}
      <ResumeAndCoverLetterContainer>
        {/* Resume Section - left side */}
        <ResumeContainer>
          <SectionPaper elevation={3}>
            <SectionHeader>
              <Description fontSize="large" />
              <Typography variant="h5" component="h2" fontWeight="600" sx={{ m: 0 }}>
                Resume
              </Typography>
            </SectionHeader>
            <PDFControls>
              <StyledButton variant="outlined" size="small" startIcon={<Print />} onClick={handlePrintResume}>
                Print
              </StyledButton>
              <StyledButton variant="contained" size="small" startIcon={<Download />} onClick={handleDownloadResume}>
                Download PDF
              </StyledButton>
            </PDFControls>
            <PDFContainer>
              {pdfUrl ? (
                <iframe ref={iframeRef} src={pdfUrl} title="Resume PDF" />
              ) : (
                <Typography sx={{ color: "#2b6777", p: 3 }}>Loading PDF...</Typography>
              )}
            </PDFContainer>
          </SectionPaper>
        </ResumeContainer>

        {/* Cover Letter Section - right side */}
        <CoverLetterBox>
          <SectionPaper elevation={3}>
            <SectionHeader>
              <Email fontSize="large" />
              <Typography variant="h5" component="h2" fontWeight="600" sx={{ m: 0 }}>
                Cover Letter
              </Typography>
            </SectionHeader>
            <CoverLetterContainer>
              <Typography variant="body1" sx={{ color: "#2b6777", fontSize: "1.05rem", lineHeight: 1.8 }}>
                {dummyCoverLetter}
              </Typography>
            </CoverLetterContainer>
          </SectionPaper>
        </CoverLetterBox>
      </ResumeAndCoverLetterContainer>
    </PageContainer>
  )
}
