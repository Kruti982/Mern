import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";

const LoginId = React.createContext();
function Context() {
  const [user, setUser] = useState("Kruti");
  return <LoginId.Provider value={user} />;
}

function Login() {
  const [id, setId] = useState(false);

  let navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signin");
  };
  return (
    <>
      <Box
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
            <InputLabel htmlFor="input-with-icon-adornment">
              Username
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            sx={{ m: 1 }}
          />
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            sx={{ marginTop: "0.5rem" }}
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
export { Login, Context };
