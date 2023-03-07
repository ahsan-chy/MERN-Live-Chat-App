import React, { useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "../../assests/css/login.css";
import login from "../../assests/images/Login.png";
import { useDispatch } from 'react-redux';
import { email, token } from "../../redux/userSlice";
import axios from "axios";
import LinkButton from "../Link";
import { LOGIN_URL } from "../../constants/apis";
import { useNavigate } from "react-router-dom";


const Logins = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const submitLogin = async(e) => {
    e.preventDefault();
    if( !email || !password)
    {
        alert("Fill All Fields")
    }
    else{
        try{
            const res = await axios.post(LOGIN_URL, {
                  email: userEmail,
                  password: password
            }).then(response => {
              // console.log(response)
              console.log(response.data)
              navigate('/')
              const user = response.data
              dispatch(email(user.email));
              dispatch(token(user.token));
            })
          }
          catch (error){
            console.log("Error is Error",error.message)
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
                  <Box style={{display:'flex', justifyContent:'space-between', marginTop:20, marginBottom:20}}>

                  <LinkButton to="/signup" label={"Signup"} className="btn-link" />

                  <LinkButton to="/forgot-password" label={"Forgot Password"} className="btn-link"  />

                  </Box>
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
