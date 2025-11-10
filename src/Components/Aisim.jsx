"use client"

import { useState } from "react"
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
  Stack,
} from "@mui/material"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    secondary: {
      main: "#52ab98",
    },
    background: {
      default: "#c5e8e0",
      paper: "#ffffff",
    },
    success: {
      main: "#52ab98",
    },
    warning: {
      main: "#2b6777",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#2b6777",
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#2b6777",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#2b6777",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.1rem",
      color: "#2b6777",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(43, 103, 119, 0.08)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(43, 103, 119, 0.12)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(43, 103, 119, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(43, 103, 119, 0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s ease",
        },
      },
    },
  },
})

const salaryData = [
  { month: "Current", salary: 75000 },
  { month: "3 Months", salary: 85000 },
  { month: "6 Months", salary: 95000 },
  { month: "1 Year", salary: 120000 },
  { month: "2 Years", salary: 150000 },
]

const industryDemand = [
  { name: "Tech", current: 85, future: 95 },
  { name: "Finance", current: 75, future: 88 },
  { name: "Healthcare", current: 70, future: 90 },
  { name: "E-commerce", current: 80, future: 92 },
  { name: "Education", current: 65, future: 85 },
]

const remoteWorkData = [
  { name: "2024", value: 65 },
  { name: "2025", value: 75 },
  { name: "2026", value: 85 },
  { name: "2027", value: 90 },
]

const skillsDistribution = [
  { name: "AI/ML", value: 35, color: "#2b6777" },
  { name: "Cloud", value: 25, color: "#52ab98" },
  { name: "DevOps", value: 20, color: "#7ec8c2" },
  { name: "Blockchain", value: 20, color: "#a8d8d0" },
]

export default function App() {
  const [selectedSkills, setSelectedSkills] = useState(["AI", "Cloud"])
  const [timeframe, setTimeframe] = useState("6")

  const futureRoles = [
    {
      title: "AI Solutions Architect",
      salary: "$150,000 - $180,000",
      skills: ["AI/ML", "Cloud Architecture", "System Design"],
      companies: ["Google", "Amazon", "Microsoft"],
      growth: "+45%",
    },
    {
      title: "Cloud AI Engineer",
      salary: "$140,000 - $170,000",
      skills: ["Cloud Platforms", "ML Operations", "DevOps"],
      companies: ["IBM", "Oracle", "Salesforce"],
      growth: "+38%",
    },
    {
      title: "ML Engineering Lead",
      salary: "$160,000 - $190,000",
      skills: ["Machine Learning", "Team Leadership", "Product Strategy"],
      companies: ["Meta", "Apple", "Netflix"],
      growth: "+52%",
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Paper
            sx={{
              p: 4,
              mb: 6,
              background: "linear-gradient(135deg, #2b6777 0%, #52ab98 100%)",
              color: "white",
              textAlign: "center",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(43, 103, 119, 0.3)",
            }}
          >
            <Typography variant="h3" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
              AI Career Simulator
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95, color: "white", fontWeight: 400 }}>
              Discover your future career path with AI-powered predictions
            </Typography>
          </Paper>

          {/* Skills Selection and Timeframe */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Select Your Learning Path
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                  {["AI", "Cloud", "DevOps", "Blockchain"].map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      color={selectedSkills.includes(skill) ? "primary" : "default"}
                      variant={selectedSkills.includes(skill) ? "filled" : "outlined"}
                      onClick={() => {
                        setSelectedSkills((prev) =>
                          prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
                        )
                      }}
                      sx={{
                        fontSize: "0.95rem",
                        py: 2.5,
                        px: 1,
                      }}
                    />
                  ))}
                </Box>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Timeframe</InputLabel>
                  <Select value={timeframe} label="Timeframe" onChange={(e) => setTimeframe(e.target.value)}>
                    <MenuItem value="3">3 Months</MenuItem>
                    <MenuItem value="6">6 Months</MenuItem>
                    <MenuItem value="12">1 Year</MenuItem>
                    <MenuItem value="24">2 Years</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, background: "linear-gradient(135deg, #52ab98 0%, #3d8b7f 100%)", color: "white" }}>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  Career Growth
                </Typography>
                <Typography variant="h3" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
                  +45%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Average salary increase in 2 years
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Main Charts Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {/* Salary Growth */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Salary Growth Projection
                </Typography>
                <Box sx={{ height: 350, width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2b6777" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#2b6777" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()}`, "Salary"]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          backgroundColor: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="salary"
                        stroke="#2b6777"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSalary)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* Skills Distribution */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Skills Distribution
                </Typography>
                <Box sx={{ height: 350, width: "100%", display: "flex", justifyContent: "center" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillsDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Industry Demand and Remote Work */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Industry Demand Trends
                </Typography>
                <Box sx={{ height: 350, width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryDemand} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          backgroundColor: "#fff",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Bar dataKey="current" name="Current Demand" fill="#2b6777" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="future" name="Future Demand" fill="#52ab98" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Remote Work Potential
                </Typography>
                <Box sx={{ height: 350, width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={remoteWorkData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRemote" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#52ab98" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#52ab98" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          backgroundColor: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#52ab98"
                        strokeWidth={3}
                        dot={{ fill: "#52ab98", r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Future Roles Section */}
          <Typography variant="h4" sx={{ mb: 3, color: "#2b6777", fontWeight: 600 }}>
            Potential Future Roles
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {futureRoles.map((role, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
                      <Typography variant="h6" sx={{ flex: 1 }}>
                        {role.title}
                      </Typography>
                      <Chip label={role.growth} color="success" size="small" sx={{ ml: 1, fontWeight: 600 }} />
                    </Box>
                    <Typography variant="body1" sx={{ color: "#2b6777", fontWeight: 600, mb: 2 }}>
                      {role.salary}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "#666" }}>
                        Required Skills:
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                        {role.skills.map((skill, i) => (
                          <Chip key={i} label={skill} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <strong>Top Companies:</strong> {role.companies.join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
