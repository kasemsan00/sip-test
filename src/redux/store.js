import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import userAgentSlice from "./slices/userAgentSlice";
import mediaStreamSlice from "./slices/mediaStreamSlice";
import profileDataSlice from "./slices/profileDataSlice";
import profileSelectSlice from "./slices/profileSelectSlice";

const middleware = [reduxThunk];

const store = configureStore({
  reducer: {
    profileSelect: profileSelectSlice,
    profileData: profileDataSlice,
    mediaStream: mediaStreamSlice,
    userAgent: userAgentSlice,
  },
  middleware,
});

export default store;
