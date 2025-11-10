"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  VideoCall,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  PlayArrow,
  Stop,
  Psychology,
  Assessment,
  Timer,
  CheckCircle,
  ArrowBack,
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
  max-width: 1200px;
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

const VideoContainer = styled(Box)`
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1rem;
`

const ControlButton = styled(Button)`
  margin: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(43, 103, 119, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(43, 103, 119, 0.3);
  }
`

const QuestionCard = styled(Card)`
  margin-bottom: 1rem;
  border-radius: 12px;
  background-color: ${(props) => props.theme.cardBackground};
  border: 2px solid ${(props) => (props.answered ? props.theme.success : "rgba(43, 103, 119, 0.2)")};
`

const InterviewTypeCard = styled(motion(Card))`
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid ${(props) => (props.selected ? props.theme.primary : "rgba(43, 103, 119, 0.2)")};
  background: ${(props) => (props.selected ? "rgba(43, 103, 119, 0.1)" : props.theme.cardBackground)};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.primaryLight};
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(43, 103, 119, 0.15);
  }
`

const mockQuestions = {
  technical: [
    "Explain the difference between var, let, and const in JavaScript.",
    "What is the Virtual DOM in React?",
    "Describe the concept of closures in JavaScript.",
    "What are the principles of Object-Oriented Programming?",
    "How does asynchronous programming work in JavaScript?",
  ],
  behavioral: [
    "Tell me about a time when you faced a challenging project.",
    "How do you handle working in a team?",
    "Describe a situation where you had to learn something new quickly.",
    "How do you prioritize your tasks when working on multiple projects?",
    "Tell me about a time you made a mistake and how you handled it.",
  ],
  situational: [
    "What would you do if you disagreed with your manager's decision?",
    "How would you handle a tight deadline with limited resources?",
    "If you noticed a colleague struggling with their work, what would you do?",
    "How would you approach a project with unclear requirements?",
    "What would you do if you received negative feedback?",
  ],
}

