import React from 'react';
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import '../../assests/css/login.css';
import signup from "../../assests/images/signup.png";

const Signups = () => {
  return (
    <Box sx={{ flexGrow: 1, border: 0, mt:10 }}>
        <>
          <Grid container spacing={2}>
          <Grid xs={6} md={6} className="img-box"  sx={{ flexGrow: 1, border: 0 }}>
              <img className="logo-image"
                src={signup}
                alt="bio-img"
              />
            </Grid>
            <Grid xs={6} md={6}  sx={{ flexGrow: 1, textAlign: 'left', px:20, mt:10 }}>
              <Typography variant="h4" className="login-heading">
                Sign Up
              </Typography>
              <Box>
                <form onSubmit={console.log("Form Submited")}>
                  <FormControl fullWidth variant="standard" sx={{my:2}}>
                    <TextField type="text" id="username" label="Username" variant="standard" className='input-box' />
                  </FormControl>
                  <FormControl fullWidth variant="standard" sx={{my:2}}>
                    <TextField type="email" id="email" label="Email" variant="standard" className='input-box' />
                  </FormControl>
                  <FormControl fullWidth variant="standard" sx={{my:2}}>
                    <TextField type="password" id="password" label="Password" variant="standard" className='input-box' />
                  </FormControl>
                  <FormControl fullWidth variant="standard" sx={{mt:3}}>
                    <Button variant="contained"  className="login-btn" type='submit'>
                      Sign Up
                    </Button>
                  </FormControl>
                  <Box>
                  <Typography variant="subtitle1" sx={{textAlign:'center', my:5}}>
                    Sign In
                  </Typography>
                  <FormControl fullWidth variant="standard">
                    <Button variant="contained"  className="social-btn">
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
  )
}

export default Signups
