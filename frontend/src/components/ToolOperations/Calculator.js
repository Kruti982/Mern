import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";

// Utilities
const factorial = (n) => {
  if (n < 0) return "Invalid";
  return n === 0 ? 1 : n * factorial(n - 1);
};

const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

export default function MathMagic() {
  const [showHistory, setShowHistory] = useState(false);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [isRadians, setIsRadians] = useState(false);

  const toRadians = (angle) => (isRadians ? angle : (angle * Math.PI) / 180);

  const handleOperation = (operation) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a)) {
      setResult("Enter a valid first number.");
      return;
    }

    let res = "";

    try {
      switch (operation) {
        case "add":
          res = `${a + b}`;
          break;
        case "sub":
          res = `${a - b}`;
          break;
        case "mul":
          res = `${a * b}`;
          break;
        case "div":
          res = b !== 0 ? `${a / b}` : "Division by zero!";
          break;
        case "mod":
          res = b !== 0 ? `${a % b}` : "Modulo by zero!";
          break;
        case "pow":
          res = `${a ** b}`;
          break;
        case "sqrt":
          res = `√${a} = ${Math.sqrt(a).toFixed(4)}`;
          break;
        case "fact":
          res = `${a}! = ${factorial(a)}`;
          break;
        case "gcd":
          res = `GCD(${a}, ${b}) = ${gcd(a, b)}`;
          break;
        case "lcm":
          res = `LCM(${a}, ${b}) = ${lcm(a, b)}`;
          break;
        default:
          res = "Unknown operation";
      }
    } catch (e) {
      res = "Error in calculation";
    }

    setResult(res);
    setHistory((prev) => [`${operation}: ${res}`, ...prev.slice(0, 9)]);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Paper elevation={4} style={{ padding: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          🧮 Math Magic
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={isRadians}
              onChange={() => setIsRadians((prev) => !prev)}
            />
          }
          label={`Angle Mode: ${isRadians ? "Radians" : "Degrees"}`}
        />

        <TextField
          fullWidth
          label="First Number"
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Second Number"
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          margin="normal"
        />

        <Grid container spacing={1} marginTop={1}>
          {[
            { label: "Add", op: "add" },
            { label: "Subtract", op: "sub" },
            { label: "Multiply", op: "mul" },
            { label: "Divide", op: "div" },
            { label: "Mod", op: "mod" },
            { label: "Power", op: "pow" },
            { label: "√", op: "sqrt" },
            { label: "!", op: "fact" },
            { label: "GCD", op: "gcd" },
            { label: "LCM", op: "lcm" },
          ].map((btn) => (
            <Grid item xs={4} sm={3} md={2} key={btn.op}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleOperation(btn.op)}
              >
                {btn.label}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" align="center" marginTop={3}>
          {result}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowHistory((prev) => !prev)}
          style={{ marginTop: "2rem", marginRight: "1rem" }}
        >
          {showHistory ? "Hide History" : "Show History"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setHistory([])}
          style={{ marginTop: "2rem" }}
        >
          Clear History
        </Button>

        {showHistory && history.length > 0 && (
          <>
            <Typography variant="h6" style={{ marginTop: "1rem" }}>
              🕘 History
            </Typography>
            <ul style={{ paddingLeft: "1rem" }}>
              {history.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </Paper>
    </Container>
  );
}
