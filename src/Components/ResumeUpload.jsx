"use client"

import { useState, useRef } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  CssBaseline,
} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ArrowLeft, File, Plus, Trash2, Edit } from "lucide-react"
import { Margin } from "@mui/icons-material"

// Create a custom theme with the requested color
const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    secondary: {
      main: "#c8d8e4",
    },
    background: {
      default: "#f2f2f2",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
})

// Styled components
const OptionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "250px",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}))

const OptionIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: theme.palette.secondary.main,
}))

const UploadArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: `2px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
  minHeight: "300px",
}))

const HiddenInput = styled("input")({
  display: "none",
})

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))

// OptionSelection Component
function OptionSelection({ onOptionSelect }) {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    };
  
    const cardStyle = {
      backgroundColor: '#2b6777',
      color: '#e0f7f3',
      padding: 3,
      textAlign: 'center',
      borderRadius: 2,
    };
  
    const textColor = { color: '#e0f7f3' };
  
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Resume Parser
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
            Choose how you want to enter your resume information
          </Typography>
  
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              mt: 6,
            }}
          >
            <motion.div variants={itemVariants}>
              <OptionCard elevation={3} onClick={() => onOptionSelect('upload')} sx={cardStyle}>
                <OptionIcon>
                  <Upload size={30} color="#e0f7f3" />
                </OptionIcon>
                <Typography variant="h6" component="h2" gutterBottom sx={textColor}>
                  Upload Resume
                </Typography>
                <Typography variant="body2" align="center" sx={textColor}>
                  Upload your existing resume and we'll extract the information automatically
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#e0f7f3', color: '#2b6777' }} onClick={() => onOptionSelect('upload')}>
                  Upload
                </Button>
              </OptionCard>
            </motion.div>
  
            <motion.div variants={itemVariants}>
              <OptionCard elevation={3} onClick={() => onOptionSelect('manual')} sx={cardStyle}>
                <OptionIcon>
                  <Edit size={30} color="#e0f7f3" />
                </OptionIcon>
                <Typography variant="h6" component="h2" gutterBottom sx={textColor}>
                  Manually Enter Details
                </Typography>
                <Typography variant="body2" align="center" sx={textColor}>
                  Enter your information manually through our guided form
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#e0f7f3', color: '#2b6777' }} onClick={() => onOptionSelect('manual')}>
                  Enter Manually
                </Button>
              </OptionCard>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    );
  }
  

// ResumeUpload Component
function ResumeUpload({ onSubmit, onBack }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };
  
    const handleDragLeave = () => {
      setIsDragging(false);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFile(e.dataTransfer.files[0]);
      }
    };
  
    const handleUploadClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleRemoveFile = () => {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  
    const handleSubmit = () => {
      if (file) {
        onSubmit(file);
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={onBack} sx={{ mr: 2 }}>
            <ArrowLeft color="#2b6777" />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ color: "#2b6777" , marginTop: "50px"}}>
            Upload Your Resume
          </Typography>
        </Box>
  
        <UploadArea
          elevation={isDragging ? 3 : 1}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          sx={{
            backgroundColor: isDragging ? "rgba(43, 103, 119, 0.1)" : "#2b6777",
            transition: "all 0.3s ease",
            color: "#e0f7f3",
            margin: "50px",
            marginLeft: "300px",
            marginRight: "300px",
            p: 4,
            textAlign: "center",
          }}
        >
          <HiddenInput type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} ref={fileInputRef} />
  
          {!file ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isDragging ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#e0f7f3",
                  margin: "0 auto 16px",
                }}
              >
                <Upload size={40} color="#2b6777" sx={{Margin: "20px"}} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#e0f7f3" }}>
                Drag & Drop your resume here
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: "#e0f7f3", opacity: 0.8 }}>
                or click to browse files (PDF, DOC, DOCX)
              </Typography>
            </motion.div>
          ) : (
            <Box sx={{ position: "relative", width: "100%", textAlign: "center" }}>
              <IconButton
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <X size={20} />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <File size={48} color="#e0f7f3" />
                <Typography variant="h6" sx={{ mt: 2, color: "#e0f7f3" }}>
                  {file.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#e0f7f3", opacity: 0.8 }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>
            </Box>
          )}
        </UploadArea>
  
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            disabled={!file}
            onClick={handleSubmit}
            sx={{
              minWidth: "200px",
              backgroundColor: "#e0f7f3",
              color: "#2b6777",
              "&:hover": {
                backgroundColor: "#c0e7e3",
              },
            }}
          >
            Analyze Resume
          </Button>
        </Box>
      </motion.div>
    );
  }
  

// ManualEntryForm Component
function ManualEntryForm({ onSubmit, onBack }) {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    experiences: [{ id: "exp-1", company: "", jobTitle: "", description: "" }],
    projects: [{ id: "proj-1", name: "", description: "" }],
    skills: "",
    leadership: "",
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const handleProjectChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const addExperience = () => {
    const newId = `exp-${formData.experiences.length + 1}`
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { id: newId, company: "", jobTitle: "", description: "" }],
    }))
  }

  const removeExperience = (id) => {
    if (formData.experiences.length > 1) {
      setFormData((prev) => ({
        ...prev,
        experiences: prev.experiences.filter((exp) => exp.id !== id),
      }))
    }
  }

  const addProject = () => {
    const newId = `proj-${formData.projects.length + 1}`
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: newId, name: "", description: "" }],
    }))
  }

  const removeProject = (id) => {
    if (formData.projects.length > 1) {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((proj) => proj.id !== id),
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const steps = [
    {
      label: "Basic Information",
      content: (
        <FormSection>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#e0f7f3" } }}
            InputProps={{ style: { color: "#e0f7f3" } }}
            sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0f7f3",
                  },
                  "&:hover fieldset": {
                    borderColor: "#e0f7f3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e0f7f3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#e0f7f3",
                },
                "& .MuiInputBase-input": {
                  color: "#e0f7f3",
                },
              }}
              
          />
          <TextField
            fullWidth
            label="Professional Summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
            InputLabelProps={{ style: { color: "#e0f7f3" } }}
            InputProps={{ style: { color: "#e0f7f3" } }}
            sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0f7f3",
                  },
                  "&:hover fieldset": {
                    borderColor: "#e0f7f3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e0f7f3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#e0f7f3",
                },
                "& .MuiInputBase-input": {
                  color: "#e0f7f3",
                },
              }}
              
          />
        </FormSection>
      ),
    },
    {
      label: "Experience",
      content: (
        <FormSection>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#e0f7f3" }}>Work Experience</Typography>
            <Button startIcon={<Plus size={16} />} onClick={addExperience} variant="outlined" size="small" sx={{ color: "#e0f7f3", borderColor: "#e0f7f3" }}>
              Add Experience
            </Button>
          </Box>
          <AnimatePresence>
            {formData.experiences.map((exp, index) => (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <Card sx={{ mb: 3, position: "relative", backgroundColor: "#2b6777", color: "#e0f7f3" }}>
                  <CardContent>
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton size="small" onClick={() => removeExperience(exp.id)} disabled={formData.experiences.length <= 1}>
                        <Trash2 size={16} color="#e0f7f3" />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle2" color="#e0f7f3" gutterBottom>
                      Experience {index + 1}
                    </Typography>
                    <TextField 
                    sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e0f7f3",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e0f7f3",
                        },
                        "& .MuiInputBase-input": {
                          color: "#e0f7f3",
                        },
                      }}
                      
                    fullWidth label="Company Name" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)} margin="normal" required InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
                    <TextField 
                    sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e0f7f3",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e0f7f3",
                        },
                        "& .MuiInputBase-input": {
                          color: "#e0f7f3",
                        },
                      }}
                      
                    fullWidth label="Job Title" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, "jobTitle", e.target.value)} margin="normal" required InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
                    <TextField 
                    sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e0f7f3",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e0f7f3",
                        },
                        "& .MuiInputBase-input": {
                          color: "#e0f7f3",
                        },
                      }}
                      
                    fullWidth label="Description" value={exp.description} onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)} margin="normal" multiline rows={3} InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </FormSection>
      ),
    },
    {
      label: "Projects",
      content: (
        <FormSection>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#e0f7f3" }}>Projects</Typography>
            <Button startIcon={<Plus size={16} />} onClick={addProject} variant="outlined" size="small" sx={{ color: "#e0f7f3", borderColor: "#e0f7f3" }}>
              Add Project
            </Button>
          </Box>
          <AnimatePresence>
            {formData.projects.map((proj, index) => (
              <motion.div key={proj.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <Card sx={{ mb: 3, position: "relative", backgroundColor: "#2b6777", color: "#e0f7f3" }}>
                  <CardContent>
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton size="small" onClick={() => removeProject(proj.id)} disabled={formData.projects.length <= 1}>
                        <Trash2 size={16} color="#e0f7f3" />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle2" color="#e0f7f3" gutterBottom>
                      Project {index + 1}
                    </Typography>
                    <TextField 
                    sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e0f7f3",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e0f7f3",
                        },
                        "& .MuiInputBase-input": {
                          color: "#e0f7f3",
                        },
                      }}
                      
                    fullWidth label="Project Name" value={proj.name} onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)} margin="normal" required InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
                    <TextField 
                    sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&:hover fieldset": {
                            borderColor: "#e0f7f3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#e0f7f3",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#e0f7f3",
                        },
                        "& .MuiInputBase-input": {
                          color: "#e0f7f3",
                        },
                      }}
                      
                    fullWidth label="Description" value={proj.description} onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)} margin="normal" multiline rows={3} InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </FormSection>
      ),
    },
    {
      label: "Skills & Leadership",
      content: (
        <FormSection>
          <TextField 
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e0f7f3",
              },
              "&:hover fieldset": {
                borderColor: "#e0f7f3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e0f7f3",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#e0f7f3",
            },
            "& .MuiInputBase-input": {
              color: "#e0f7f3",
            },
          }}
          
          fullWidth label="Skills" name="skills" value={formData.skills} onChange={handleInputChange} margin="normal" multiline rows={4} placeholder="List your skills, separated by commas" required InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
          <TextField 
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e0f7f3",
              },
              "&:hover fieldset": {
                borderColor: "#e0f7f3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e0f7f3",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#e0f7f3",
            },
            "& .MuiInputBase-input": {
              color: "#e0f7f3",
            },
          }}
          
          fullWidth label="Leadership & Activities" name="leadership" value={formData.leadership} onChange={handleInputChange} margin="normal" multiline rows={4} placeholder="Describe your leadership roles and extracurricular activities" InputLabelProps={{ style: { color: "#e0f7f3" } }} InputProps={{ style: { color: "#e0f7f3" } }} />
        </FormSection>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
      style={{ backgroundColor: "#e0f7f3", paddingTop: "40px" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, px: 4 }}>
        <IconButton onClick={onBack} sx={{ mr: 2, color: "#2b6777" }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ color: "#2b6777" }}>
          Enter Resume Details
        </Typography>
      </Box>
  
      <Paper
        elevation={2}
        sx={{ pt: 4, pb: 8, px: 4 , mx: "auto", maxWidth: "800px", backgroundColor: "#2b6777", color: "#e0f7f3" }}
      >
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ color: "#e0f7f3" }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel sx={{ color: "#e0f7f3", ".MuiStepLabel-label": { color: "#e0f7f3" } }}>
                {step.label}
              </StepLabel>
              <StepContent sx={{borderColor: "#e0f7f3",}}>
                {step.content}
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{ mt: 1, mr: 1, backgroundColor: "#e0f7f3", color: "#2b6777",borderColor: "#e0f7f3", }}
                    >
                      {index === steps.length - 1 ? "Submit" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        mt: 1,
                        mr: 1,
                        borderColor: "#e0f7f3",
                        color: "#e0f7f3",
                      }}
                      variant="outlined"
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </motion.div>
  )
  
}

// LoadingAnalyzing Component
function LoadingAnalyzing() {
    const loadingTexts = [
      "Analyzing your information...",
      "Extracting key details...",
      "Processing experience data...",
      "Identifying skills...",
      "Almost there...",
    ];
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            mt: 8, // margin top added here
            backgroundColor: "#2b6777",
            mr: 8,
            ml: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <CircularProgress size={80} thickness={4} sx={{ color: "#e0f7f3", mb: 4 }} />
          </motion.div>
  
          <Typography variant="h5" gutterBottom sx={{ color: "#e0f7f3" }}>
            Analyzing Your Resume
          </Typography>
  
          <Box sx={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {loadingTexts.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    animation: `fadeInOut 10s infinite`,
                    animationDelay: `${index * 2}s`,
                    opacity: 0,
                    color: "#e0f7f3",
                  }}
                >
                  Assessing your information
                </Typography>
              </motion.div>
            ))}
          </Box>
  
          <Box
            component="style"
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeInOut {
                  0%, 100% { opacity: 0; }
                  20%, 80% { opacity: 1; }
                }
              `,
            }}
          />
        </Paper>
      </motion.div>
    );
  }
  

