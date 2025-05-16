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

// Geometry formulas
const geometryData = {
  "Area of Circle": "A = π × r²",
  "Perimeter of Circle": "P = 2 × π × r",
  "Area of Square": "A = side²",
  "Perimeter of Square": "P = 4 × side",
  "Area of Triangle": "A = ½ × base × height",
  "Perimeter of Triangle": "P = a + b + c",
};

// MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#000000" },
    text: { primary: "#ffffff" },
  },
  typography: { fontFamily: '"Roboto", sans-serif' },
});

const Geometry = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedTopic(selected);
    setResult(geometryData[selected] || "");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: "10px",
              bgcolor: "#1c1c1c",
              color: "white",
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Geometry Explorer
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
                {Object.keys(geometryData).map((item, index) => (
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

export default Geometry;
