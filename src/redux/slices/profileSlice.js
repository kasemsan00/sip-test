import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action) {
            return [...state, [action.name], action.data];
        },
    },
});

export const { setLocalStream } = profileSlice.actions;
export default profileSlice.reducer;