// Main Component
function HomePage() {
    const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("options")
  const [formData, setFormData] = useState(null)

  const handleOptionSelect = (option) => {
    setCurrentView(option)
  }

  const handleUploadSubmit = (file) => {
    // In a real app, you would process the file here
    console.log("File uploaded:", file)
    setCurrentView("loading")

    // Simulate processing time
    setTimeout(() => {
      // After processing, you would typically navigate to a results page
      console.log("Processing complete")
      // For demo purposes, we'll just go back to options
      navigate('/location');
    }, 3000)
  }

  const handleManualSubmit = (data) => {
    setFormData(data)
    setCurrentView("loading")

    // Simulate processing time
    setTimeout(() => {
      // After processing, you would typically navigate to a results page
      console.log("Processing complete", data)
      // For demo purposes, we'll just go back to options
      navigate("/location")
    }, 3000)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-8"
      >
        {currentView === "options" && <OptionSelection onOptionSelect={handleOptionSelect} />}

        {currentView === "upload" && (
          <ResumeUpload onSubmit={handleUploadSubmit} onBack={() => setCurrentView("options")} />
        )}

        {currentView === "manual" && (
          <ManualEntryForm onSubmit={handleManualSubmit} onBack={() => setCurrentView("options")} />
        )}

        {currentView === "loading" && <LoadingAnalyzing />}
      </motion.div>
    </ThemeProvider>
  )
}

// Export the main component
export default HomePage
