import { REDUX_PERSIST_KEY } from "@constants/index";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
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
import getStoredState from "redux-persist/es/getStoredState";
import browser from "webextension-polyfill";
import { domainListReducer } from "../features/domainList/domainListSlice";
import { optionsReducer } from "../features/options/optionsSlice";

const syncStorageConfig = {
  key: REDUX_PERSIST_KEY,
  storage: syncStorage,
};

const rootReducer = combineReducers({
  domainLists: domainListReducer,
  options: optionsReducer,
});

export const store = configureStore({
  reducer: persistReducer<ReturnType<typeof rootReducer>>(
    syncStorageConfig,
    rootReducer
  ),
  // TODO: Look more into this: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store, null, () => {
  try {
    initStorageSyncListener();
  } catch (e) {
    console.error("Unable to sync redux persist to storage.");
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

function initStorageSyncListener() {
  browser.storage.sync.onChanged.addListener(() => {
    getStateFromStorage().then((storedState) => {
      // TODO: This could probably use some tweaking in the future. Not very efficient.
      const storedStateString = JSON.stringify(storedState);
      const currentStateString = JSON.stringify(store.getState());
      if (storedStateString !== currentStateString) {
        store.dispatch({
          type: REHYDRATE,
          key: REDUX_PERSIST_KEY,
          payload: storedState,
        });
      }
    });
  });
}

export function getStateFromStorage() {
  return getStoredState(syncStorageConfig) as Promise<RootState>;
}
