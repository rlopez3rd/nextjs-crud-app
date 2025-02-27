import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, REHYDRATE, PAUSE, PERSIST, FLUSH, PURGE, REGISTER } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

// Example slice
import { userSlice } from './users/users-slice';
import { authSlice } from './auth/auth-slice';

// Combine reducers
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const stored = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Cookie storage setup
// {
//   cookies: Cookies,
//   expiration: {
//     default: 365 * 86400, // Cookies expire in 1 year
//   },
// }

const cookieStorage = new CookieStorage(Cookies);

const persistConfig = {
  key: 'root',
  storage: cookieStorage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const stored = configureStore({
      reducer: rootReducer,
      devTools: true,
    });
    
    return stored
  }

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: true
  });

  (store as any).__persistor  = persistStore(store); // Add persistor to store

  return store;
};

export type RootState = ReturnType<typeof stored.getState>;

// export const persistor = persistStore(store);