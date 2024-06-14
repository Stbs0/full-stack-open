import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
const store = configureStore({
    reducer:notificationReducer
});

export default store;
