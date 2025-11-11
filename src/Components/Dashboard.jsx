"use client"

import { useState, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Divider,
  Avatar,
  IconButton,
  LinearProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  Work,
  School,
  Code,
  ArrowForward,
  BookmarkBorder,
  Bookmark,
  Star,
  Search,
  FilterList,
  Notifications,
  Add,
  Launch,
  ArrowForwardIos,
  LocationOn,
  AccessTime,
  CheckCircle,
  Dashboard as DashboardIcon,
  Settings,
  LinkedIn,
  QuestionAnswer,
  Psychology,
  TrendingUp,
  PersonSearch,
  VideoCall,
  Chat,
  Close,
  Send,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"

// Theme object aligned with job application page
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
  cardBackground: "#e0e7ee", // Changed from #f0f5f9 to a darker gray shade
}

// Global styles with gradient background matching job application page
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

const DashboardHeader = styled(motion.div)`
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
  background-color: ${(props) => props.theme.cardBackground};
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

const SkillChip = styled(motion(Chip))`
  margin: 0.5rem;
  padding: 0.5rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.level === "advanced"
      ? "rgba(82, 171, 152, 0.15)"
      : props.level === "intermediate"
        ? "rgba(242, 161, 84, 0.15)"
        : "rgba(126, 87, 194, 0.15)"};
  border: 1px solid ${(props) =>
    props.level === "advanced"
      ? props.theme.primaryLight
      : props.level === "intermediate"
        ? props.theme.accent
        : props.theme.tertiary};
  color: ${(props) =>
    props.level === "advanced"
      ? props.theme.primaryDark
      : props.level === "intermediate"
        ? props.theme.accentDark
        : props.theme.tertiary};
  
  &:hover {
    background-color: ${(props) =>
      props.level === "advanced"
        ? "rgba(82, 171, 152, 0.25)"
        : props.level === "intermediate"
          ? "rgba(242, 161, 84, 0.25)"
          : "rgba(126, 87, 194, 0.25)"};
  }
`

const CourseCard = styled(motion(Card))`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  border: ${(props) => (props.enrolled ? `2px solid ${props.theme.success}` : "1px solid rgba(43, 103, 119, 0.2)")};
  background-color: ${(props) => props.theme.cardBackground};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  ${(props) =>
    props.enrolled &&
    `
    &:before {
      content: 'Enrolled';
      position: absolute;
      top: 12px;
      right: 12px;
      background: ${props.theme.success};
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
  `}
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`

const JobDomain = styled(Chip)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: rgba(43, 103, 119, 0.1);
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  border: 1px solid rgba(43, 103, 119, 0.2);
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

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  color: ${(props) => (props.primary ? "white" : props.theme.primary)};
  background: ${(props) => (props.primary ? props.theme.primary : "transparent")};
  border: ${(props) => (props.primary ? "none" : `1px solid ${props.theme.primary}`)};
  box-shadow: ${(props) => (props.primary ? "0 4px 15px rgba(43, 103, 119, 0.2)" : "none")};
  
  &:hover {
    background: ${(props) => (props.primary ? props.theme.primaryDark : "rgba(43, 103, 119, 0.1)")};
    box-shadow: ${(props) => (props.primary ? "0 6px 20px rgba(43, 103, 119, 0.3)" : "0 4px 10px rgba(43, 103, 119, 0.1)")};
  }
`

const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 300px;
  backdrop-filter: blur(5px);
  
  & input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    background: transparent;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`

const SkillsContainer = styled(Box)`
  background: linear-gradient(135deg, rgba(240, 245, 249, 0.7) 0%, rgba(240, 245, 249, 0.9) 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(43, 103, 119, 0.1);
  box-shadow: 0 4px 16px rgba(43, 103, 119, 0.05);
`

const AddSkillButton = styled(Button)`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(43, 103, 119, 0.2);
  
  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    box-shadow: 0 6px 15px rgba(43, 103, 119, 0.3);
  }
`

const NavIconButton = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  margin-left: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }
`

const FeatureCard = styled(motion(Card))`
  height: 70%;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  background: ${props => props.gradient || 'linear-gradient(135deg, #2b6777 0%, #52ab98 100%)'} !important;
  border: none;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    transform: scale(0);
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3) !important;

    &:before {
      transform: scale(1);
    }
  }
`

const FeatureIcon = styled(Box)`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);

  ${FeatureCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`

const FeatureTitle = styled(Typography)`
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const FeatureDescription = styled(Typography)`
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  font-size: 0.8rem;
  line-height: 1.4;
  font-weight: 500;
