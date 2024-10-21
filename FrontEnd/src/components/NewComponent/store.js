import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from '../NewComponent/bookingSlice.js'

export const store = configureStore({
    reducer: {
        bookings: bookingReducer,
    }
})