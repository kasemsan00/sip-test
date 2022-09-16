import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import userAgentSlice from "./slices/userAgentSlice";
import mediaStreamSlice from "./slices/mediaStreamSlice";
import profileSlice from "./slices/profileSlice";

const middleware = [reduxThunk];

const store = configureStore({
    reducer: {
        profileSlice: profileSlice,
        mediaStream: mediaStreamSlice,
        userAgent: userAgentSlice,
    },
    middleware,
});

export default store;
