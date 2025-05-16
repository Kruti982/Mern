import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

const questions = [
  {
    question: "What is the derivative of x²?",
    options: ["2x", "x", "x²", "1"],
    correctAnswer: "2x",
  },
  {
    question: "Solve for x: 2x + 3 = 11",
    options: ["4", "3", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "What is the value of sin(90°)?",
    options: ["1", "0", "0.5", "-1"],
    correctAnswer: "1",
  },
  {
    question: "What is (a + b)²?",
    options: ["a² + 2ab + b²", "a² + b²", "a² + ab + b²", "2a² + 2b²"],
    correctAnswer: "a² + 2ab + b²",
  },
  {
    question:
      "What is the slope of a line perpendicular to a line with slope 2?",
    options: ["-1/2", "1/2", "-2", "2"],
    correctAnswer: "-1/2",
  },
  {
    question: "Factorize: x² - 9",
    options: [
      "(x - 3)(x + 3)",
      "(x - 9)(x + 1)",
      "(x - 1)(x + 9)",
      "(x - 2)(x + 4)",
    ],
    correctAnswer: "(x - 3)(x + 3)",
  },
  {
    question: "What is the area of a circle with radius 7 cm?",
    options: ["154 cm²", "49 cm²", "44 cm²", "100 cm²"],
    correctAnswer: "154 cm²",
  },
  {
    question: "Solve: log₁₀(1000)",
    options: ["3", "2", "10", "1"],
    correctAnswer: "3",
  },
  {
    question: "What is the value of cos(0°)?",
    options: ["1", "0", "-1", "0.5"],
    correctAnswer: "1",
  },
  {
    question: "If A = 60°, what is the value of tanA in a right triangle?",
    options: ["√3", "1", "0", "1/√3"],
    correctAnswer: "√3",
  },
  {
    question: "What is the sum of interior angles of a hexagon?",
    options: ["720°", "540°", "360°", "600°"],
    correctAnswer: "720°",
  },
  {
    question: "What is the equation of a line with slope 3 and y-intercept -2?",
    options: ["y = 3x - 2", "y = -3x + 2", "y = 2x + 3", "y = 3x + 2"],
    correctAnswer: "y = 3x - 2",
  },
  {
    question: "What is the volume of a cube with side length 5 cm?",
    options: ["125 cm³", "25 cm³", "100 cm³", "150 cm³"],
    correctAnswer: "125 cm³",
  },
  {
    question: "If f(x) = x², what is f(3)?",
    options: ["9", "6", "3", "12"],
    correctAnswer: "9",
  },
  {
    question: "What is the quadratic formula?",
    options: [
      "(-b ± √(b² - 4ac)) / 2a",
      "(-b ± √(b² + 4ac)) / 2a",
      "(-b ± √(b² - 2ac)) / a",
      "(b ± √(b² - 4ac)) / 2a",
    ],
    correctAnswer: "(-b ± √(b² - 4ac)) / 2a",
  },
  {
    question: "Find the median of: 3, 5, 7, 9, 11",
    options: ["7", "5", "9", "8"],
    correctAnswer: "7",
  },
  {
    question: "What is 2³ × 2²?",
    options: ["2⁵", "2⁶", "2⁴", "2³"],
    correctAnswer: "2⁵",
  },
  {
    question: "Simplify: √(49)",
    options: ["7", "6", "8", "5"],
    correctAnswer: "7",
  },
  {
    question: "Find the HCF of 18 and 24",
    options: ["6", "3", "12", "9"],
    correctAnswer: "6",
  },
  {
    question: "What is the result of (3x)(2x)?",
    options: ["6x²", "5x²", "6x", "x⁶"],
    correctAnswer: "6x²",
  },
];

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentQuestion]);

  const handleOptionClick = (option) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
      setTimer(120);
    }
  };

  const getOptionStyle = (option) => {
    if (!answered) return {};
    if (option === questions[currentQuestion].correctAnswer) {
      return { backgroundColor: "#4caf50", color: "#fff" };
    }
    if (
      option === selectedOption &&
      option !== questions[currentQuestion].correctAnswer
    ) {
      return { backgroundColor: "#f44336", color: "#fff" };
    }
    return {};
  };

  if (showResult) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Quiz Finished!
        </Typography>
        <Typography variant="h5">
          Your Score: {score} / {questions.length}
        </Typography>
      </Box>
    );
  }

  const q = questions[currentQuestion];

  return (
    <Box
      p={4}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="100%" maxWidth="600px">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Typography variant="h6">Time Left: {timer}s</Typography>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {q.question}
            </Typography>

            <Stack spacing={2} mt={3} alignItems="center">
              {q.options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    width: "100%",
                    maxWidth: "400px",
                    ...getOptionStyle(option),
                  }}
                  onClick={() => handleOptionClick(option)}
                  disabled={answered}
                >
                  {option}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Box mt={3} textAlign="right">
          <Button variant="contained" onClick={handleNext} disabled={!answered}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MathQuiz;
