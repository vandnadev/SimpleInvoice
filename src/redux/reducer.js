import { createSlice } from "@reduxjs/toolkit";

// Slice
const slice = createSlice({
  name: "invoice",
  initialState: {
    token: "",
    userid: "",
    userdetail: {},
    invoicelist : []
    
  },
  reducers: {
    userdetail: (state, action) => {
      state.userdetail = action.payload;
    },
    tokenset: (state, action) => {
      state.token = action.payload;
    },
    invoiceList : (state , action) =>{
        state.invoicelist = action.payload
    } 
  
  },
});
export default slice.reducer;
// Actions
export const {
  userdetail,
  tokenset,
  invoiceList

} = slice.actions;

