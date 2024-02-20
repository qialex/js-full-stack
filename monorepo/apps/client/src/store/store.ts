import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { userReducer } from './features/user/user-slice'

export const STATE_PERSISTANCE_KEY = 'STATE_USER_PERSISTANCE_KEY'

const persistConfig = {
  key: STATE_PERSISTANCE_KEY,
  version: 1,
  storage,
}

export const persistedReducer = persistReducer(persistConfig, userReducer)

// import { getDefaultMiddleware } from '@reduxjs/toolkit';



export const makeStore = () => {
  return configureStore({
    reducer: {
      // user: userReducer,
      user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof configureStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']