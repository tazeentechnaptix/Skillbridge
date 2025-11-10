import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Container,
  Avatar,
  LinearProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Slider,
  Stack,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  Fade,
  Zoom,
  Slide,
  Grow,
  Tooltip,
  Badge,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  CloudUpload as CloudUploadIcon,
  GitHub as GitHubIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as CertificationIcon,
  Code as CodeIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
  Launch as LaunchIcon,
  Verified as VerifiedIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Web as WebIcon,
  Language as LanguageIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Enhanced theme with modern design
const portfolioTheme = createTheme({
  palette: {
    primary: {
      main: '#2b6777',
      light: '#52ab98',
      dark: '#1e4d57',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f2a154',
      light: '#ffb366',
      dark: '#e67e22',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.1)',
    '0px 12px 24px rgba(0,0,0,0.12)',
    '0px 16px 32px rgba(0,0,0,0.14)',
    '0px 20px 40px rgba(0,0,0,0.16)',
    '0px 24px 48px rgba(0,0,0,0.18)',
    '0px 28px 56px rgba(0,0,0,0.2)',
    ...Array(16).fill('0px 2px 4px rgba(0,0,0,0.05)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

const CompletePortfolioBuilder = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);

  // State for personal info
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Tazeen Amir',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 3+ years of experience building scalable web applications using modern technologies.',
    email: 'tazeen.amir@email.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/tazeenamir',
    github: 'github.com/tazeenamir',
    location: 'San Francisco, CA',
    careerGoals: 'To become a senior full-stack developer and lead innovative projects that make a positive impact on users worldwide.',
  });

  // State for skills
  const [skills, setSkills] = useState([
    { name: 'React', level: 90, verified: true },
    { name: 'Node.js', level: 85, verified: true },
    { name: 'TypeScript', level: 80, verified: false },
    { name: 'Python', level: 75, verified: true },
    { name: 'AWS', level: 70, verified: false },
    { name: 'MongoDB', level: 80, verified: true },
    { name: 'Docker', level: 65, verified: false },
    { name: 'GraphQL', level: 70, verified: true },
  ]);

  // State for projects
  const [projects, setProjects] = useState([
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/tazeenamir/ecommerce',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates using Socket.io. Includes team collaboration features and project tracking.',
      technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
      liveUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/tazeenamir/taskmanager',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
      technologies: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation'],
      liveUrl: 'https://weather-dashboard-demo.com',
      githubUrl: 'https://github.com/tazeenamir/weather-dashboard',
    },
  ]);

  // State for certifications
  const [certifications, setCertifications] = useState([
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2023-08-15',
      credentialId: 'AWS-CDV-123456',
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023-06-20',
      credentialId: 'META-RC-789012',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2023-04-10',
      credentialId: 'MONGO-DEV-345678',
    },
  ]);

  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
  });
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    credentialId: '',
  });
  const [newTech, setNewTech] = useState('');

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill, verified: false }]);
      setNewSkill({ name: '', level: 50 });
    }
  };

  const handleAddTechnology = () => {
    if (newTech.trim() && !newProject.technologies.includes(newTech.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech.trim()]
      });
      setNewTech('');
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(tech => tech !== techToRemove)
    });
  };

  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      setProjects([...projects, newProject]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
      });
    }
  };

  const handleAddCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setCertifications([...certifications, newCertification]);
      setNewCertification({
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
      });
    }
  };

  const handleDeploy = (platform) => {
    setDeployLoading(true);
    // Simulate deployment
    setTimeout(() => {
      setDeployLoading(false);
      setDeploySuccess(true);
    }, 3000);
  };

  const toggleSkillVerification = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index].verified = !updatedSkills[index].verified;
    setSkills(updatedSkills);
  };

  const PortfolioPreview = () => (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* Modern Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2b6777 0%, #52ab98 50%, #7e57c2 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Zoom in={true} timeout={1000}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#4caf50',
                    border: '3px solid white',
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 20 }} />
                </Avatar>
              }
            >
              <Avatar
                sx={{
                  width: { xs: 140, md: 180 },
                  height: { xs: 140, md: 180 },
                  mx: 'auto',
                  mb: 4,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 'bold',
                  border: '5px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
            </Badge>
          </Zoom>
          <Fade in={true} timeout={1500}>
            <Box>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                fontWeight="bold" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                {personalInfo.name}
              </Typography>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  opacity: 0.95,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 500,
                }}
              >
                {personalInfo.title}
              </Typography>
              
              {/* Quick Stats */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                justifyContent="center" 
                sx={{ mb: 4 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CodeIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h6" fontWeight="600">
                    {skills.length}+ Skills
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h6" fontWeight="600">
                    {projects.length} Projects
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CertificationIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h6" fontWeight="600">
                    {certifications.length} Certificates
                  </Typography>
                </Box>
              </Stack>

              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: 800, 
                  mx: 'auto', 
                  opacity: 0.9, 
                  lineHeight: 1.8, 
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 400,
                }}
              >
                {personalInfo.bio}
              </Typography>
              
              <Chip
                icon={<LocationIcon />}
                label={personalInfo.location}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 2.5,
                  px: 1,
                  mb: 5,
                  backdropFilter: 'blur(10px)',
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: 'white',
                    color: '#2b6777',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }} 
                  startIcon={<EmailIcon />}
                >
                  Get In Touch
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    borderWidth: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.15)',
                      borderColor: 'white',
                      borderWidth: 2,
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease',
                  }} 
                  startIcon={<DownloadIcon />}
                >
                  Download Resume
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Contact Information - Modern Card Design */}
        <Fade in={true} timeout={2000}>
          <Card 
            sx={{ 
              mb: 6, 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              border: '1px solid rgba(43, 103, 119, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #2b6777, #52ab98, #f2a154)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Avatar sx={{ bgcolor: '#2b6777', width: 50, height: 50 }}>
                  <EmailIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#2b6777', fontWeight: 'bold' }}>
                    Let's Connect
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Feel free to reach out through any of these channels
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'linear-gradient(135deg, #2b6777 0%, #52ab98 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 24px rgba(43, 103, 119, 0.3)',
                        }
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>Email</Typography>
                      <Typography variant="body1" fontWeight="600">{personalInfo.email}</Typography>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 24px rgba(76, 175, 80, 0.3)',
                        }
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>Phone</Typography>
                      <Typography variant="body1" fontWeight="600">{personalInfo.phone}</Typography>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 24px rgba(0, 119, 181, 0.3)',
                        }
                      }}
                    >
                      <LinkedInIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>LinkedIn</Typography>
                      <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.9rem' }}>
                        {personalInfo.linkedin.replace('linkedin.com/in/', '')}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'linear-gradient(135deg, #333 0%, #555 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                        }
                      }}
                    >
                      <GitHubIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>GitHub</Typography>
                      <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.9rem' }}>
                        {personalInfo.github.replace('github.com/', '')}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Skills Section - Enhanced Design */}
        <Fade in={true} timeout={2500}>
          <Card 
            sx={{ 
              mb: 6, 
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(43, 103, 119, 0.1)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
                <Avatar sx={{ bgcolor: '#f2a154', width: 50, height: 50 }}>
                  <CodeIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#2b6777', fontWeight: 'bold' }}>
                    Skills & Expertise
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Technical proficiency across multiple technologies
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={3}>
                {skills.map((skill, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card 
                        sx={{ 
                          p: 3, 
                          height: '100%',
                          background: skill.verified 
                            ? 'linear-gradient(135deg, rgba(43, 103, 119, 0.08) 0%, rgba(82, 171, 152, 0.08) 100%)'
                            : 'white',
                          border: skill.verified 
                            ? '2px solid #2b6777'
                            : '1px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          '&:hover': { 
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
                            transform: 'translateY(-3px)',
                            borderColor: '#2b6777',
                          }
                        }}
                      >
                        {skill.verified && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                            }}
                          >
                            <Tooltip title="Verified Skill">
                              <VerifiedIcon sx={{ color: '#4caf50', fontSize: 24 }} />
                            </Tooltip>
                          </Box>
                        )}
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" fontWeight="700" sx={{ color: '#2b6777', mb: 1 }}>
                            {skill.name}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="500">
                              Proficiency
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#f2a154', fontWeight: 'bold' }}>
                              {skill.level}%
                            </Typography>
                          </Box>
                          <Box sx={{ position: 'relative' }}>
                            <Box
                              sx={{
                                width: '100%',
                                height: 10,
                                bgcolor: '#e0e0e0',
                                borderRadius: 5,
                                overflow: 'hidden',
                              }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                style={{
                                  height: '100%',
                                  background: skill.verified 
                                    ? 'linear-gradient(90deg, #2b6777, #52ab98)'
                                    : 'linear-gradient(90deg, #f2a154, #e67e22)',
                                  borderRadius: 5,
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        {skill.verified && (
                          <Chip 
                            label="Verified" 
                            size="small" 
                            icon={<StarIcon sx={{ fontSize: 16 }} />}
                            sx={{ 
                              bgcolor: '#4caf50', 
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              '& .MuiChip-icon': { color: 'white' },
                              mt: 1,
                            }} 
                          />
                        )}
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Projects Section - Modern Portfolio Gallery */}
        <Fade in={true} timeout={3000}>
          <Card 
            sx={{ 
              mb: 6,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(43, 103, 119, 0.1)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
                <Avatar sx={{ bgcolor: '#7e57c2', width: 50, height: 50 }}>
                  <WorkIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ color: '#2b6777', fontWeight: 'bold' }}>
                    Featured Projects
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    A showcase of my best work and achievements
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={4}>
                {projects.map((project, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card 
                        sx={{ 
                          height: '100%', 
                          display: 'flex',
                          flexDirection: 'column',
                          background: 'white',
                          border: '1px solid #e0e0e0',
                          borderRadius: 3,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            boxShadow: '0 12px 40px rgba(43, 103, 119, 0.2)',
                            borderColor: '#2b6777',
                          }
                        }}
                      >
                        {/* Project Header with Gradient */}
                        <Box
                          sx={{
                            height: 140,
                            background: `linear-gradient(135deg, ${
                              index % 3 === 0 ? '#2b6777, #52ab98' :
                              index % 3 === 1 ? '#7e57c2, #b085f5' :
                              '#f2a154, #e67e22'
                            })`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="20" cy="20" r="2"/%3E%3C/g%3E%3C/svg%3E")',
                            }
                          }}
                        >
                          <WorkIcon sx={{ fontSize: 60, color: 'white', opacity: 0.9, zIndex: 1 }} />
                        </Box>
                        
                        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h5" gutterBottom fontWeight="700" sx={{ color: '#2b6777', mb: 2 }}>
                            {project.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ 
                              flex: 1, 
                              mb: 3,
                              lineHeight: 1.7,
                              fontSize: '0.95rem',
                            }}
                          >
                            {project.description}
                          </Typography>
                          
                          {/* Technologies */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="600" color="text.secondary" sx={{ mb: 1.5 }}>
                              Technologies Used:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {project.technologies.map((tech, techIndex) => (
                                <Chip
                                  key={techIndex}
                                  label={tech}
                                  size="small"
                                  sx={{ 
                                    bgcolor: 'rgba(43, 103, 119, 0.08)',
                                    color: '#2b6777',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    border: '1px solid rgba(43, 103, 119, 0.2)',
                                    '&:hover': {
                                      bgcolor: 'rgba(43, 103, 119, 0.15)',
                                    }
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </CardContent>
                        
                        <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                          <Button 
                            fullWidth
                            variant="contained"
                            sx={{ 
                              bgcolor: '#2b6777', 
                              fontWeight: 600,
                              py: 1.2,
                              '&:hover': { 
                                bgcolor: '#1e4d57',
                                transform: 'scale(1.02)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                            startIcon={<LaunchIcon />}
                          >
                            Live Demo
                          </Button>
                          <Button 
                            fullWidth
                            variant="outlined"
                            sx={{ 
                              color: '#2b6777', 
                              borderColor: '#2b6777',
                              borderWidth: 2,
                              fontWeight: 600,
                              py: 1.2,
                              '&:hover': {
                                bgcolor: 'rgba(43, 103, 119, 0.08)',
                                borderWidth: 2,
                                transform: 'scale(1.02)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                            startIcon={<GitHubIcon />}
                          >
                            Code
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Certifications Section */}
        <Fade in={true} timeout={3500}>
          <Card sx={{ mb: 6 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#2b6777', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <CertificationIcon sx={{ fontSize: 32 }} /> Certifications
              </Typography>
              <List>
                {certifications.map((cert, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      px: 0, 
                      py: 2,
                      borderBottom: index < certifications.length - 1 ? '1px solid #e9ecef' : 'none'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#2b6777', width: 56, height: 56 }}>
                        <SchoolIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#2b6777' }}>
                          {cert.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body1" color="text.secondary">
                            Issued by: <strong>{cert.issuer}</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {cert.date} • Credential ID: {cert.credentialId}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Fade>

        {/* Career Goals Section */}
        <Fade in={true} timeout={4000}>
          <Card sx={{ background: 'linear-gradient(135deg, #2b6777 0%, #52ab98 100%)', color: 'white' }}>
            <CardContent sx={{ p: 5, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                🎯 Career Goals
              </Typography>
              <Typography variant="h6" sx={{ lineHeight: 1.8, maxWidth: 800, mx: 'auto' }}>
                {personalInfo.careerGoals}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );

  return (
    <ThemeProvider theme={portfolioTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        {/* Hero Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2b6777 0%, #52ab98 50%, #7e57c2 100%)',
            color: 'white',
            py: 6,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }
          }}
        >
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '2rem', md: '3rem' },
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  🚀 Portfolio Builder Pro
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    mb: 3,
                    opacity: 0.95,
                    fontWeight: 400,
                    fontSize: { xs: '1.1rem', md: '1.5rem' },
                  }}
                >
                  Create your professional portfolio in minutes with verified skills, projects & certifications
                </Typography>
                <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 2 }}>
                  <Chip 
                    label="Easy to Use" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                    }} 
                  />
                  <Chip 
                    label="Professional Design" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                    }} 
                  />
                  <Chip 
                    label="One-Click Deploy" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                    }} 
                  />
                </Stack>
              </motion.div>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pb: 6 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              background: 'white',
              borderRadius: 4,
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {/* Action Buttons & Stats */}
            <Box sx={{ mb: 4 }}>
            
            {/* Action Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center" 
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PreviewIcon />}
                onClick={() => setPreviewOpen(true)}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  bgcolor: '#2b6777', 
                  '&:hover': { 
                    bgcolor: '#1e4d57',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(43, 103, 119, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Preview Portfolio
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                onClick={() => handleDeploy('github')}
                disabled={deployLoading}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  color: '#2b6777', 
                  borderColor: '#2b6777',
                  '&:hover': {
                    bgcolor: 'rgba(43, 103, 119, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {deployLoading ? 'Deploying...' : 'Deploy to GitHub'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<CloudUploadIcon />}
                onClick={() => handleDeploy('netlify')}
                disabled={deployLoading}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  color: '#2b6777', 
                  borderColor: '#2b6777',
                  '&:hover': {
                    bgcolor: 'rgba(43, 103, 119, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {deployLoading ? 'Deploying...' : 'Deploy to Netlify'}
              </Button>
            </Stack>

            {/* Statistics */}
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item>
                <Chip 
                  label={`${skills.length} Skills`} 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              </Grid>
              <Grid item>
                <Chip 
                  label={`${projects.length} Projects`} 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              </Grid>
              <Grid item>
                <Chip 
                  label={`${certifications.length} Certifications`} 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              </Grid>
              <Grid item>
                <Chip 
                  label={`${skills.filter(s => s.verified).length} Verified`} 
                  color="success" 
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
            sx={{ 
              mb: 4,
              '& .MuiTab-root': { 
                color: '#6c757d',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                minHeight: 60
              },
              '& .Mui-selected': { 
                color: '#2b6777' 
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#2b6777',
                height: 3,
                borderRadius: 1.5
              }
            }}
          >
            <Tab label="👤 Personal Info" />
            <Tab label="⚡ Skills" />
            <Tab label="🚀 Projects" />
            <Tab label="🏆 Certifications" />
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ mt: 4 }}>
            {/* Personal Info Tab */}
            {activeTab === 0 && (
              <Fade in={true} timeout={500}>
                <Card variant="outlined" sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom sx={{ color: '#2b6777', fontWeight: 'bold', mb: 4 }}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          variant="outlined"
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="Professional Title"
                          variant="outlined"
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="Bio"
                          multiline
                          rows={4}
                          variant="outlined"
                          value={personalInfo.bio}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="Career Goals"
                          multiline
                          rows={4}
                          variant="outlined"
                          value={personalInfo.careerGoals}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, careerGoals: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          variant="outlined"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="Phone"
                          variant="outlined"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="LinkedIn Profile"
                          variant="outlined"
                          value={personalInfo.linkedin}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="GitHub Profile"
                          variant="outlined"
                          value={personalInfo.github}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="Location"
                          variant="outlined"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Fade>
            )}

            {/* Skills Tab */}
            {activeTab === 1 && (
              <Fade in={true} timeout={500}>
                <Stack spacing={4}>
                  {/* Add New Skill */}
                  <Card sx={{ bgcolor: 'rgba(43, 103, 119, 0.05)', border: '2px dashed #2b6777' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ color: '#2b6777', fontWeight: 'bold' }}>
                        Add New Skill
                      </Typography>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Skill Name"
                            variant="outlined"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            placeholder="e.g., React, Python, AWS"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box>
                            <Typography gutterBottom fontWeight="medium">
                              Proficiency Level: {newSkill.level}%
                            </Typography>
                            <Slider
                              value={newSkill.level}
                              onChange={(_, value) => setNewSkill({ ...newSkill, level: value })}
                              min={0}
                              max={100}
                              step={5}
                              valueLabelDisplay="auto"
                              sx={{
                                color: '#2b6777',
                                '& .MuiSlider-thumb': {
                                  width: 20,
                                  height: 20,
                                },
                                '& .MuiSlider-track': {
                                  height: 6,
                                },
                                '& .MuiSlider-rail': {
                                  height: 6,
                                  opacity: 0.3,
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Button
                            variant="contained"
                            onClick={handleAddSkill}
                            startIcon={<AddIcon />}
                            fullWidth
                            size="large"
                            sx={{ 
                              bgcolor: '#2b6777', 
                              py: 1.5,
                              '&:hover': { bgcolor: '#1e4d57' }
                            }}
                          >
                            Add Skill
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Skills List */}
                  <Grid container spacing={3}>
                    {skills.map((skill, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 25px rgba(43, 103, 119, 0.15)'
                            }
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {skill.name}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => toggleSkillVerification(index)}
                                  sx={{ 
                                    color: skill.verified ? '#2b6777' : '#6c757d',
                                    '&:hover': { bgcolor: 'rgba(43, 103, 119, 0.1)' }
                                  }}
                                >
                                  <VerifiedIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                                  sx={{ '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Proficiency: {skill.level}%
                              </Typography>
                              {skill.verified && (
                                <Chip 
                                  label="Verified" 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: '#2b6777', 
                                    color: 'white',
                                    fontWeight: 'bold'
                                  }} 
                                />
                              )}
                            </Box>
                            
                            <LinearProgress
                              variant="determinate"
                              value={skill.level}
                              sx={{
                                height: 10,
                                borderRadius: 5,
                                bgcolor: '#e9ecef',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: skill.verified ? '#2b6777' : '#52ab98',
                                  borderRadius: 5,
                                },
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Fade>
            )}

            {/* Projects Tab */}
            {activeTab === 2 && (
              <Fade in={true} timeout={500}>
                <Stack spacing={4}>
                  {/* Add New Project */}
                  <Card sx={{ bgcolor: 'rgba(43, 103, 119, 0.05)', border: '2px dashed #2b6777' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ color: '#2b6777', fontWeight: 'bold' }}>
                        Add New Project
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={3}>
                            <TextField
                              fullWidth
                              label="Project Title"
                              variant="outlined"
                              value={newProject.title}
                              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                              placeholder="e.g., E-commerce Platform"
                            />
                            <TextField
                              fullWidth
                              label="Description"
                              multiline
                              rows={4}
                              variant="outlined"
                              value={newProject.description}
                              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                              placeholder="Describe your project, its features, and impact..."
                            />
                            <Box>
                              <Typography variant="body1" gutterBottom fontWeight="medium">
                                Technologies Used
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                {newProject.technologies.map((tech, index) => (
                                  <Chip
                                    key={index}
                                    label={tech}
                                    onDelete={() => handleRemoveTechnology(tech)}
                                    sx={{ bgcolor: '#2b6777', color: 'white' }}
                                  />
                                ))}
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                  size="small"
                                  label="Add Technology"
                                  value={newTech}
                                  onChange={(e) => setNewTech(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
                                  placeholder="e.g., React"
                                />
                                <Button
                                  variant="outlined"
                                  onClick={handleAddTechnology}
                                  sx={{ color: '#2b6777', borderColor: '#2b6777' }}
                                >
                                  Add
                                </Button>
                              </Box>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={3}>
                            <TextField
                              fullWidth
                              label="Live Demo URL"
                              variant="outlined"
                              value={newProject.liveUrl}
                              onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                              placeholder="https://your-project.com"
                            />
                            <TextField
                              fullWidth
                              label="GitHub Repository URL"
                              variant="outlined"
                              value={newProject.githubUrl}
                              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                              placeholder="https://github.com/username/project"
                            />
                            <Button
                              variant="contained"
                              onClick={handleAddProject}
                              startIcon={<AddIcon />}
                              size="large"
                              fullWidth
                              sx={{ 
                                bgcolor: '#2b6777', 
                                py: 1.5,
                                mt: 2,
                                '&:hover': { bgcolor: '#1e4d57' }
                              }}
                            >
                              Add Project
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Projects List */}
                  <Grid container spacing={3}>
                    {projects.map((project, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              transform: 'translateY(-6px)',
                              boxShadow: '0 10px 30px rgba(43, 103, 119, 0.15)'
                            }
                          }}
                        >
                          <CardContent sx={{ p: 3, flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#2b6777' }}>
                                {project.title}
                              </Typography>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                                sx={{ '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
                              {project.description}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              {project.technologies.map((tech, techIndex) => (
                                <Chip
                                  key={techIndex}
                                  label={tech}
                                  size="small"
                                  sx={{ 
                                    mr: 1, 
                                    mb: 1,
                                    bgcolor: 'rgba(43, 103, 119, 0.1)',
                                    color: '#2b6777',
                                    fontWeight: 'medium'
                                  }}
                                />
                              ))}
                            </Box>
                          </CardContent>
                          <CardActions sx={{ p: 3, pt: 0 }}>
                            <Button 
                              size="small" 
                              variant="contained"
                              sx={{ 
                                bgcolor: '#2b6777', 
                                '&:hover': { bgcolor: '#1e4d57' },
                                mr: 1
                              }}
                              startIcon={<LaunchIcon />}
                            >
                              Live Demo
                            </Button>
                            <Button 
                              size="small" 
                              variant="outlined"
                              sx={{ color: '#2b6777', borderColor: '#2b6777' }}
                              startIcon={<GitHubIcon />}
                            >
                              Code
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Fade>
            )}

            {/* Certifications Tab */}
            {activeTab === 3 && (
              <Fade in={true} timeout={500}>
                <Stack spacing={4}>
                  {/* Add New Certification */}
                  <Card sx={{ bgcolor: 'rgba(43, 103, 119, 0.05)', border: '2px dashed #2b6777' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ color: '#2b6777', fontWeight: 'bold' }}>
                        Add New Certification
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Certification Name"
                            variant="outlined"
                            value={newCertification.name}
                            onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            placeholder="e.g., AWS Certified Developer"
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Issuing Organization"
                            variant="outlined"
                            value={newCertification.issuer}
                            onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                            placeholder="e.g., Amazon Web Services"
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            label="Issue Date"
                            type="date"
                            variant="outlined"
                            value={newCertification.date}
                            onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            label="Credential ID"
                            variant="outlined"
                            value={newCertification.credentialId}
                            onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
                            placeholder="ABC-123456"
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            variant="contained"
                            onClick={handleAddCertification}
                            startIcon={<AddIcon />}
                            fullWidth
                            size="large"
                            sx={{ 
                              bgcolor: '#2b6777', 
                              py: 1.5,
                              '&:hover': { bgcolor: '#1e4d57' }
                            }}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Certifications List */}
                  <Grid container spacing={3}>
                    {certifications.map((cert, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 25px rgba(43, 103, 119, 0.15)'
                            }
                          }}
                        >
                          <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                <Avatar sx={{ bgcolor: '#2b6777', width: 48, height: 48 }}>
                                  <CertificationIcon />
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#2b6777' }}>
                                    {cert.name}
                                  </Typography>
                                  <Typography variant="body1" color="text.secondary" gutterBottom>
                                    <strong>{cert.issuer}</strong>
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Issued: {cert.date}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    ID: {cert.credentialId}
                                  </Typography>
                                </Box>
                              </Box>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setCertifications(certifications.filter((_, i) => i !== index))}
                                sx={{ '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Fade>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Portfolio Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth={false}
        fullWidth
        fullScreen
        sx={{ '& .MuiDialog-paper': { margin: 0 } }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#2b6777' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Portfolio Preview - {personalInfo.name}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setPreviewOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0, bgcolor: '#f5f7fa' }}>
          <PortfolioPreview />
        </DialogContent>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={deploySuccess}
        autoHideDuration={6000}
        onClose={() => setDeploySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setDeploySuccess(false)}
          sx={{ 
            width: '100%',
            fontSize: '1.1rem',
            fontWeight: 600,
            '& .MuiAlert-icon': { fontSize: '1.5rem' }
          }}
        >
          🚀 Portfolio deployed successfully! Your professional site is now live and ready to impress.
        </Alert>
      </Snackbar>
    </Box>
  </ThemeProvider>
  );
};

export default CompletePortfolioBuilder;