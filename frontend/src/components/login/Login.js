import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
import { TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import axios from "axios";

export default function Login() {
  const [id, setId] = useState(false);
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    passwordMatch: false,
    passwordStrength: true,
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    axios
      .get("http://localhost:5000/api/users", {
        params: {
          email: form.email,
          password: form.password,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Data available");
        if (response.status === 200) {
          navigate("/homepage");
        }
      })
      .catch((err) => {
        console.log("Data not available");
      });
  };

  const handleSignUp = () => {
    navigate("/signin");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: !emailRegex.test(value),
      }));
    }

    if (name === "password") {
      const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
      setErrors((prev) => ({
        ...prev,
        passwordStrength: passwordValid.test(value),
      }));
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "grey",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              error={errors.email && form.email.length > 0}
            />
          </FormControl>

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            error={!errors.passwordStrength && form.password.length > 0}
            helperText={
              !errors.passwordStrength && form.password.length > 0
                ? "Use uppercase, lowercase, number & symbol"
                : ""
            }
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            sx={{ marginTop: "0.5rem" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div>
            <p>
              Do not have an account?{" "}
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleSignUp}
              >
                SignUp
              </span>{" "}
              here!!
            </p>
          </div>
        </Paper>
      </Box>
    </>
  );
}
