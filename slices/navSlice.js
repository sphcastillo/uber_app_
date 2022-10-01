import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // point A - where are you right now?
    origin: null,
    destination: null,
    // info that's regarding how much time it takes to get from point A to point B
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    // reducers are functions that are going to be called when we dispatch an action
    // set origin, set destination, set travel time information
    // then part of data layer is going to be updated
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

// expose the app to the outside world - tap into it
// expose these actions
// exporting our navigation slice actions
export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;