function MockInterview() {
  const navigate = useNavigate()
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [interviewType, setInterviewType] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  const handleStartInterview = () => {
    if (interviewType) {
      setInterviewStarted(true)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions[interviewType].length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setInterviewComplete(true)
    }
  }

  const handleAnswerSubmit = (answer) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
    handleNextQuestion()
  }

  const resetInterview = () => {
    setInterviewStarted(false)
    setInterviewComplete(false)
    setCurrentQuestion(0)
    setAnswers([])
    setInterviewType("")
    setTimeElapsed(0)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Header>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/dashboard")}
              sx={{ color: "white", textTransform: "none" }}
            >
              Back to Dashboard
            </Button>
            <VideoCall sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                AI Mock Interview
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Practice your interview skills with AI-powered feedback
              </Typography>
            </Box>
          </Box>
          {interviewStarted && !interviewComplete && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Timer />
              <Typography variant="h6">{Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</Typography>
            </Box>
          )}
        </Header>

        {!interviewStarted && !interviewComplete && (
          <SectionContainer>
            <SectionHeader>
              <Psychology sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Choose Interview Type
              </Typography>
            </SectionHeader>
            <SectionContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <InterviewTypeCard
                    selected={interviewType === "technical"}
                    onClick={() => setInterviewType("technical")}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Psychology sx={{ fontSize: 60, color: theme.primary }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.primary }}>
                          Technical Interview
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "center", color: theme.textLight }}>
                          Practice coding and technical questions
                        </Typography>
                        <Chip label="5 Questions" color="primary" />
                      </Box>
                    </CardContent>
                  </InterviewTypeCard>
                </Grid>

                <Grid item xs={12} md={4}>
                  <InterviewTypeCard
                    selected={interviewType === "behavioral"}
                    onClick={() => setInterviewType("behavioral")}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Assessment sx={{ fontSize: 60, color: theme.accent }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.primary }}>
                          Behavioral Interview
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "center", color: theme.textLight }}>
                          Practice behavioral and situational questions
                        </Typography>
                        <Chip label="5 Questions" sx={{ bgcolor: theme.accent, color: "white" }} />
                      </Box>
                    </CardContent>
                  </InterviewTypeCard>
                </Grid>

                <Grid item xs={12} md={4}>
                  <InterviewTypeCard
                    selected={interviewType === "situational"}
                    onClick={() => setInterviewType("situational")}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <CheckCircle sx={{ fontSize: 60, color: theme.success }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.primary }}>
                          Situational Interview
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "center", color: theme.textLight }}>
                          Practice real-world scenario questions
                        </Typography>
                        <Chip label="5 Questions" sx={{ bgcolor: theme.success, color: "white" }} />
                      </Box>
                    </CardContent>
                  </InterviewTypeCard>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <ControlButton
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={handleStartInterview}
                  disabled={!interviewType}
                  sx={{
                    bgcolor: theme.primary,
                    color: "white",
                    "&:hover": { bgcolor: theme.primaryDark },
                    "&:disabled": { bgcolor: "rgba(43, 103, 119, 0.3)" },
                  }}
                >
                  Start Interview
                </ControlButton>
              </Box>
            </SectionContent>
          </SectionContainer>
        )}

        {interviewStarted && !interviewComplete && (
          <>
            <SectionContainer>
              <SectionHeader>
                <Videocam sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Interview Session
                </Typography>
                <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    label={`Question ${currentQuestion + 1} of ${mockQuestions[interviewType].length}`}
                    sx={{ bgcolor: "white", color: theme.primary, fontWeight: 600 }}
                  />
                </Box>
              </SectionHeader>
              <SectionContent>
                <VideoContainer>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    {videoEnabled ? "Camera Active" : "Camera Off"}
                  </Typography>
                </VideoContainer>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                  <ControlButton
                    variant="contained"
                    startIcon={audioEnabled ? <Mic /> : <MicOff />}
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    sx={{
                      bgcolor: audioEnabled ? theme.success : theme.error,
                      color: "white",
                      "&:hover": { bgcolor: audioEnabled ? "#45a049" : "#d32f2f" },
                    }}
                  >
                    {audioEnabled ? "Mute" : "Unmute"}
                  </ControlButton>
                  <ControlButton
                    variant="contained"
                    startIcon={videoEnabled ? <Videocam /> : <VideocamOff />}
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    sx={{
                      bgcolor: videoEnabled ? theme.success : theme.error,
                      color: "white",
                      "&:hover": { bgcolor: videoEnabled ? "#45a049" : "#d32f2f" },
                    }}
                  >
                    {videoEnabled ? "Stop Video" : "Start Video"}
                  </ControlButton>
                  <ControlButton
                    variant="contained"
                    startIcon={<Stop />}
                    onClick={resetInterview}
                    sx={{ bgcolor: theme.error, color: "white", "&:hover": { bgcolor: "#d32f2f" } }}
                  >
                    End Interview
                  </ControlButton>
                </Box>

                <QuestionCard answered={answers[currentQuestion]}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: theme.primary, mb: 2, fontWeight: 600 }}>
                      Question {currentQuestion + 1}:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
                      {mockQuestions[interviewType][currentQuestion]}
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      placeholder="Type your answer here or use voice input..."
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                      <Button
                        variant="contained"
                        endIcon={<ArrowBack sx={{ transform: "rotate(180deg)" }} />}
                        onClick={() => handleAnswerSubmit("Sample answer")}
                        sx={{
                          bgcolor: theme.primary,
                          color: "white",
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": { bgcolor: theme.primaryDark },
                        }}
                      >
                        {currentQuestion < mockQuestions[interviewType].length - 1 ? "Next Question" : "Finish Interview"}
                      </Button>
                    </Box>
                  </CardContent>
                </QuestionCard>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: theme.textLight }}>
                    Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={((currentQuestion + 1) / mockQuestions[interviewType].length) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: "rgba(43, 103, 119, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: theme.primary,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </SectionContent>
            </SectionContainer>
          </>
        )}

        {interviewComplete && (
          <SectionContainer>
            <SectionHeader>
              <CheckCircle sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Interview Complete!
              </Typography>
            </SectionHeader>
            <SectionContent>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CheckCircle sx={{ fontSize: 100, color: theme.success, mb: 2 }} />
                <Typography variant="h4" sx={{ color: theme.primary, fontWeight: 600, mb: 2 }}>
                  Great Job!
                </Typography>
                <Typography variant="body1" sx={{ color: theme.textLight, mb: 4 }}>
                  You've completed the {interviewType} interview. Review your performance below.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.cardBackground }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: theme.primary, fontWeight: 700 }}>
                          {mockQuestions[interviewType].length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.textLight }}>
                          Questions Answered
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.cardBackground }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: theme.success, fontWeight: 700 }}>
                          85%
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.textLight }}>
                          Confidence Score
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.cardBackground }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: theme.accent, fontWeight: 700 }}>
                          {Math.floor(timeElapsed / 60)}m
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.textLight }}>
                          Time Taken
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={resetInterview}
                    sx={{
                      bgcolor: theme.primary,
                      color: "white",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 4,
                      "&:hover": { bgcolor: theme.primaryDark },
                    }}
                  >
                    Start New Interview
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      borderColor: theme.primary,
                      color: theme.primary,
                      textTransform: "none",
                      fontWeight: 600,
                      px: 4,
                      "&:hover": { borderColor: theme.primaryDark, bgcolor: "rgba(43, 103, 119, 0.05)" },
                    }}
                  >
                    Back to Dashboard
                  </Button>
                </Box>
              </Box>
            </SectionContent>
          </SectionContainer>
        )}
      </PageContainer>
    </ThemeProvider>
  )
}

export default MockInterview
