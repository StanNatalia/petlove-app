import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { newsReducer } from "./News/newsSlice";
import { friendsReducer } from "./Friends/friendsSlice";
import { noticesReducer } from "./Notices/noticesSlice";
import favoritesReducer from "./Favorites/favoritesSlice";

const persistConfig = {
  key: "auth-data",
  version: 1,
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    news: newsReducer,
    friends: friendsReducer,
    notices: noticesReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
