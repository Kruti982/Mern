import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const graphData = {
  "Line Graph":
    "A Line Graph is a type of chart used to represent data points over a continuous period or ordered categories.",
  "Bar Chart":
    "A Bar Chart displays data with rectangular bars, representing values across categories, making it easy to compare quantities visually.",
  "Pie Chart":
    "A pie chart is a circular graph divided into segments to represent proportions of a whole dataset visually.",
  "Scatter Plot":
    "A scatter plot is a graph that uses dots to represent the values of two variables, showing their relationship.",
  Histogram:
    "A histogram is a graphical representation of data distribution, using bars to show the frequency of data within specific intervals.",
};

// Dark theme customization
const theme = createTheme({
  palette: {
    mode: "dark", // Enables full dark theme
    primary: {
      main: "#00e5ff",
    },
    background: {
      default: "#121212", // Background for whole page
      paper: "#1c1c1c", // Background for Paper elements
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

const GraphsAndGeometry = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedTopic(selected);
    setResult(graphData[selected] || "");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "black",
          color: "text.primary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: "10px",
              bgcolor: "black",
              color: "text.primary",
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Graph Explorer
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="topic-label" sx={{ color: "white" }}>
                Select a Topic
              </InputLabel>
              <Select
                labelId="topic-label"
                value={selectedTopic}
                onChange={handleChange}
                label="Select a Topic"
                sx={{
                  color: "white",
                  bgcolor: "#1c1c1c",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00e5ff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00e5ff",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#1c1c1c",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="">Select...</MenuItem>
                {Object.keys(graphData).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {result && (
              <>
                <Typography variant="h6">Result:</Typography>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#333",
                    borderRadius: "8px",
                    color: "#00e5ff",
                  }}
                >
                  <Typography>{result}</Typography>
                </Box>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GraphsAndGeometry;