`

// Chatbot Styles
const ChatbotButton = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.primaryDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(43, 103, 119, 0.5);
  }
`

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 380px;
  height: 550px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(43, 103, 119, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  border: 2px solid ${props => props.theme.primary};
`

const ChatHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.primaryDark} 100%);
  color: white;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 10px;
  }
`

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 0.875rem 1.125rem;
  border-radius: ${props => props.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
  background: ${props => props.isUser 
    ? `linear-gradient(135deg, ${props.theme.primary} 0%, ${props.theme.primaryLight} 100%)` 
    : 'white'};
  color: ${props => props.isUser ? 'white' : props.theme.text};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  word-wrap: break-word;
  line-height: 1.5;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const ChatInputContainer = styled.div`
  padding: 1rem 1.5rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`

const ChatInput = styled.input`
  flex: 1;
  padding: 0.875rem 1.125rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px rgba(43, 103, 119, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`

const SendButton = styled(IconButton)`
  background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.primaryDark} 100%);
  color: white;
  padding: 0.625rem;
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.primaryDark} 0%, ${props => props.theme.primary} 100%);
    transform: scale(1.05);
  }

  &:disabled {
    background: #ccc;
    color: #666;
  }
`

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 0.875rem 1.125rem;
  background: white;
  border-radius: 18px;
  align-self: flex-start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    animation: typing 1.4s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-10px);
    }
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

const chipVariants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
}

// Mock Data
const hardSkillsData = [
  { id: 1, name: "React", level: "advanced" },
  { id: 2, name: "JavaScript", level: "advanced" },
  { id: 4, name: "Node.js", level: "intermediate" },
  { id: 5, name: "CSS", level: "advanced" },
  { id: 6, name: "HTML", level: "advanced" },
  { id: 7, name: "Redux", level: "intermediate" },
  { id: 9, name: "MongoDB", level: "intermediate" },
  { id: 10, name: "SQL", level: "beginner" },
  { id: 10, name: "Redux", level: "advanced" }
]

const softSkillsData = [
  { id: 11, name: "Communication", level: "advanced" },
  { id: 12, name: "Teamwork", level: "advanced" },
  { id: 13, name: "Problem Solving", level: "intermediate" },
  { id: 14, name: "Time Management", level: "intermediate" },
  { id: 15, name: "Leadership", level: "beginner" },
]

// New skills data that can be added
const newSkillsData = [
  { id: 103, name: "GraphQL", level: "beginner" },
  { id: 104, name: "Vue.js", level: "beginner" },
  { id: 105, name: "Angular", level: "beginner" },
  { id: 106, name: "Kubernetes", level: "beginner" },
  { id: 107, name: "Typescript", level: "beginner" }
]

// New soft skills data that can be added
const newSoftSkillsData = [
  { id: 111, name: "Creativity", level: "intermediate" },
  { id: 112, name: "Critical Thinking", level: "beginner" },
  { id: 113, name: "Adaptability", level: "intermediate" },
  { id: 114, name: "Emotional Intelligence", level: "beginner" },
]

// Update the coursesData to mark one as enrolled
const coursesData = [
  {
    id: 1,
    title: "Advanced React Patterns",
    provider: "Frontend Masters",
    description: "Learn advanced React patterns and techniques to build scalable applications.",
    image: "data:image/png;base64,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",
    duration: "8 hours",
    level: "Advanced",
    rating: 4.8,
    enrolled: true,
    progress: 35,
    skills: ["React", "JavaScript"],
  },
  {
    id: 2,
    title: "GraphQL Fundamentals",
    provider: "Apollo",
    description: "Master GraphQL queries, mutations, and integrations with React.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3YComPX9TvrEWz8blolTSw8z1_-8uJp9JA&s",
    duration: "6 hours",
    level: "Intermediate",
    rating: 4.5,
    enrolled: false,
    skills: ["GraphQL", "React", "JavaScript"],
  },
  {
    id: 3,
    title: "TypeScript for React Developers",
    provider: "Udemy",
    description: "Learn how to use TypeScript effectively with React applications.",
    image: "data:image/png;base64,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",
    duration: "10 hours",
    level: "Intermediate",
    rating: 4.7,
    enrolled: false,
    skills: ["TypeScript", "React"],
  },
]

