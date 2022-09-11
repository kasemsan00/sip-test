import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import userAgentSlice from "./slices/userAgentSlice";
import mediaStreamSlice from "./slices/mediaStreamSlice";

const middleware = [reduxThunk];

const store = configureStore({
    reducer: {
        mediaStream: mediaStreamSlice,
        userAgent: userAgentSlice,
    },
    middleware,
});

export default store;
