import React, { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  Paper,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function JobLocationForm() {
  const [jobInput, setJobInput] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [jobTitles, setJobTitles] = useState([])
  const [locations, setLocations] = useState([])

  const navigate = useNavigate()

  const addJobTitle = () => {
    if (jobInput.trim() && jobTitles.length < 5) {
      setJobTitles([...jobTitles, jobInput.trim()])
      setJobInput("")
    }
  }

  const addLocation = () => {
    if (locationInput.trim() && locations.length < 3) {
      setLocations([...locations, locationInput.trim()])
      setLocationInput("")
    }
  }

  const removeJobTitle = (index) => {
    setJobTitles(jobTitles.filter((_, i) => i !== index))
  }

  const removeLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (jobTitles.length > 0 && locations.length > 0) {
      navigate("/dashboard")
    } else {
      alert("Please add at least one job title and one location.")
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#e0f7f3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#2b6777",
          color: "#e0f7f3",
          p: 5,
          borderRadius: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" gutterBottom>
          What kind of jobs are you looking for?
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            label="Job Title"
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            variant="outlined"
            InputProps={{ style: { color: "#e0f7f3" } }}
            InputLabelProps={{ style: { color: "#e0f7f3" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#e0f7f3" },
              },
            }}
          />
          <Button
  onClick={addJobTitle}
  variant="contained"
  sx={{
    backgroundColor: "#e0f7f3",
    color: "#2b6777",
    "&:hover": {
      backgroundColor: "#c8ece7",
    },
  }}
>
  Add
</Button>

        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          {jobTitles.map((title, index) => (
            <Chip
              key={index}
              label={title}
              onDelete={() => removeJobTitle(index)}
              sx={{ backgroundColor: "#e0f7f3", color: "#2b6777" }}
            />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>
          Preferred Locations (Remote allowed)
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            label="Location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            variant="outlined"
            InputProps={{ style: { color: "#e0f7f3" } }}
            InputLabelProps={{ style: { color: "#e0f7f3" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#e0f7f3" },
              },
            }}
          />
          <Button
  onClick={addLocation}
  variant="contained"
  sx={{
    backgroundColor: "#e0f7f3",
    color: "#2b6777",
    "&:hover": {
      backgroundColor: "#c8ece7",
    },
  }}
>
  Add
</Button>

        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          {locations.map((loc, index) => (
            <Chip
              key={index}
              label={loc}
              onDelete={() => removeLocation(index)}
              sx={{ backgroundColor: "#e0f7f3", color: "#2b6777" }}
            />
          ))}
        </Box>

        <Button
  variant="contained"
  onClick={handleSubmit}
  fullWidth
  sx={{
    mt: 2,
    backgroundColor: "#e0f7f3",
    color: "#2b6777",
    "&:hover": {
      backgroundColor: "#c8ece7",
    },
  }}
>
  Continue to Dashboard
</Button>

      </Paper>
    </Box>
  )
}

export default JobLocationForm
