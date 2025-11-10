"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  TextField,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { QuestionAnswer, ArrowUpward, ArrowDownward, Comment, Send, ExpandMore, ExpandLess } from "@mui/icons-material"
import { motion } from "framer-motion"

// Re-use the theme from dashboard.jsx for consistency
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
  cardBg1: "#ffffff",  // set cards to white for contrast with black text
  cardBg2: "#ffffff",
  cardBg3: "#ffffff",
  success: "#06d6a0",
  warning: "#ffd166",
  error: "#ef476f",
  text: "#000000",       // set black text
  textLight: "#333333",  // darker grey instead of light
  white: "#000000",      // only if you're using theme.white for text; else keep "#ffffff"
}


// Re-use GlobalStyle for gradient background
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, ${(props) => props.theme.background} 0%, #a3d5cb 100%);
    color: ${(props) => props.theme.text};
    font-family: 'Poppins', sans-serif;
  }
`

// Re-use MotionContainer
const MotionContainer = styled(motion.div)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

// Re-use SectionTitle
const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.black}; /* Ensure white text on dark backgrounds */
`

// Re-use SectionContainer
const SectionContainer = styled(motion(Paper))`
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background-color: ${(props) => props.theme.cardBg1}; /* Ensure dark background */
  color: ${(props) => props.theme.black}; /* Ensure text is white on dark backgrounds */
  border-top: 4px solid ${(props) => props.theme.primary};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`

// New Styled Components for Q&A Forum
const ForumHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(43, 103, 119, 0.3);
  color: ${(props) => props.theme.black};
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

const QuestionCardStyled = styled(motion(Card))`
  background-color: ${(props) => props.theme.cardBg2};
  color: ${(props) => props.theme.black};
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const AnswerCardStyled = styled(motion(Card))`
  background-color: rgba(255, 255, 255, 0.05);
  color: ${(props) => props.theme.black};
  border-radius: 8px;
  margin-top: 1rem;
  margin-left: 2rem; /* Indent answers */
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
`

const VoteButton = styled(IconButton)`
  color: ${(props) => props.theme.textLight};
  &:hover {
    color: ${(props) => props.theme.accent};
  }
  &.active {
    color: ${(props) => props.theme.accent};
  }
`

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    color: ${(props) => props.theme.black};
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    &:hover fieldset {
      border-color: ${(props) => props.theme.primaryLight} !important;
    }
    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.accent} !important;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.2);
  }
  .MuiInputLabel-root {
    color: ${(props) => props.theme.textLight};
    &.Mui-focused {
      color: ${(props) => props.theme.accent};
    }
  }
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  color: ${(props) => (props.primary ? props.theme.black : props.theme.black)};
  background: ${(props) =>
    props.primary
      ? `linear-gradient(90deg, ${props.theme.accent} 0%, ${props.theme.accentDark} 100%)`
      : `rgba(255, 255, 255, 0.15)`};
  border: ${(props) => (props.primary ? "none" : `2px solid rgba(255, 255, 255, 0.3)`)};
  box-shadow: ${(props) => (props.primary ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none")};
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  
  &:hover {
    background: ${(props) =>
      props.primary
        ? `linear-gradient(90deg, ${props.theme.accentDark} 0%, ${props.theme.accent} 100%)`
        : `rgba(255, 255, 255, 0.25)`};
    border: ${(props) => (props.primary ? "none" : `2px solid rgba(255, 255, 255, 0.5)`)};
    box-shadow: ${(props) => (props.primary ? "0 6px 20px rgba(0, 0, 0, 0.25)" : "0 4px 10px rgba(0, 0, 0, 0.15)")};
  }
  
  & .MuiButton-startIcon, & .MuiButton-endIcon {
    margin-top: -2px;
  }
`

// Animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

const answerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

