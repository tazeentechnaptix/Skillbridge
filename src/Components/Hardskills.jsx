"use client"

import { useState, useRef } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Alert,
  Divider,
  Chip,
  Fade,
  Modal,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material"
import {
  CheckCircle,
  EmojiEvents,
  Download,
  Close,
  School,
  PlayCircleFilled,
  Star,
  StarBorder,
} from "@mui/icons-material"

export default function CourseAssessment() {
  // State for tracking which course has been watched
  const [watchedCourse, setWatchedCourse] = useState(null)

  // State for tracking answers
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  })

  // State for tracking if assessment is submitted
  const [isSubmitted, setIsSubmitted] = useState(false)

  // State for tracking score
  const [score, setScore] = useState(0)

  // State for modal
  const [openModal, setOpenModal] = useState(false)

  // State for badge display
  const [showBadge, setShowBadge] = useState(false)

  // Reference for certificate download
  const certificateRef = useRef(null)

  // Course data
  const courses = [
    {
      id: "react-basics",
      title: "React Basics: Components and Props",
      link: "https://youtu.be/RGKi6LSPDLU?si=5UJHso5-mXlGosMk",
      icon: "🔷",
      color: "#3a7b8c",
      questions: [
        {
          id: "q1",
          question: "What is a React component?",
          options: ["A JavaScript function", "A reusable piece of UI", "Both A and B", "None of the above"],
          correctAnswer: "Both A and B",
        },
        {
          id: "q2",
          question: "How do you pass data to a component?",
          options: ["Using state", "Using props", "Using context", "Using Redux"],
          correctAnswer: "Using props",
        },
        {
          id: "q3",
          question: "Which of the following is a functional component?",
          options: [
            "class MyComponent extends React.Component {}",
            "function MyComponent() { return <div>Hello</div> }",
            "const MyComponent = new Component()",
            "React.createComponent()",
          ],
          correctAnswer: "function MyComponent() { return <div>Hello</div> }",
        },
      ],
    },
    {
      id: "react-hooks",
      title: "React Hooks: useState and useEffect",
      link: "https://example.com/react-hooks",
      icon: "🔶",
      color: "#4a8d7e",
      questions: [
        {
          id: "q1",
          question: "What is useState used for?",
          options: ["To manage component state", "To create side effects", "To optimize rendering", "To handle events"],
          correctAnswer: "To manage component state",
        },
        {
          id: "q2",
          question: "When does useEffect run?",
          options: [
            "Only on component mount",
            "After every render",
            "Only when dependencies change",
            "Both A and C depending on configuration",
          ],
          correctAnswer: "Both A and C depending on configuration",
        },
        {
          id: "q3",
          question: "How do you clean up effects in useEffect?",
          options: [
            "Using try/catch",
            "By returning a cleanup function",
            "Using useCleanup hook",
            "Effects are automatically cleaned up",
          ],
          correctAnswer: "By returning a cleanup function",
        },
      ],
    },
    {
      id: "react-router",
      title: "React Router: Navigation and Routing",
      link: "https://example.com/react-router",
      icon: "🔹",
      color: "#5a9e6f",
      questions: [
        {
          id: "q1",
          question: "What component is used to define a route in React Router?",
          options: ["<Route>", "<Link>", "<Router>", "<Path>"],
          correctAnswer: "<Route>",
        },
        {
          id: "q2",
          question: "How do you navigate programmatically in React Router?",
          options: [
            "Using window.location",
            "Using the navigate function from useNavigate",
            "Using the history object",
            "Both B and C are correct",
          ],
          correctAnswer: "Both B and C are correct",
        },
        {
          id: "q3",
          question: "How do you access URL parameters in React Router?",
          options: [
            "Using the useParams hook",
            "From props.match.params",
            "Using the useLocation hook",
            "Both A and B are correct",
          ],
          correctAnswer: "Both A and B are correct",
        },
      ],
    },
  ]

  // Handle course selection
  const handleCourseWatch = (courseId) => {
    setWatchedCourse(courseId)
    setIsSubmitted(false)
    setScore(0)
    setShowBadge(false)
    setAnswers({
      q1: "",
      q2: "",
      q3: "",
    })
  }

  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Handle assessment submission
  const handleSubmit = () => {
    if (!watchedCourse) return

    const currentCourse = courses.find((course) => course.id === watchedCourse)
    if (!currentCourse) return

    let correctAnswers = 0

    currentCourse.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const calculatedScore = (correctAnswers / currentCourse.questions.length) * 100
    setScore(calculatedScore)
    setIsSubmitted(true)

    if (calculatedScore > 70) {
      setShowBadge(true)
    }
  }

  // Get current course questions
  const getCurrentCourseQuestions = () => {
    if (!watchedCourse) return []
    const currentCourse = courses.find((course) => course.id === watchedCourse)
    return currentCourse ? currentCourse.questions : []
  }

  // Get current course
  const getCurrentCourse = () => {
    return courses.find((course) => course.id === watchedCourse)
  }

  // Open certificate modal
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  // Close certificate modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Generate badge
  const generateBadge = () => {
    const currentCourse = getCurrentCourse()
    if (!currentCourse) return null

    return (
      <Box sx={{ textAlign: "center", mt: 3, mb: 3 }}>
        <Box
          sx={{
            display: "inline-flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 1s ease-in-out",
            "@keyframes fadeIn": {
              "0%": {
                opacity: 0,
                transform: "scale(0.8)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1)",
              },
            },
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: currentCourse.color,
              border: "4px solid #2b6777",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <School sx={{ fontSize: 60 }} />
          </Avatar>
          <Box
            sx={{
              position: "absolute",
              top: -15,
              right: -15,
              bgcolor: "#ffd700",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #2b6777",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {score.toFixed(0)}%
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#2b6777" }}>
            {currentCourse.title} Expert
          </Typography>
          <Box sx={{ display: "flex", mt: 1 }}>
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.ceil(score / 20) ? (
                <Star key={star} sx={{ color: "#ffd700" }} />
              ) : (
                <StarBorder key={star} sx={{ color: "#ffd700" }} />
              ),
            )}
          </Box>
        </Box>
      </Box>
    )
  }

  // Generate certificate
  const generateCertificate = () => {
    const currentCourse = getCurrentCourse()
    if (!currentCourse) return null

    return (
      <Card
        ref={certificateRef}
        sx={{
          p: 4,
          border: "4px solid #2b6777",
          borderRadius: 2,
          textAlign: "center",
          background: "linear-gradient(135deg, #e6f7f2 0%, #c5e8e0 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "linear-gradient(90deg, #2b6777, #52ab98, #2b6777)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "linear-gradient(90deg, #2b6777, #52ab98, #2b6777)",
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <EmojiEvents sx={{ fontSize: 60, color: "#ffd700", filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.3))" }} />
        </Box>

        <Typography variant="overline" sx={{ color: "#2b6777", letterSpacing: 2 }}>
          Certificate of Achievement
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: "#2b6777",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1,
            my: 2,
            textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
          }}
        >
          Certificate of Completion
        </Typography>

        <Divider
          sx={{
            my: 2,
            "&::before, &::after": {
              borderColor: "#2b6777",
            },
            mx: 4,
          }}
        >
          <Chip
            icon={<School />}
            label="ACHIEVEMENT"
            sx={{
              backgroundColor: "#2b6777",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Divider>

        <Typography variant="body1" gutterBottom sx={{ my: 1 }}>
          This certifies that
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            my: 2,
            color: "#2b6777",
            fontStyle: "italic",
            textDecoration: "underline",
            textDecorationColor: "#52ab98",
            textUnderlineOffset: "5px",
          }}
        >
          Tazeen Amir
        </Typography>

        <Typography variant="body1" gutterBottom>
          has successfully completed the course
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            my: 2,
            color: "#2b6777",
          }}
        >
          {currentCourse.title}
        </Typography>

        <Typography variant="body2" gutterBottom>
          with a score of <strong>{score.toFixed(0)}%</strong>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            mx: 4,
            pt: 2,
            borderTop: "1px dashed #2b6777",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Date Issued
            </Typography>
            <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Certificate ID
            </Typography>
            <Typography variant="body2">{`${watchedCourse}-${Date.now().toString().slice(-6)}`}</Typography>
          </Box>
        </Box>
      </Card>
    )
  }

  // Download certificate as image (mock function)
  const downloadCertificate = () => {
    alert("Certificate download functionality would be implemented here")
    // In a real implementation, you would use html2canvas or similar library
    // to convert the certificate ref to an image and download it
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#c5e8e0",
        color: "#2b6777",
        py: 4,
        backgroundImage: "linear-gradient(135deg, #c5e8e0 0%, #d8f3eb 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                color: "#2b6777",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1,
                textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
              }}
            >
              Recommended Courses
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#2b6777", opacity: 0.8 }}>
              Select a course, watch it, and complete the assessment to earn your certificate
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Chip
              icon={<School />}
              label="COURSE SELECTION"
              sx={{
                backgroundColor: "#2b6777",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Divider>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {courses.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}dd 100%)`,
                    boxShadow:
                      watchedCourse === course.id
                        ? "0 10px 30px rgba(43, 103, 119, 0.4)"
                        : "0 5px 15px rgba(0,0,0,0.1)",
                    transform: watchedCourse === course.id ? "translateY(-5px)" : "none",
                    border: watchedCourse === course.id ? "2px solid #2b6777" : "none",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3, color: "white" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
                        {course.title}
                      </Typography>
                      <Typography variant="h4" sx={{ opacity: 0.8 }}>
                        {course.icon}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={watchedCourse === course.id}
                            onChange={() => handleCourseWatch(course.id)}
                            sx={{
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="I've watched this"
                        sx={{ color: "white" }}
                      />
                      {watchedCourse === course.id && <CheckCircle sx={{ color: "white", ml: 1 }} />}
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Button
                      variant="contained"
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<PlayCircleFilled />}
                      fullWidth
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      Watch Course
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Fade in={!!watchedCourse}>
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ my: 3 }}>
                <Chip
                  icon={<School />}
                  label="ASSESSMENT"
                  sx={{
                    backgroundColor: "#2b6777",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Divider>

              {watchedCourse && (
                <Card
                  sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #f0f9f6 0%, #e0f2ed 100%)",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(43, 103, 119, 0.2)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        color: "#2b6777",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <School sx={{ mr: 1 }} />
                      Course Assessment
                    </Typography>

                    <Typography variant="body2" gutterBottom sx={{ mb: 3, color: "#2b6777", opacity: 0.8 }}>
                      Please answer the following questions based on the course you watched.
                    </Typography>

                    {getCurrentCourseQuestions().map((question, index) => (
                      <Box
                        key={question.id}
                        sx={{
                          mb: 4,
                          p: 3,
                          borderRadius: 2,
                          backgroundColor: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(43, 103, 119, 0.1)",
                        }}
                      >
                        <FormControl component="fieldset" sx={{ width: "100%" }}>
                          <FormLabel
                            component="legend"
                            sx={{
                              color: "#2b6777",
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                              mb: 2,
                            }}
                          >
                            {index + 1}. {question.question}
                          </FormLabel>
                          <RadioGroup
                            value={answers[question.id]}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          >
                            {question.options.map((option, optIndex) => (
                              <FormControlLabel
                                key={optIndex}
                                value={option}
                                control={
                                  <Radio
                                    sx={{
                                      color: "#2b6777",
                                      "&.Mui-checked": {
                                        color: "#2b6777",
                                      },
                                    }}
                                  />
                                }
                                label={option}
                                disabled={isSubmitted}
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    ))}

                    {!isSubmitted ? (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={Object.values(answers).some((answer) => !answer)}
                        sx={{
                          mt: 2,
                          backgroundColor: "#2b6777",
                          "&:hover": {
                            backgroundColor: "#235e6d",
                          },
                          "&.Mui-disabled": {
                            backgroundColor: "rgba(43, 103, 119, 0.3)",
                          },
                          py: 1.5,
                          px: 4,
                          borderRadius: 2,
                        }}
                      >
                        Submit Assessment
                      </Button>
                    ) : (
                      <Alert
                        severity={score > 70 ? "success" : "error"}
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          backgroundColor: score > 70 ? "rgba(84, 214, 44, 0.16)" : "rgba(255, 72, 66, 0.16)",
                          color: score > 70 ? "#229A16" : "#B71D18",
                          fontWeight: "bold",
                        }}
                      >
                        {score > 70
                          ? `Congratulations! You scored ${score.toFixed(0)}% and earned a certificate and badge!`
                          : `You scored ${score.toFixed(0)}%. You need at least 70% to earn a certificate and badge.`}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </Box>
          </Fade>

          {isSubmitted && score > 70 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ my: 3 }}>
                <Chip
                  icon={<EmojiEvents />}
                  label="ACHIEVEMENTS"
                  sx={{
                    backgroundColor: "#2b6777",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Divider>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #f0f9f6 0%, #e0f2ed 100%)",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
                      border: "1px solid rgba(43, 103, 119, 0.2)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 3, color: "#2b6777", fontWeight: "bold" }}>
                      Your Achievement Badge
                    </Typography>

                    {showBadge && generateBadge()}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #f0f9f6 0%, #e0f2ed 100%)",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
                      border: "1px solid rgba(43, 103, 119, 0.2)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 3, color: "#2b6777", fontWeight: "bold" }}>
                      Your Certificate
                    </Typography>

                    <Button
                      variant="contained"
                      startIcon={<EmojiEvents />}
                      onClick={handleOpenModal}
                      sx={{
                        backgroundColor: "#2b6777",
                        "&:hover": {
                          backgroundColor: "#235e6d",
                        },
                        mb: 2,
                      }}
                    >
                      View Certificate
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={downloadCertificate}
                      sx={{
                        borderColor: "#2b6777",
                        color: "#2b6777",
                        "&:hover": {
                          borderColor: "#235e6d",
                          backgroundColor: "rgba(43, 103, 119, 0.1)",
                        },
                      }}
                    >
                      Download Certificate
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Certificate Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="certificate-modal"
        aria-describedby="view-your-certificate"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 2,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(255,255,255,0.8)",
              zIndex: 10,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,1)",
              },
            }}
          >
            <Close />
          </IconButton>
          {generateCertificate()}
        </Box>
      </Modal>
    </Box>
  )
}