const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=60&width=120",
    location: "San Francisco, CA (Remote)",
    domain: ["React", "TypeScript", "Redux"],
    description:
      "We are looking for a Senior Frontend Developer to join our team and help build our next-generation web applications.",
    salary: "$70 - $72 an hour",
    posted: "2 days ago",
    externalLink: "https://www.indeed.com/viewjob?jk=ed67dc0cbdfdb13e&from=shareddesktop_copy",
    requiredSkills: ["React", "TypeScript", "Redux", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateTech",
    logo: "/placeholder.svg?height=60&width=120",
    location: "New York, NY (Hybrid)",
    domain: ["React", "Node.js", "MongoDB"],
    description: "Join our dynamic team to develop full-stack applications using modern JavaScript frameworks.",
    salary: "$90,000 - $110,000 a year",
    posted: "3 days ago",
    externalLink: "https://www.indeed.com/viewjob?jk=fa92d82699d4f28e&from=shareddesktop_copy",
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 3,
    title: "UI/UX Developer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=60&width=120",
    location: "Austin, TX (Remote)",
    domain: ["React", "CSS", "Figma"],
    description:
      "Looking for a talented UI/UX Developer to create beautiful and intuitive user interfaces for our products.",
    salary: "$100,000 - $130,000",
    posted: "3 days ago",
    externalLink: "https://example.com/jobs/ui-ux-developer",
    requiredSkills: ["React", "CSS", "HTML", "JavaScript", "Figma","Adobe"],
  },
]

