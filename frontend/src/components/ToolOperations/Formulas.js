import React, { useState } from "react";
import { TextField, Typography, Box, Paper } from "@mui/material";

const formulasAll = {
  // Algebra
  "quadratic formula": "x = (-b ± √(b² - 4ac)) / (2a)",
  "sum of n natural numbers": "S = n(n + 1) / 2",
  "difference of squares": "a² - b² = (a - b)(a + b)",

  // Geometry
  "area of triangle": "A = ½ × base × height",
  "area of circle": "A = πr²",
  "circumference of circle": "C = 2πr",
  "pythagorean theorem": "a² + b² = c²",

  // Trigonometry
  "sin rule": "sin(A)/a = sin(B)/b = sin(C)/c",
  "cos rule": "c² = a² + b² - 2ab × cos(C)",
  "sin squared plus cos squared": "sin²θ + cos²θ = 1",
  "tan squared plus one": "1 + tan²θ = sec²θ",

  // Calculus
  "derivative of x power n": "d/dx (xⁿ) = nxⁿ⁻¹",
  "integral of x power n": "∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C",

  // Statistics
  mean: "Mean = Σx / n",
  variance: "σ² = Σ(x - μ)² / n",
  "standard deviation": "σ = √σ²",
};

export default function Formulas() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    const matchKey = Object.keys(formulasAll).find((key) =>
      value.includes(key)
    );

    if (matchKey) {
      setResult(formulasAll[matchKey]);
    } else {
      setResult("");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <TextField
        fullWidth
        label="Ask a Formula (e.g., area of circle)"
        variant="outlined"
        value={input}
        onChange={handleChange}
      />
      {result && (
        <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6">Formula:</Typography>
          <Typography variant="body1">{result}</Typography>
        </Paper>
      )}
    </Box>
  );
}
