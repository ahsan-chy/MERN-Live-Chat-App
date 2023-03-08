import React, { useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "../../assests/css/signup.css";
import signup from "../../assests/images/signup.png";
import LinkButton from "../Link";
import { useDispatch } from "react-redux";
import { RESET_PASSWORD_URL } from "../../constants/apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RestPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const submitReset = async (e) => {
    e.preventDefault();
    if ( !userEmail || !password) {
      toast.error('All Fields Must be field', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      try {
        const res = await axios
          .patch(`${RESET_PASSWORD_URL}${userEmail}`, {
            // userName: "abc@gmail.com",
            password: password,
          })
          .then((response) => {
            // console.log(response)
            toast.success('Password Reset Successfully', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            console.log("response.data", response.data);
            navigate("/login")
          }).catch(error => {
            console.log(error.response.data.error)
            toast.error(error.response.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
      } catch (error){
        console.log(error.response.data.error)
        toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
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
              Forgot Password
            </Typography>
            <Box>
              <form onSubmit={submitReset}>
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
                    Reset Password
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
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default RestPassword;
