import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        booking: null,
    },
    reducers: {
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        cancelBooking: (state) => {
            state.booking = null;
        },
    },
});

export const { setBooking, cancelBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;