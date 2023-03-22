import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const proxyServerSlice = createSlice({
  name: "proxyServer",
  initialState,
  reducers: {
    setProxyServer(state, action) {
      return action.payload;
    },
  },
});

export const { setProxyServer } = proxyServerSlice.actions;
export default proxyServerSlice.reducer;
