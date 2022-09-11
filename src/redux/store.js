import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import userAgentSlice from "./slices/userAgentSlice";

const middleware = [reduxThunk];

const store = configureStore({
    reducer: {
        userAgent: userAgentSlice,
    },
    middleware,
});

export default store;