// Mock Data
const initialQuestions = [
  {
    id: 1,
    title: "Best way to learn React hooks in 2025?",
    content:
      "I'm struggling with understanding custom hooks and context API. Any recommended resources or best practices for someone starting out?",
    author: "Alice Smith",
    date: "July 20, 2025",
    upvotes: 15,
    downvotes: 2,
    answers: [
      {
        id: 101,
        content:
          "Frontend Masters has an excellent course on Advanced React Patterns by Kent C. Dodds. Highly recommend it!",
        author: "Bob Johnson",
        date: "July 21, 2025",
        upvotes: 8,
        downvotes: 0,
      },
      {
        id: 102,
        content:
          "Check out the official React documentation, it's been greatly improved for hooks. Also, practice building small projects to solidify your understanding.",
        author: "Charlie Brown",
        date: "July 21, 2025",
        upvotes: 5,
        downvotes: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Career path for a Data Scientist transitioning from Academia?",
    content:
      "I have a PhD in Physics and strong analytical skills, but limited industry experience. What's the best way to break into data science roles?",
    author: "David Lee",
    date: "July 18, 2025",
    upvotes: 20,
    downvotes: 1,
    answers: [
      {
        id: 201,
        content:
          "Focus on building a strong portfolio with real-world projects. Kaggle competitions are great for this. Also, network with people in the industry.",
        author: "Eve Davis",
        date: "July 19, 2025",
        upvotes: 12,
        downvotes: 0,
      },
    ],
  },
  {
    id: 3,
    title: "Tips for effective time management as a remote developer?",
    content:
      "Working from home, I find it hard to stay focused and manage my time effectively. Any productivity hacks or tools you'd recommend?",
    author: "Frank Green",
    date: "July 15, 2025",
    upvotes: 10,
    downvotes: 0,
    answers: [],
  },
]

const CommunityQAPage = () => {
  const [questions, setQuestions] = useState(initialQuestions)
  const [newQuestionTitle, setNewQuestionTitle] = useState("")
  const [newQuestionContent, setNewQuestionContent] = useState("")
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const [newAnswerContent, setNewAnswerContent] = useState({}) // { questionId: content }

  const handleAskQuestion = () => {
    if (newQuestionTitle.trim() && newQuestionContent.trim()) {
      const newQuestion = {
        id: questions.length + 1,
        title: newQuestionTitle.trim(),
        content: newQuestionContent.trim(),
        author: "Current User", // Mock current user
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        upvotes: 0,
        downvotes: 0,
        answers: [],
      }
      setQuestions([newQuestion, ...questions]) // Add new question to the top
      setNewQuestionTitle("")
      setNewQuestionContent("")
    }
  }

  const handleAddAnswer = (questionId) => {
    const answerContent = newAnswerContent[questionId]
    if (answerContent && answerContent.trim()) {
      setQuestions(
        questions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                answers: [
                  ...q.answers,
                  {
                    id: q.answers.length + 1,
                    content: answerContent.trim(),
                    author: "Current User", // Mock current user
                    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                    upvotes: 0,
                    downvotes: 0,
                  },
                ],
              }
            : q,
        ),
      )
      setNewAnswerContent((prev) => ({ ...prev, [questionId]: "" }))
    }
  }

  const handleVote = (type, itemId, isQuestion = true) => {
    setQuestions(
      questions.map((q) => {
        if (isQuestion && q.id === itemId) {
          return {
            ...q,
            upvotes: type === "up" ? q.upvotes + 1 : q.upvotes,
            downvotes: type === "down" ? q.downvotes + 1 : q.downvotes,
          }
        } else if (!isQuestion) {
          return {
            ...q,
            answers: q.answers.map((a) =>
              a.id === itemId
                ? {
                    ...a,
                    upvotes: type === "up" ? a.upvotes + 1 : a.upvotes,
                    downvotes: type === "down" ? a.downvotes + 1 : a.downvotes,
                  }
                : a,
            ),
          }
        }
        return q
      }),
    )
  }

  const toggleExpand = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MotionContainer initial="hidden" animate="visible" variants={{ visible: { opacity: 1 } }}>
        <ForumHeader variants={itemVariants}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "white" }}>
            Community Q&A Forum
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Ask career and tech questions, share learning tips, and get help from peers.
          </Typography>
        </ForumHeader>

        {/* Ask a Question Section */}
        <SectionContainer variants={itemVariants}>
          <SectionTitle variant="h5">
            <QuestionAnswer sx={{ color: theme.accent }} /> Ask a New Question
          </SectionTitle>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <StyledTextField
              label="Question Title"
              variant="outlined"
              fullWidth
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
            />
            <StyledTextField
              label="Your Question / Learning Tip"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newQuestionContent}
              onChange={(e) => setNewQuestionContent(e.target.value)}
            />
            <ActionButton primary onClick={handleAskQuestion} sx={{ alignSelf: "flex-end" }}>
              Post Question
            </ActionButton>
          </Box>
        </SectionContainer>

        {/* Questions List Section */}
        <SectionContainer variants={itemVariants}>
          <SectionTitle variant="h5">
            <Comment sx={{ color: theme.accent }} /> Recent Questions
          </SectionTitle>
          <Box>
            {questions.map((question) => (
              <QuestionCardStyled key={question.id} variants={itemVariants}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.white }}>
                    {question.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.textLight, mb: 2 }}>
                    Asked by {question.author} on {question.date}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.textLight }}>
                    {question.content}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <VoteButton onClick={() => handleVote("up", question.id, true)}>
                      <ArrowUpward />
                    </VoteButton>
                    <Typography variant="body2" sx={{ color: theme.white, mx: 0.5 }}>
                      {question.upvotes - question.downvotes}
                    </Typography>
                    <VoteButton onClick={() => handleVote("down", question.id, true)}>
                      <ArrowDownward />
                    </VoteButton>
                    <Button
                      size="small"
                      startIcon={<Comment />}
                      onClick={() => toggleExpand(question.id)}
                      sx={{ ml: 2, color: theme.textLight, textTransform: "none" }}
                    >
                      {question.answers.length} Answers
                    </Button>
                  </Box>
                  <IconButton onClick={() => toggleExpand(question.id)} sx={{ color: theme.textLight }}>
                    {expandedQuestionId === question.id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </CardActions>

                {expandedQuestionId === question.id && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={answerVariants}
                    style={{ overflow: "hidden" }}
                  >
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.white }}>
                        Answers
                      </Typography>
                      {question.answers.length > 0 ? (
                        question.answers.map((answer) => (
                          <AnswerCardStyled key={answer.id}>
                            <CardContent>
                              <Typography variant="body1" sx={{ color: theme.textLight, mb: 1 }}>
                                {answer.content}
                              </Typography>
                              <Typography variant="caption" sx={{ color: theme.textLight }}>
                                Answered by {answer.author} on {answer.date}
                              </Typography>
                            </CardContent>
                            <CardActions sx={{ px: 2, pb: 1 }}>
                              <VoteButton onClick={() => handleVote("up", answer.id, false)}>
                                <ArrowUpward sx={{ fontSize: "1rem" }} />
                              </VoteButton>
                              <Typography variant="caption" sx={{ color: theme.textLight, mx: 0.5 }}>
                                {answer.upvotes - answer.downvotes}
                              </Typography>
                              <VoteButton onClick={() => handleVote("down", answer.id, false)}>
                                <ArrowDownward sx={{ fontSize: "1rem" }} />
                              </VoteButton>
                            </CardActions>
                          </AnswerCardStyled>
                        ))
                      ) : (
                        <Typography variant="body2" sx={{ color: theme.textLight, ml: 2, mt: 1 }}>
                          No answers yet. Be the first to help!
                        </Typography>
                      )}

                      {/* Add Answer Form */}
                      <Box sx={{ mt: 3, ml: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.white }}>
                          Your Answer
                        </Typography>
                        <StyledTextField
                          label="Write your answer..."
                          variant="outlined"
                          multiline
                          rows={3}
                          fullWidth
                          value={newAnswerContent[question.id] || ""}
                          onChange={(e) =>
                            setNewAnswerContent((prev) => ({
                              ...prev,
                              [question.id]: e.target.value,
                            }))
                          }
                        />
                        <ActionButton
                          primary
                          onClick={() => handleAddAnswer(question.id)}
                          endIcon={<Send />}
                          sx={{ alignSelf: "flex-end" }}
                        >
                          Submit Answer
                        </ActionButton>
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </QuestionCardStyled>
            ))}
          </Box>
        </SectionContainer>
      </MotionContainer>
    </ThemeProvider>
  )
}

export default CommunityQAPage