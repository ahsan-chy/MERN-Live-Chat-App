import React, { useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "../../assests/css/login.css";
import login from "../../assests/images/Login.png";
import { useDispatch, useSelector } from 'react-redux';
import { email, token } from "../../redux/userSlice";

const Logins = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const emails = useSelector((state) => state.user.email);
  // const passwords = useSelector((state) => state.user.token);
  // console.log(emails,passwords)

  const submitLogin = (e) => {
    e.preventDefault();
    // console.log("Email:", email)
    // console.log("Password:", password)
    dispatch(email(userEmail));
    dispatch(token(password));
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
            <img className="logo-image" src={login} alt="bio-img" />
          </Grid>
          <Grid
            xs={6}
            md={6}
            sx={{ flexGrow: 1, textAlign: "left", px: 20, mt: 10 }}
          >
            <Typography variant="h4" className="login-heading">
              Login
            </Typography>
            <Typography
              variant="subtitle1"
              className="bio-heading"
              sx={{ mt: 3 }}
            >
              Please Enter valid credentials to login
            </Typography>
            <Box>
              <form onSubmit={submitLogin}>
                <FormControl fullWidth variant="standard" sx={{ my: 2 }}>
                  <TextField
                    type="text"
                    id="username"
                    label="Username"
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
                    className="login-btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </FormControl>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ textAlign: "center", my: 5 }}
                  >
                    Forgot Password
                  </Typography>
                  <FormControl fullWidth variant="standard">
                    <Button variant="contained" className="social-btn">
                      Social Login
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

export default Logins;