function Dashboard() {
  const navigate = useNavigate()
  const [savedJobs, setSavedJobs] = useState([])
  const [savedCourses, setSavedCourses] = useState([])
  const [userSkills, setUserSkills] = useState([...hardSkillsData.map((skill) => skill.name)])
  const [userSoftSkills, setUserSoftSkills] = useState([...softSkillsData.map((skill) => skill.name)])
  const [availableSkills, setAvailableSkills] = useState([...newSkillsData])
  const [availableSoftSkills, setAvailableSoftSkills] = useState([...newSoftSkillsData])
  const [jobProgress, setJobProgress] = useState({})
  
  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your SkillBridge AI assistant. How can I help you today?", isUser: false }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Google Gemini AI integration
  const GEMINI_API_KEY = "AIzaSyABnhLfsFuH1W7OMve9-XTVSReO5aH7-dM"
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

  const sendMessageToGemini = async (message) => {
    try {
      setIsTyping(true)
      
      // Initialize the model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
      
      // Create the prompt with context
      const prompt = `You are a helpful career guidance assistant for SkillBridge platform. Help users with career advice, skills development, job search tips, interview preparation, and professional growth. Keep responses concise, friendly, and actionable. Do not use asterisks or any markdown formatting in your responses - use plain text only.please provide defentive answers and thn explain the answer to the user in plain language.

User question: ${message}

Provide a helpful response:`

      console.log("Sending request to Gemini 2.0 Flash")
      
      // Generate content
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log("API Success Response:", text)
      
      setMessages(prev => [...prev, { text: text, isUser: false }])
      setIsTyping(false)
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      setMessages(prev => [...prev, { 
        text: `I apologize, but I'm having trouble connecting right now. Please try again later. (${error.message})`, 
        isUser: false 
      }])
      setIsTyping(false)
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isUser: true }])
    
    // Send to Gemini
    sendMessageToGemini(inputMessage)
    
    // Clear input
    setInputMessage("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Calculate job match percentages on component mount
  useEffect(() => {
    updateJobMatches()
  }, [])

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const toggleSaveCourse = (courseId) => {
    if (savedCourses.includes(courseId)) {
      setSavedCourses(savedCourses.filter((id) => id !== courseId))
    } else {
      setSavedCourses([...savedCourses, courseId])
    }
  }

  const handleEnrollClick = (courseId) => {
    // For enrolled courses, just add a green border outline
    if (coursesData.find((course) => course.id === courseId)?.enrolled) {
      return
    }

    // For non-enrolled courses, would typically handle enrollment logic
    // For this UI demo, we're just showing what would happen
  }

  // Function to add a skill to user skills
  const addSkill = (skill) => {
    setUserSkills([...userSkills, skill.name])
    setAvailableSkills(availableSkills.filter((s) => s.id !== skill.id))

    // Recalculate job matches after adding a skill
    updateJobMatches()
  }

  // Function to add a soft skill
  const addSoftSkill = (skill) => {
    setUserSoftSkills([...userSoftSkills, skill.name])
    setAvailableSoftSkills(availableSoftSkills.filter((s) => s.id !== skill.id))
  }

  // Function to calculate job match percentage
  function calculateJobMatch(job) {
    const matchedSkills = job.requiredSkills.filter((skill) => userSkills.includes(skill))
    return Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
  }

  // Function to update all job matches
  const updateJobMatches = () => {
    const newJobProgress = {}
    jobsData.forEach((job) => {
      newJobProgress[job.id] = calculateJobMatch(job)
    })
    setJobProgress(newJobProgress)
  }

  // Get color based on match percentage
  const getMatchColor = (match) => {
    if (match >= 80) return theme.success
    if (match >= 60) return theme.warning
    return theme.error
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial="hidden" animate="visible" variants={containerVariants}>
        {/* Dashboard Header */}
        <DashboardHeader variants={itemVariants}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "white",
                color: theme.primary,
                width: 60,
                height: 60,
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              JD
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "white" }}>
                Welcome back, Tazeen!
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                You have 3 new job recommendations based on your skills
              </Typography>
            </Box>
            {/* Added navigation icons with links */}
            <Box sx={{ display: "flex", ml: 2 }}>
              <NavIconButton component={Link} to="/reverse">
                <DashboardIcon />
              </NavIconButton>
              <NavIconButton component={Link} to="/linkd">
                <LinkedIn />
              </NavIconButton>
              <NavIconButton component={Link} to="/aisim">
                <Settings />
              </NavIconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <SearchBar>
              <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              <input placeholder="Search..." />
            </SearchBar>
            <IconButton
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                },
              }}
            >
              <FilterList />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                },
              }}
            >
              <Notifications />
            </IconButton>
          </Box>
        </DashboardHeader>

        {/* Feature Navigation Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <DashboardIcon sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Key Features - Quick Access</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
              <Box sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '200px' }}>
                <FeatureCard
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => navigate('/aisim')}
                  gradient="linear-gradient(135deg, #7e57c2 0%, #b085f5 100%)"
                  style={{ background: 'linear-gradient(135deg, #7e57c2 0%, #b085f5 100%)' }}
                >
                  <FeatureIcon>
                    <Psychology sx={{ fontSize: 40 }} />
                  </FeatureIcon>
                  <FeatureTitle variant="h6">AI Simulation</FeatureTitle>
                  <FeatureDescription>
                    Practice with AI simulations
                  </FeatureDescription>
                </FeatureCard>
              </Box>
              
              <Box sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '200px' }}>
                <FeatureCard
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => navigate('/linkd')}
                  gradient="linear-gradient(135deg, #0a66c2 0%, #0077b5 100%)"
                  style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #0077b5 100%)' }}
                >
                  <FeatureIcon>
                    <LinkedIn sx={{ fontSize: 40 }} />
                  </FeatureIcon>
                  <FeatureTitle variant="h6">LinkedIn Influencer</FeatureTitle>
                  <FeatureDescription>
                    Boost your LinkedIn presence
                  </FeatureDescription>
                </FeatureCard>
              </Box>

              <Box sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '200px' }}>
                <FeatureCard
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => navigate('/reverse')}
                  gradient="linear-gradient(135deg, #f2a154 0%, #e67e22 100%)"
                  style={{ background: 'linear-gradient(135deg, #f2a154 0%, #e67e22 100%)' }}
                >
                  <FeatureIcon>
                    <TrendingUp sx={{ fontSize: 40 }} />
                  </FeatureIcon>
                  <FeatureTitle variant="h6">Reverse Mapping</FeatureTitle>
                  <FeatureDescription>
                    Map your career path
                  </FeatureDescription>
                </FeatureCard>
              </Box>

              <Box sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '200px' }}>
                <FeatureCard
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => navigate('/portfolio')}
                  gradient="linear-gradient(135deg, #9c27b0 0%, #e1bee7 100%)"
                  style={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e1bee7 100%)' }}
                >
                  <FeatureIcon>
                    <Work sx={{ fontSize: 40 }} />
                  </FeatureIcon>
                  <FeatureTitle variant="h6">Portfolio</FeatureTitle>
                  <FeatureDescription>
                    Showcase your work
                  </FeatureDescription>
                </FeatureCard>
              </Box>

              <Box sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '200px' }}>
                <FeatureCard
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => window.open('https://mockinterviewai.app/en/interview', '_blank')}
                  gradient="linear-gradient(135deg, #4caf50 0%, #388e3c 100%)"
                  style={{ background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)' }}
                >
                  <FeatureIcon>
                    <VideoCall sx={{ fontSize: 40 }} />
                  </FeatureIcon>
                  <FeatureTitle variant="h6">AI Mock Interview</FeatureTitle>
                  <FeatureDescription>
                    Practice with AI feedback
                  </FeatureDescription>
                </FeatureCard>
              </Box>
            </Box>
          </SectionContent>
        </SectionContainer>

        {/* Skills Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <Code sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">My Skills</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={4}>
              {/* Hard Skills Column */}
              <Grid item xs={12} md={6}>
                <SkillsContainer>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.primary }}>
                    Technical Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {hardSkillsData
                      .filter((skill) => userSkills.includes(skill.name))
                      .map((skill) => (
                        <SkillChip
                          key={skill.id}
                          label={skill.name}
                          level={skill.level}
                          variants={chipVariants}
                          whileHover="hover"
                        />
                      ))}
                  </Box>
                </SkillsContainer>
              </Grid>

              {/* Soft Skills Column */}
              <Grid item xs={12} md={6}>
                <SkillsContainer>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.primary }}>
                      Soft Skills
                    </Typography>
                    <AddSkillButton startIcon={<Add />} onClick={() => navigate("/softskills")}>
                      Add Skill
                    </AddSkillButton>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {softSkillsData
                      .filter((skill) => userSoftSkills.includes(skill.name))
                      .map((skill) => (
                        <SkillChip
                          key={skill.id}
                          label={skill.name}
                          level={skill.level}
                          variants={chipVariants}
                          whileHover="hover"
                        />
                      ))}
                  </Box>
                </SkillsContainer>
              </Grid>
            </Grid>

            {/* New Skills to Add */}
            <SkillsContainer sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.primary }}>
                Recommended Skills to Learn
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {availableSkills.map((skill) => (
                  <FormControlLabel
                    key={skill.id}
                    control={
                      <Checkbox
                        onChange={() => addSkill(skill)}
                        sx={{
                          color: theme.primary,
                          "&.Mui-checked": {
                            color: theme.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <SkillChip label={skill.name} level={skill.level} variants={chipVariants} whileHover="hover" />
                    }
                  />
                ))}
              </Box>
            </SkillsContainer>
          </SectionContent>
        </SectionContainer>

        {/* Courses Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <School sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Recommended Courses</SectionTitle>
          </SectionHeader>
          <SectionContent>
            {/* Changed to a single row with scrolling */}
            <Box sx={{ display: "flex", overflowX: "auto", pb: 2, gap: 3 }}>
              {coursesData.map((course) => (
                <Box key={course.id} sx={{ minWidth: 320, maxWidth: 350 }}>
                  <CourseCard variants={cardVariants} whileHover="hover" enrolled={course.enrolled}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image || `/placeholder.svg?height=140&width=350&text=${course.title}`}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 600, fontSize: "1rem", color: theme.primary }}
                        >
                          {course.title}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => toggleSaveCourse(course.id)}
                          sx={{ color: savedCourses.includes(course.id) ? theme.accent : theme.textLight }}
                        >
                          {savedCourses.includes(course.id) ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", color: theme.textLight }}>
                          <AccessTime sx={{ fontSize: "0.9rem", mr: 0.5 }} />
                          <Typography variant="body2" sx={{ color: theme.textLight }}>
                            {course.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                          <Star sx={{ color: "#FFD700", fontSize: "0.9rem" }} />
                          <Typography variant="body2" sx={{ ml: 0.5, color: theme.text }}>
                            {course.rating}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={course.level}
                        size="small"
                        sx={{
                          mb: 1,
                          backgroundColor: "rgba(43, 103, 119, 0.1)",
                          color: theme.primary,
                          fontWeight: 500,
                          border: "1px solid rgba(43, 103, 119, 0.2)",
                        }}
                      />
                      <Typography variant="body2" sx={{ mt: 1, color: theme.text }}>
                        {course.description}
                      </Typography>

                      {course.enrolled && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 0.5,
                              fontWeight: 500,
                              color: theme.success,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              backgroundColor: "rgba(43, 103, 119, 0.1)",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: theme.success,
                                borderRadius: 5,
                              },
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {course.enrolled ? (
                        <ActionButton size="small" primary onClick={() => handleEnrollClick(course.id)}>
                          Continue Learning
                        </ActionButton>
                      ) : (
                        <ActionButton size="small" primary onClick={() => handleEnrollClick(course.id)}>
                          Enroll Now
                        </ActionButton>
                      )}
                      <ActionButton size="small" onClick={() => navigate(`/hardskills`)} endIcon={<ArrowForwardIos />}>
                        Preview
                      </ActionButton>
                    </CardActions>
                  </CourseCard>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <ViewMoreButton
                endIcon={<ArrowForward />}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/courses")}
              >
                View More Courses
              </ViewMoreButton>
            </Box>
          </SectionContent>
        </SectionContainer>

        {/* Job Board Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <Work sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Job Recommendations</SectionTitle>
          </SectionHeader>
          <SectionContent>
            {/* Changed to a single row with scrolling */}
            <Box sx={{ display: "flex", overflowX: "auto", pb: 2, gap: 3 }}>
              {jobsData.map((job) => (
                <Box key={job.id} sx={{ minWidth: 320, maxWidth: 350 }}>
                  <JobCard variants={cardVariants} whileHover="hover">
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", p: 2, pb: 0 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          variant="rounded"
                          src={job.logo}
                          alt={job.company}
                          sx={{ width: 50, height: 50, mr: 1.5 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.primary }}>
                            {job.company}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.textLight }}>
                            Posted {job.posted}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        onClick={() => toggleSaveJob(job.id)}
                        sx={{
                          color: savedJobs.includes(job.id) ? theme.accent : theme.textLight,
                        }}
                      >
                        {savedJobs.includes(job.id) ? <Bookmark /> : <BookmarkBorder />}
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600, color: theme.primary }}
                      >
                        {job.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOn sx={{ fontSize: "0.9rem", color: theme.textLight, mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: theme.textLight }}>
                          {job.location}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.accent,
                          fontWeight: 600,
                          mb: 1.5,
                        }}
                      >
                        {job.salary}
                      </Typography>
                      <Box sx={{ my: 1.5 }}>
                        {job.domain.map((domain, index) => (
                          <JobDomain key={index} label={domain} size="small" />
                        ))}
                      </Box>
                      <Divider sx={{ my: 1.5, backgroundColor: "rgba(43, 103, 119, 0.1)" }} />
                      <Typography variant="body2" sx={{ color: theme.text }}>
                        {job.description}
                      </Typography>

                      {/* Job Match Progress Bar */}
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ mb: 0.5, fontWeight: 500, display: "flex", justifyContent: "space-between" }}
                        >
                          <span>Skills Match</span>
                          <span style={{ color: getMatchColor(jobProgress[job.id]) }}>
                            {jobProgress[job.id]}%
                            {jobProgress[job.id] >= 80 && (
                              <CheckCircle fontSize="small" sx={{ ml: 0.5, verticalAlign: "middle" }} />
                            )}
                          </span>
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={jobProgress[job.id]}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: "rgba(43, 103, 119, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getMatchColor(jobProgress[job.id]),
                              borderRadius: 5,
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <ActionButton
                        size="small"
                        primary
                        component="a"
                        href={job.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<Launch />}
                      >
                        Apply Now
                      </ActionButton>
                      <ActionButton size="small" onClick={() => navigate(`/job`)} endIcon={<ArrowForwardIos />}>
                        View Details
                      </ActionButton>
                      <ActionButton
                        size="small"
                        onClick={() => navigate(`/tech`)}
                        startIcon={<QuestionAnswer />}
                      >
                        Interview Questions
                      </ActionButton>
                    </CardActions>
                  </JobCard>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <ViewMoreButton
                endIcon={<ArrowForward />}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/jobs")}
              >
                View More Jobs
              </ViewMoreButton>
            </Box>
          </SectionContent>
        </SectionContainer>

        {/* Chatbot Button */}
        <ChatbotButton
          onClick={() => setChatOpen(!chatOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {chatOpen ? <Close sx={{ fontSize: 30, color: "white" }} /> : <Chat sx={{ fontSize: 30, color: "white" }} />}
        </ChatbotButton>

        {/* Chat Window */}
        {chatOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Psychology sx={{ fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                    SkillBridge AI Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Always here to help
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setChatOpen(false)}
                sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                <Close />
              </IconButton>
            </ChatHeader>

            <ChatMessages>
              {messages.map((msg, index) => (
                <MessageBubble key={index} isUser={msg.isUser}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {msg.text}
                  </Typography>
                </MessageBubble>
              ))}
              {isTyping && (
                <TypingIndicator>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingIndicator>
              )}
            </ChatMessages>

            <ChatInputContainer>
              <ChatInput
                placeholder="Ask me anything about careers, skills, jobs..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === "" || isTyping}
              >
                <Send />
              </SendButton>
            </ChatInputContainer>
          </ChatWindow>
        )}
      </PageContainer>
    </ThemeProvider>
  )
}

export default Dashboard
