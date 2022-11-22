import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { syncStorage } from "redux-persist-webextension-storage";
import { domainListReducer } from "../features/filterList/domainListSlice";
import logger from "redux-logger";

const syncStorageConfig = {
  key: "root",
  storage: syncStorage,
};

const rootReducer = combineReducers({
  domainLists: persistReducer(syncStorageConfig, domainListReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  // TODO: Look more into this: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
