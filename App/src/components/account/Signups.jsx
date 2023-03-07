import React, { useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "../../assests/css/signup.css";
import signup from "../../assests/images/signup.png";
import LinkButton from "../Link";
import { useDispatch } from "react-redux";
import { SIGNUP_URL } from "../../constants/apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signups = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const submitSignup = async (e) => {
    e.preventDefault();
    if ( !userEmail || !password) {
      alert("Fill All Fields");
    } else {
      try {
        const res = await axios
          .post(SIGNUP_URL, {
            // userName: "abc@gmail.com",
            email: userEmail,
            password: password,
          })
          .then((response) => {
            // console.log(response)
            console.log(response.data);
            navigate("/login")
          });
      } catch (error) {
        console.log("Error is Error", error.message);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, border: 0, mt: 10 }}>
      <>
        <Grid container spacing={2}>
          <Grid
            xs={6}
            md={6}
            className="img-box"
            sx={{ flexGrow: 1, border: 0 }}
          >
            <img className="logo-image" src={signup} alt="bio-img" />
          </Grid>
          <Grid
            xs={6}
            md={6}
            sx={{ flexGrow: 1, textAlign: "left", px: 21, mt: 10 }}
          >
            <Typography variant="h4" className="signup-heading">
              Sign Up
            </Typography>
            <Box>
              <form onSubmit={submitSignup}>
                <FormControl fullWidth variant="standard" sx={{ my: 2 }}>
                  <TextField
                    type="text"
                    id="username"
                    label="Username"
                    variant="standard"
                    className="input-box"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ my: 2 }}>
                  <TextField
                    type="email"
                    id="email"
                    label="Email"
                    variant="standard"
                    className="input-box"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ my: 2 }}>
                  <TextField
                    type="password"
                    id="password"
                    label="Password"
                    variant="standard"
                    className="input-box"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    className="signup-btn"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </FormControl>
                <Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <LinkButton
                      to="/login"
                      label={"LogIn"}
                      className="login-btnn"
                    />
                  </Box>
                  <FormControl fullWidth variant="standard">
                    <Button variant="contained" className="social-btn">
                      Signup with Google
                    </Button>
                  </FormControl>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default Signups;
