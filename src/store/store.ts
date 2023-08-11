import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'


const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production' // Enable Redux DevTools in development
})


// return app global state type
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store