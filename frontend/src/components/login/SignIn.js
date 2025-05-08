import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: false,
    email: false,
    passwordMatch: true,
    passwordStrength: true,
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
      setErrors((prev) => ({
        ...prev,
        phone: updatedValue.length > 0 && updatedValue.length < 10,
      }));
    }

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
        passwordMatch: value === form.confirmPassword,
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        passwordMatch: form.password === value,
      }));
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  return (
    <div
      className="register"
      style={{
        backgroundColor: "grey",
        marginTop: "8rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#8b7474",
          border: "2px solid black",
          boxShadow: "5px 5px 2px",
          borderRadius: "2%",
        }}
        noValidate
        autoComplete="off"
      >
        <CloseIcon
          sx={{ float: "right", cursor: "pointer", m: 1, marginLeft: "18rem" }}
          onClick={handleSubmit}
        />

        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          variant="standard"
        />
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          helperText={errors.phone ? "Phone number must be 10 digits" : ""}
          variant="standard"
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "Invalid email format" : ""}
          variant="standard"
        />
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
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          error={!errors.passwordMatch && form.confirmPassword.length > 0}
          helperText={
            !errors.passwordMatch && form.confirmPassword.length > 0
              ? "Passwords do not match"
              : ""
          }
          variant="standard"
        />

        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={handleSubmit}
          disabled={
            errors.phone ||
            errors.email ||
            !errors.passwordMatch ||
            !errors.passwordStrength ||
            Object.values(form).some((field) => field === "")
          }
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
