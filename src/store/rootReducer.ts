import { combineReducers } from "@reduxjs/toolkit";
import uiSection from "./slices/uiSection";


const rootReducer = combineReducers({
    uiSection: uiSection
})

export default rootReducer