import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {

    loadmovie : (state,action)=>{
        state.info = action.payload;   //actions ke payload me wo value milti hai jo hum is function ko call krne time argument bhej rhe he
    },
    removemovie:(state,action)=>{
        state.info = null;
    },
  },
});

export default movieSlice.reducer; 

// Action creators are generated for each case reducer function
export const { loadmovie ,removemovie } = movieSlice.actions;

