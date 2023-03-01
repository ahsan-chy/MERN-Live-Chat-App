import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    token: "" 
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    email: (state, action) => {
      // console.log("action", action);
      state.email = action.payload;
      // console.log("state.email", state.email);
    },
    token: (state, action) => {
      state.token = action.payload;
    },
  },
})

export const { email, token } = authSlice.actions

// export const selectEmail = (state) => state.auth.email;
// export const selectPassword = (state) => state.auth.password;

export default authSlice.reducer